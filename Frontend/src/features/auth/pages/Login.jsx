import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const navigate = useNavigate();
  const { loading, login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Await the login attempt
      await login(email, password);
      
      // If successful, navigate to home
      navigate("/");
    } catch {
      // Global axios interceptor handles backend error notifications.
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-950">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 flex items-center justify-center px-5 relative overflow-hidden">
      {/* Background Blur */}
      <div className="absolute w-72 h-72 bg-cyan-500/20 blur-[120px] rounded-full top-20 left-20 pointer-events-none"></div>
      <div className="absolute w-72 h-72 bg-violet-500/20 blur-[120px] rounded-full bottom-10 right-20 pointer-events-none"></div>

      <div className="relative w-full max-w-md rounded-3xl border border-slate-700 bg-slate-900/70 backdrop-blur-xl p-8 shadow-2xl">
        <h1 className="text-4xl font-bold text-white text-center">
          Welcome Back 👋
        </h1>

        <p className="text-slate-400 text-center mt-2 mb-6">
          Login to continue your AI interview journey.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-slate-300 text-sm font-medium mb-1.5 block">Email</label>
            <input
              type="email"
              required
              value={email} // <-- Added value binding for autofill visibility
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-cyan-500 focus:bg-slate-900 focus:ring-2 focus:ring-cyan-500/30 transition-all"
            />
          </div>

          <div>
            <label className="text-slate-300 text-sm font-medium mb-1.5 block">Password</label>
            <input
              type="password"
              required
              value={password} // <-- Added value binding for autofill visibility
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-cyan-500 focus:bg-slate-900 focus:ring-2 focus:ring-cyan-500/30 transition-all"
            />
          </div>

          <button 
            type="submit"
            className="w-full rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 py-3.5 font-bold text-white shadow-lg shadow-cyan-500/25 transition-all hover:-translate-y-0.5 hover:shadow-cyan-500/40 active:scale-[0.98] mt-2"
          >
            Login
          </button>
        </form>

        {/* ── Recruiter Autofill Button ── */}
        <div className="mt-4 flex items-center justify-center">
          <button
            type="button"
            onClick={() => {
              setEmail("user1@example.com");
              setPassword("user1");
            }}
            className="group flex w-full items-center justify-center gap-2.5 rounded-xl border border-cyan-500/30 bg-cyan-500/10 px-5 py-3.5 text-sm font-semibold text-cyan-400 transition-all hover:bg-cyan-500/20 hover:border-cyan-500/50 hover:shadow-[0_0_20px_rgba(6,182,212,0.25)] active:scale-95"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="18" 
              height="18" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="transition-transform duration-300 group-hover:scale-110"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            Are you a recruiter? Autofill Demo
          </button>
        </div>

        <p className="mt-8 text-center text-slate-400 text-sm">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-bold text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            Register
          </Link>
        </p>
      </div>
    </main>
  );
};

export default Login;