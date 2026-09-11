import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { matchService } from '../services/matchService';
import { requestService } from '../services/requestService';
import { sessionService } from '../services/sessionService';
import { skillService } from '../services/skillService';
import { INITIAL_ACTIVITY } from '../data/mockData';
import { useAuth } from './AuthContext';
import { useToast } from './ToastContext';

const SwapContext = createContext(null);

export function SwapProvider({ children }) {
  const { user, updateProfile } = useAuth();
  const { addToast } = useToast();

  const [matches, setMatches] = useState([]);
  const [requests, setRequests] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [activity, setActivity] = useState(INITIAL_ACTIVITY);
  const [trendingSkills, setTrendingSkills] = useState([]);
  const [isLoadingMatches, setIsLoadingMatches] = useState(false);

  // Load initial data
  const loadData = useCallback(async () => {
    try {
      setIsLoadingMatches(true);
      const hasToken = !!(localStorage.getItem('skillswap_token') || localStorage.getItem('token'));
      const isAuthenticated = !!user || hasToken;

      const trendingPromise = skillService.getTrendingSkills();

      if (isAuthenticated) {
        const [allMatches, allRequests, allSessions, trending] = await Promise.all([
          matchService.getMatches({}, user),
          requestService.getRequests(),
          sessionService.getSessions(),
          trendingPromise
        ]);

        setMatches(allMatches);
        setRequests(allRequests);
        setSessions(allSessions);
        setTrendingSkills(trending);
      } else {
        const trending = await trendingPromise;
        setMatches([]);
        setRequests([]);
        setSessions([]);
        setTrendingSkills(trending);
      }
    } catch (err) {
      console.error('Failed to load swap platform data', err);
    } finally {
      setIsLoadingMatches(false);
    }
  }, [user]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Refetch matches with filters
  const filterMatches = useCallback(async (filters) => {
    setIsLoadingMatches(true);
    try {
      const filtered = await matchService.getMatches(filters, user);
      setMatches(filtered);
    } catch (err) {
      console.error('Failed to filter matches', err);
    } finally {
      setIsLoadingMatches(false);
    }
  }, [user]);

  // Send a swap request
  const sendSwapRequest = async ({ candidate, skillYouTeach, skillTheyTeach, suggestedTime, message }) => {
    try {
      const newReq = await requestService.createRequest({
        receiverId: candidate.id,
        receiverName: candidate.name,
        receiverDepartment: candidate.department,
        receiverYear: candidate.year,
        skillYouTeach,
        skillTheyTeach,
        compatibility: candidate.compatibility || 85,
        suggestedTime,
        message
      });

      setRequests((prev) => [newReq, ...prev]);

      const actItem = {
        id: 'act-' + Date.now(),
        text: `Sent swap request to ${candidate.name} (${skillYouTeach} ? ${skillTheyTeach})`,
        time: 'Just now',
        type: 'request'
      };
      setActivity((prev) => [actItem, ...prev]);

      addToast({
        title: 'Swap Request Sent',
        description: `Your request was sent to ${candidate.name}. You'll be notified when they respond.`,
        variant: 'success'
      });

      return newReq;
    } catch (err) {
      addToast({
        title: 'Failed to Send Request',
        description: err.message,
        variant: 'error'
      });
      throw err;
    }
  };

  // Accept a swap request
  const acceptSwapRequest = async (requestId) => {
    try {
      const updatedReq = await requestService.acceptRequest(requestId);
      setRequests((prev) =>
        prev.map((r) => (r.id === requestId ? updatedReq : r))
      );

      // Create scheduled session automatically
      const newSession = await sessionService.createSessionFromRequest(updatedReq);
      setSessions((prev) => [newSession, ...prev]);

      const partner = updatedReq.direction === 'received' ? updatedReq.senderName : updatedReq.receiverName;
      const actItem = {
        id: 'act-' + Date.now(),
        text: `Accepted swap request from ${partner}. Session scheduled.`,
        time: 'Just now',
        type: 'session'
      };
      setActivity((prev) => [actItem, ...prev]);

      addToast({
        title: 'Swap Accepted',
        description: `Scheduled session created with ${partner}. View it in Sessions.`,
        variant: 'success'
      });
    } catch (err) {
      addToast({
        title: 'Action Failed',
        description: err.message,
        variant: 'error'
      });
    }
  };

  // Decline a swap request
  const declineSwapRequest = async (requestId) => {
    try {
      const updatedReq = await requestService.declineRequest(requestId);
      setRequests((prev) =>
        prev.map((r) => (r.id === requestId ? updatedReq : r))
      );

      addToast({
        title: 'Request Declined',
        description: 'The swap invitation has been declined.',
        variant: 'info'
      });
    } catch (err) {
      addToast({
        title: 'Action Failed',
        description: err.message,
        variant: 'error'
      });
    }
  };

  // Cancel a sent swap request
  const cancelSwapRequest = async (requestId) => {
    try {
      const updatedReq = await requestService.cancelRequest(requestId);
      setRequests((prev) =>
        prev.map((r) => (r.id === requestId ? updatedReq : r))
      );

      addToast({
        title: 'Request Withdrawn',
        description: 'Your outgoing swap request has been cancelled.',
        variant: 'info'
      });
    } catch (err) {
      addToast({
        title: 'Action Failed',
        description: err.message,
        variant: 'error'
      });
    }
  };

  // Mark session complete & credit reward
  const markSessionComplete = async (sessionId) => {
    try {
      const updatedSess = await sessionService.markSessionComplete(sessionId);
      setSessions((prev) =>
        prev.map((s) => (s.id === sessionId ? updatedSess : s))
      );

      if (user) {
        await updateProfile({
          credits: (user.credits || 0) + 1,
          sessionsCompleted: (user.sessionsCompleted || 0) + 1,
          studentsHelped: (user.studentsHelped || 0) + 1
        });
      }

      const actItem = {
        id: 'act-' + Date.now(),
        text: `Session completed with ${updatedSess.partnerName} (+1 skill credit earned)`,
        time: 'Just now',
        type: 'credit'
      };
      setActivity((prev) => [actItem, ...prev]);

      addToast({
        title: 'Session Completed',
        description: 'Session verified. +1 Skill Credit has been credited to your academic balance.',
        variant: 'success'
      });
    } catch (err) {
      addToast({
        title: 'Action Failed',
        description: err.message,
        variant: 'error'
      });
    }
  };

  return (
    <SwapContext.Provider
      value={{
        matches,
        requests,
        sessions,
        activity,
        trendingSkills,
        isLoadingMatches,
        filterMatches,
        sendSwapRequest,
        acceptSwapRequest,
        declineSwapRequest,
        cancelSwapRequest,
        markSessionComplete,
        refreshData: loadData
      }}
    >
      {children}
    </SwapContext.Provider>
  );
}

export function useSwap() {
  const context = useContext(SwapContext);
  if (!context) {
    throw new Error('useSwap must be used within a SwapProvider');
  }
  return context;
}
