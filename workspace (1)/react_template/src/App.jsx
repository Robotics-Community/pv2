// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Layout Components
import Layout from './components/Layout';
import NavBar from './components/NavBar';
import BottomNav from './components/BottomNav';

// Page Components
import Feed from './components/Feed';
import Beehive from './components/Beehive';
import TeamsPage from './components/teams/TeamsPage';
import TeamChat from './components/teams/TeamChat';
import LeaderboardPage from './components/stats/LeaderboardPage';
import EventsPage from './components/EventsPage';
import MentorshipPage from './components/mentorship/MentorshipPage';

// Auth Components
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';

// Custom Layout for pages that should not have bottom nav
const SimpleLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <NavBar />
      <main className="flex-1 overflow-y-auto pb-16 pt-14">
        {children}
      </main>
    </div>
  );
};

// Auth Layout - no navigation bars
const AuthLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      {children}
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Auth Routes */}
          <Route path="/login" element={
            <AuthLayout>
              <Login />
            </AuthLayout>
          } />
          <Route path="/signup" element={
            <AuthLayout>
              <Signup />
            </AuthLayout>
          } />
          
          {/* Protected Routes */}
          <Route path="/" element={
            <ProtectedRoute>
              <Layout>
                <Feed />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/teams" element={
            <ProtectedRoute>
              <SimpleLayout>
                <TeamsPage />
              </SimpleLayout>
            </ProtectedRoute>
          } />
          <Route path="/teams/chat/:teamId" element={
            <ProtectedRoute>
              <SimpleLayout>
                <TeamChat />
              </SimpleLayout>
            </ProtectedRoute>
          } />
          <Route path="/stats" element={
            <ProtectedRoute>
              <SimpleLayout>
                <LeaderboardPage />
              </SimpleLayout>
            </ProtectedRoute>
          } />
          <Route path="/beehive" element={
            <ProtectedRoute>
              <SimpleLayout>
                <Beehive />
              </SimpleLayout>
            </ProtectedRoute>
          } />
          <Route path="/events" element={
            <ProtectedRoute>
              <SimpleLayout>
                <EventsPage />
              </SimpleLayout>
            </ProtectedRoute>
          } />
          <Route path="/mentorship" element={
            <ProtectedRoute>
              <SimpleLayout>
                <MentorshipPage />
              </SimpleLayout>
            </ProtectedRoute>
          } />
          
          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;