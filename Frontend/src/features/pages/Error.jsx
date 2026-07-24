// src/pages/Error.jsx
import React from "react";
import { useRouteError, Link, useNavigate } from "react-router-dom";

const ErrorPage = () => {
  // React Router automatically passes the error details here
  const error = useRouteError();
  const navigate = useNavigate();

  // Determine what kind of error this is
  const is404 = error?.status === 404;
  const title = is404 ? "404" : "Oops!";
  const subtitle = is404 ? "Page Not Found" : "Something went wrong";
  const errorMessage = error?.statusText || error?.message || "The page you are looking for doesn't exist or has been moved.";

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans relative overflow-hidden flex items-center justify-center p-4">
      
      {/* Background Ambient Glows */}
      <div className="absolute inset-0 -z-10 pointer-events-none fixed">
        <div className="absolute top-[10%] left-[20%] h-[300px] w-[300px] sm:h-[500px] sm:w-[500px] rounded-full bg-rose-600/10 blur-[100px] sm:blur-[120px] animate-pulse" />
        <div className="absolute bottom-[10%] right-[20%] h-[300px] w-[300px] sm:h-[500px] sm:w-[500px] rounded-full bg-violet-600/10 blur-[100px] sm:blur-[120px] animate-pulse delay-1000" />
      </div>

      <div className="max-w-lg w-full text-center z-10">
        <div className="rounded-3xl border border-white/10 bg-slate-900/40 backdrop-blur-xl p-8 sm:p-12 shadow-2xl flex flex-col items-center relative overflow-hidden">
          
          {/* Subtle top border highlight */}
          <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${is404 ? 'from-cyan-400 to-blue-500' : 'from-rose-400 to-rose-600'}`}></div>

          {/* Icon */}
          <div className={`flex h-20 w-20 items-center justify-center rounded-3xl mb-8 border shadow-lg ${
            is404 
              ? "bg-cyan-500/10 text-cyan-400 border-cyan-500/20 shadow-cyan-500/10" 
              : "bg-rose-500/10 text-rose-400 border-rose-500/20 shadow-rose-500/10"
          }`}>
            {is404 ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="9" y1="15" x2="15" y2="15"/>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
            )}
          </div>

          {/* Error Text */}
          <h1 className="text-5xl font-extrabold text-white tracking-tight mb-2">
            {title}
          </h1>
          <h2 className="text-xl font-bold text-slate-300 mb-4">
            {subtitle}
          </h2>
          <p className="text-slate-400 text-sm mb-8 px-4">
            {errorMessage}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col w-full gap-3 sm:flex-row sm:justify-center">
            <button 
              onClick={() => navigate(-1)}
              className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-slate-800/80 border border-slate-700 px-6 py-3.5 text-sm font-bold text-slate-200 transition-all hover:bg-slate-800 hover:border-slate-500 hover:text-white active:scale-[0.98]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12"/>
                <polyline points="12 19 5 12 12 5"/>
              </svg>
              Go Back
            </button>
            <Link 
              to="/"
              className={`flex-1 flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-bold text-white shadow-lg transition-all hover:-translate-y-0.5 active:scale-[0.98] ${
                is404
                  ? "bg-gradient-to-r from-cyan-500 to-blue-600 shadow-cyan-500/25 hover:shadow-cyan-500/40"
                  : "bg-gradient-to-r from-rose-500 to-pink-600 shadow-rose-500/25 hover:shadow-rose-500/40"
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                <polyline points="9 22 9 12 15 12 15 22"/>
              </svg>
              Return Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;