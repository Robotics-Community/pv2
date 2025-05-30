// src/components/Layout.jsx
import React from 'react';
import NavBar from './NavBar';
import BottomNav from './BottomNav';

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <NavBar />
      <main className="flex-1 overflow-y-auto pb-16">
        {children}
      </main>
      <BottomNav />
    </div>
  );
};

export default Layout;