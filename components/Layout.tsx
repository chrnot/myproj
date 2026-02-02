import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isPrintPage = location.pathname === '/grade-form';
  const isHome = location.pathname === '/';

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation - Hidden when printing */}
      <nav className="no-print bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center gap-4">
              {!isHome && (
                <button 
                  onClick={() => navigate(-1)}
                  className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500 hover:text-blue-600"
                  title="Gå tillbaka"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
              )}
              <Link to="/" className="flex items-center gap-2 group">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold shadow-lg shadow-blue-200 group-hover:scale-105 transition-transform">P</div>
                <span className="text-xl font-black tracking-tight text-slate-900">Project<span className="text-blue-600">Hub</span></span>
              </Link>
            </div>
            
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8 items-center font-bold text-xs uppercase tracking-widest">
              <Link 
                to="/" 
                className={`inline-flex items-center px-1 pt-1 border-b-2 transition-all ${isHome ? 'border-blue-500 text-slate-900' : 'border-transparent text-slate-400 hover:text-slate-600 hover:border-slate-300'}`}
              >
                Översikt
              </Link>
              <Link 
                to="/grade-form" 
                className={`inline-flex items-center px-1 pt-1 border-b-2 transition-all ${location.pathname === '/grade-form' ? 'border-blue-500 text-slate-900' : 'border-transparent text-slate-400 hover:text-slate-600 hover:border-slate-300'}`}
              >
                Betygsblankett
              </Link>
              <Link 
                to="/rektorer-gbg" 
                className={`inline-flex items-center px-1 pt-1 border-b-2 transition-all ${location.pathname === '/rektorer-gbg' ? 'border-blue-500 text-slate-900' : 'border-transparent text-slate-400 hover:text-slate-600 hover:border-slate-300'}`}
              >
                Göteborg 2026
              </Link>
            </div>

            <div className="flex items-center sm:hidden">
              <Link to="/" className="p-2 text-slate-400 hover:text-blue-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className={`flex-grow ${isPrintPage ? '' : 'py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full'}`}>
        {children}
      </main>

      <footer className="no-print bg-white border-t border-slate-200 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-2">Internal Management Suite</p>
          <div className="text-sm text-slate-500 font-medium">
            &copy; {new Date().getFullYear()} Project Hub Portfolio &bull; Danderyds Kommun
          </div>
        </div>
      </footer>
    </div>
  );
};