import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';
import { userService } from '../services/userService';
import { useToast } from './ToastContext';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { addToast } = useToast();

  useEffect(() => {
    // Load persisted user on mount
    try {
      const stored = authService.getCurrentUser();
      setUser(stored);
    } catch (err) {
      console.error('Failed to load user session', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    try {
      setIsLoading(true);
      const res = await authService.login(email, password);
      setUser(res.user);
      addToast({
        title: 'Welcome back',
        description: `Logged in as ${res.user.name} (${res.user.email})`,
        variant: 'success'
      });
      return res.user;
    } catch (err) {
      addToast({
        title: 'Authentication Error',
        description: err.message || 'Invalid credentials',
        variant: 'error'
      });
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (formData) => {
    try {
      setIsLoading(true);
      const res = await authService.signup(formData);
      setUser(res.user);
      addToast({
        title: 'Account Created',
        description: 'Welcome to Skill Swap. Please set up your academic skills.',
        variant: 'success'
      });
      return res.user;
    } catch (err) {
      addToast({
        title: 'Registration Error',
        description: err.message,
        variant: 'error'
      });
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    await authService.logout();
    addToast({
      title: 'Signed Out',
      description: 'You have been safely signed out of Skill Swap.',
      variant: 'info'
    });
  };

  const updateProfile = async (updates) => {
    try {
      const updated = await userService.updateProfile(updates);
      setUser(updated);
      addToast({
        title: 'Profile Updated',
        description: 'Your academic profile details have been saved.',
        variant: 'success'
      });
      return updated;
    } catch (err) {
      addToast({
        title: 'Update Failed',
        description: err.message,
        variant: 'error'
      });
      throw err;
    }
  };

  const updateAvailability = async (availability) => {
    try {
      const updated = await userService.updateAvailability(availability);
      setUser(updated);
      addToast({
        title: 'Schedule Updated',
        description: 'Your weekly peer availability has been updated.',
        variant: 'success'
      });
      return updated;
    } catch (err) {
      addToast({
        title: 'Schedule Update Failed',
        description: err.message,
        variant: 'error'
      });
      throw err;
    }
  };

  const completeOnboarding = async ({ skillsTeach, skillsLearn, availability }) => {
    return updateProfile({
      skillsTeach,
      skillsLearn,
      availability,
      onboardingCompleted: true
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        signup,
        logout,
        updateProfile,
        updateAvailability,
        completeOnboarding
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
