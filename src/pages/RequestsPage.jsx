import React, { useState } from 'react';
import { PageHeader } from '../components/layout/PageHeader';
import { RequestCard } from '../components/requests/RequestCard';
import { EmptyState } from '../components/common/EmptyState';
import { useSwap } from '../context/SwapContext';
import { Inbox, Send, GitPullRequest, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function RequestsPage() {
  const [activeTab, setActiveTab] = useState('received'); // 'received' | 'sent'
  const [statusFilter, setStatusFilter] = useState('All'); // 'All' | 'Pending' | 'Accepted' | 'Declined'
  const { requests, acceptSwapRequest, declineSwapRequest, cancelSwapRequest } = useSwap();
  const navigate = useNavigate();

  const receivedRequests = requests.filter((r) => r.direction === 'received');
  const sentRequests = requests.filter((r) => r.direction === 'sent');

  const currentList = activeTab === 'received' ? receivedRequests : sentRequests;

  const filteredList = statusFilter === 'All'
    ? currentList
    : currentList.filter((r) => r.status === statusFilter);

  const pendingReceivedCount = receivedRequests.filter((r) => r.status === 'Pending').length;

  return (
    <div className="space-y-6 text-left">
      <PageHeader
        eyebrow="Swap Management"
        title="Swap Requests"
        subtitle="Review peer-learning invitations, coordinate meeting terms, and monitor sent proposals."
      />

      {/* Tabs & Status Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E4E7EC] pb-3">
        {/* Main Tabs */}
        <div className="inline-flex rounded-lg border border-[#E4E7EC] p-0.5 bg-[#FBFBFA]">
          <button
            type="button"
            onClick={() => setActiveTab('received')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
              activeTab === 'received'
                ? 'bg-white text-[#1B365D] font-semibold shadow-xs'
                : 'text-[#5C6479] hover:text-[#111625]'
            }`}
          >
            <Inbox className="w-3.5 h-3.5" />
            <span>Received Requests</span>
            {pendingReceivedCount > 0 && (
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[#1B365D] text-white">
                {pendingReceivedCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('sent')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
              activeTab === 'sent'
                ? 'bg-white text-[#1B365D] font-semibold shadow-xs'
                : 'text-[#5C6479] hover:text-[#111625]'
            }`}
          >
            <Send className="w-3.5 h-3.5" />
            <span>Sent Proposals ({sentRequests.length})</span>
          </button>
        </div>

        {/* Status Dropdown */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-[#5C6479]">Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-xs bg-white text-[#111625] border border-[#E4E7EC] rounded-lg px-2.5 py-1.5 outline-none focus:border-[#1B365D]"
          >
            <option value="All">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Accepted">Accepted</option>
            <option value="Declined">Declined</option>
          </select>
        </div>
      </div>

      {/* Requests List */}
      {filteredList.length === 0 ? (
        <EmptyState
          icon={GitPullRequest}
          title={
            activeTab === 'received'
              ? "You're all caught up"
              : 'No outgoing proposals found'
          }
          description={
            activeTab === 'received'
              ? 'No swap requests currently need your attention. When other students reach out to trade skills, they will appear here.'
              : 'You have not sent any swap requests yet. Browse the student directory to propose your first skill exchange.'
          }
          actionLabel="Find Study Partners"
          onAction={() => navigate('/matches')}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredList.map((req) => (
            <RequestCard
              key={req.id}
              request={req}
              type={activeTab}
              onAccept={acceptSwapRequest}
              onDecline={declineSwapRequest}
              onCancel={cancelSwapRequest}
            />
          ))}
        </div>
      )}
    </div>
  );
}
