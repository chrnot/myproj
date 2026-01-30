
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const isPrintPage = location.pathname === '/grade-form';

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation - Hidden when printing */}
      <nav className="no-print bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold shadow-sm">P</div>
                <span className="text-xl font-bold tracking-tight text-gray-800">Project<span className="text-blue-600">Hub</span></span>
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8 items-center">
              <Link to="/" className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${location.pathname === '/' ? 'border-blue-500 text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'}`}>
                Översikt
              </Link>
              <Link to="/grade-form" className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${location.pathname === '/grade-form' ? 'border-blue-500 text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'}`}>
                Betygsblankett
              </Link>
            </div>
            <div className="flex items-center sm:hidden">
                <Link to="/" className="text-gray-500 hover:text-blue-600">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className={`flex-grow ${isPrintPage ? '' : 'py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full'}`}>
        {children}
      </main>

      <footer className="no-print bg-white border-t border-gray-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-gray-500 font-medium">
          &copy; {new Date().getFullYear()} Project Hub Portfolio
        </div>
      </footer>
    </div>
  );
};
