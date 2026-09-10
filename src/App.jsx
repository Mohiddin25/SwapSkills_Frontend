import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastProvider } from './context/ToastContext';
import { AuthProvider } from './context/AuthContext';
import { SwapProvider } from './context/SwapContext';

import { AppShell } from './components/layout/AppShell';

// Public pages
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { OnboardingPage } from './pages/OnboardingPage';

// Authenticated pages
import { DashboardPage } from './pages/DashboardPage';
import { FindMatchesPage } from './pages/FindMatchesPage';
import { RequestsPage } from './pages/RequestsPage';
import { SessionsPage } from './pages/SessionsPage';
import { AvailabilityPage } from './pages/AvailabilityPage';
import { ProfilePage } from './pages/ProfilePage';
import { SettingsPage } from './pages/SettingsPage';

export default function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <SwapProvider>
          <BrowserRouter>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/onboarding" element={<OnboardingPage />} />

              {/* Authenticated routes wrapped in AppShell */}
              <Route element={<AppShell />}>
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/matches" element={<FindMatchesPage />} />
                <Route path="/requests" element={<RequestsPage />} />
                <Route path="/sessions" element={<SessionsPage />} />
                <Route path="/availability" element={<AvailabilityPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/settings" element={<SettingsPage />} />
              </Route>

              {/* Catch-all fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </BrowserRouter>
        </SwapProvider>
      </AuthProvider>
    </ToastProvider>
  );
}
