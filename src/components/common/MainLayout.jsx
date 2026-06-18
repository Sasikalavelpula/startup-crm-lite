import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import DarkModeToggle from './DarkModeToggle';

/**
 * MainLayout - Coordinates page layouts.
 * Manages responsive side navigation margins (md:pl-20, lg:pl-64),
 * top headers with mobile drawer triggers, and dynamic main viewport paddings.
 *
 * @component
 */
const MainLayout = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const getPageTitle = () => {
    switch (location.pathname) {
      case '/':
        return 'Dashboard';
      case '/leads':
        return 'Leads';
      case '/analytics':
        return 'Analytics';
      default:
        return 'Startup CRM';
    }
  };

  return (
    <div className="flex bg-gray-50 dark:bg-gray-900 min-h-screen font-roboto text-gray-900 dark:text-white transition-colors duration-200">
      {/* Sidebar Navigation (passes state to toggle the slide-over mobile drawer) */}
      <Sidebar isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden md:pl-20 lg:pl-64 pb-16 md:pb-0">
        {/* Top Header Bar */}
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 h-16 px-4 md:px-8 flex items-center justify-between sticky top-0 z-20 transition-colors duration-200">
          <div className="flex items-center gap-3.5 min-w-0">
            {/* Hamburger trigger menu for mobile viewports */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer flex-shrink-0"
              aria-label="Open sidebar menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* Micro Logo badge for mobile viewports */}
            <div className="flex items-center md:hidden flex-shrink-0">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-primary to-blue-500 flex items-center justify-center text-white font-bold text-sm shadow shadow-primary/20">
                S
              </div>
            </div>

            <h2 className="text-base md:text-xl font-bold tracking-tight text-gray-900 dark:text-white truncate">
              {getPageTitle()}
            </h2>
          </div>

          <div className="flex items-center gap-3.5">
            {/* Dark Mode toggle trigger */}
            <DarkModeToggle />

            {/* Quick Mock Notification bar */}
            <button 
              className="p-2 text-gray-400 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 relative cursor-pointer"
              title="Notifications"
              aria-label="View notifications"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500"></span>
            </button>
            
            <div className="h-6 w-[1px] bg-gray-200 dark:bg-gray-700 hidden sm:block"></div>

            {/* Quick Status Live badge */}
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-green-50 dark:bg-green-950/20 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
              Live Sync
            </span>
          </div>
        </header>

        {/* Page Content Panel */}
        <main className="flex-1 p-4 md:p-8 overflow-y-auto bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
          <div className="max-w-7xl mx-auto animate-fade-in">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
