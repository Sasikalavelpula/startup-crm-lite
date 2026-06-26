import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

/**
 * Sidebar - Responsive Navigation component.
 * Renders bottom navigation bar on mobile viewports (icons-only, touch targets >= 44x44px).
 * Renders left-aligned sidebar on tablet and desktop (icons + text labels on tablet, wider menu with sub-labels on desktop).
 * Renders left-aligned menu drawer when toggled via mobile hamburger menu.
 *
 * @component
 * @param {Object} props
 * @param {boolean} props.isOpen - Mobile menu drawer visibility state
 * @param {Function} props.onClose - Mobile menu drawer close callback
 */
const Sidebar = ({ isOpen, onClose }) => {
  const menuItems = [
    {
      name: 'Dashboard',
      path: '/',
      subLabel: 'Overview & statistics',
      icon: (
        <svg className="w-6 h-6 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      )
    },
    {
      name: 'Leads',
      path: '/leads',
      subLabel: 'Manage active prospects',
      icon: (
        <svg className="w-6 h-6 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      name: 'Analytics',
      path: '/analytics',
      subLabel: 'Sales pipeline reports',
      icon: (
        <svg className="w-6 h-6 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 002 2h2a2 2 0 002-2z" />
        </svg>
      )
    }
  ];

  return (
    <>
      {/* 1. Mobile bottom navigation bar (Icons only) */}
      <nav className="flex md:hidden fixed bottom-0 left-0 right-0 h-16 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 items-center justify-around z-40 px-4 select-none shadow-lg transition-colors duration-200">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-150 cursor-pointer ${
                isActive
                  ? 'bg-primary/10 text-primary scale-105'
                  : 'text-gray-400 dark:text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700/50'
              }`
            }
            title={item.name}
            aria-label={item.name}
          >
            {item.icon}
          </NavLink>
        ))}
      </nav>

      {/* 2. Mobile Drawer slide-over navigation overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden" role="dialog" aria-modal="true">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
            onClick={onClose}
          />

          {/* Drawer content frame */}
          <aside className="relative w-64 max-w-xs bg-white dark:bg-gray-800 h-full flex flex-col justify-between p-5 border-r border-gray-200 dark:border-gray-700 shadow-2xl animate-fade-in transition-colors duration-200">
            <div>
              {/* Close Button & Header */}
              <div className="flex justify-between items-center pb-5 border-b border-gray-250 dark:border-gray-700">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary to-blue-500 flex items-center justify-center text-white font-bold text-sm shadow-md">
                    S
                  </div>
                  <div>
                    <h1 className="font-bold text-sm text-gray-900 dark:text-white leading-tight">Startup CRM</h1>
                    <span className="text-[9px] text-primary font-bold uppercase tracking-wider">Lite Edition</span>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-750 transition-colors cursor-pointer"
                  aria-label="Close menu"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Drawer Links */}
              <nav className="mt-5 space-y-1.5">
                {menuItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `flex items-center gap-3.5 px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-150 cursor-pointer ${
                        isActive
                          ? 'bg-primary/10 text-primary border-l-4 border-primary -ml-4 pl-3 rounded-l-none'
                          : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                      }`
                    }
                  >
                    <span className="text-gray-400 dark:text-gray-500">{item.icon}</span>
                    <div className="flex flex-col">
                      <span className="leading-tight">{item.name}</span>
                      <span className="text-[10px] text-gray-405 dark:text-gray-500 font-normal leading-normal">{item.subLabel}</span>
                    </div>
                  </NavLink>
                ))}
              </nav>
            </div>

            {/* Profile Section Footer */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-905/30 -mx-5 -mb-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-900 dark:text-white font-bold border border-gray-300 dark:border-gray-600">
                  SV
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white truncate">SasiKala Velpula</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">sasikala@startup.com</p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      )}

      {/* 3. Tablet+ left sidebar */}
      <aside className="hidden md:flex flex-col justify-between fixed left-0 top-0 bottom-0 md:w-20 lg:w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 z-30 transition-all duration-200 select-none">
        <div>
          {/* Logo Brand Header */}
          <div className="p-4 lg:p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-center lg:justify-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-primary to-blue-500 flex items-center justify-center text-white font-bold text-lg shadow-md shadow-primary/30 flex-shrink-0">
              S
            </div>
            <div className="hidden lg:block min-w-0">
              <h1 className="font-bold text-base text-gray-900 dark:text-white leading-tight truncate">Startup CRM</h1>
              <span className="text-[10px] text-primary font-semibold uppercase tracking-wider block">Lite Edition</span>
            </div>
          </div>

          {/* Navigation Links list */}
          <nav className="p-3 lg:p-4 space-y-1.5">
            {menuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex flex-col lg:flex-row items-center gap-1.5 lg:gap-3.5 px-2.5 py-2.5 lg:px-4 lg:py-3 rounded-lg text-[10px] lg:text-sm font-medium transition-all duration-200 cursor-pointer group ${
                    isActive
                      ? 'bg-primary/10 text-primary border-l-0 lg:border-l-4 border-primary lg:-ml-4 lg:pl-[12px] lg:rounded-l-none'
                      : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span className={`transition-colors duration-200 ${isActive ? 'text-primary' : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-900 dark:group-hover:text-white'}`}>
                      {item.icon}
                    </span>
                    <span className="lg:hidden font-bold tracking-tight text-[9px] uppercase mt-0.5">{item.name}</span>
                    <div className="hidden lg:flex flex-col min-w-0">
                      <span className="font-bold truncate leading-tight">{item.name}</span>
                      <span className="text-[10px] text-gray-400 dark:text-gray-500 font-normal leading-normal truncate group-hover:text-gray-900 dark:group-hover:text-white mt-0.5">
                        {item.subLabel}
                      </span>
                    </div>
                  </>
                )}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* User Footnotes section */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/30 flex items-center justify-center lg:justify-start">
          <div className="flex items-center justify-center lg:justify-start gap-3 w-full">
            <div className="w-10 h-10 rounded-full bg-gray-250 dark:bg-gray-700 flex items-center justify-center text-gray-900 dark:text-white font-bold border border-gray-300 dark:border-gray-600 flex-shrink-0">
              SV
            </div>
            <div className="hidden lg:flex flex-col min-w-0 flex-1">
              <h4 className="text-sm font-bold text-gray-900 dark:text-white truncate">SasiKala Velpula</h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">sasikala@startup.com</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

Sidebar.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func
};

export default Sidebar;
