import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null); // Added state to track errors

  const navigate = useNavigate();
  const { loading, register } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear any previous errors

    try {
      // Await the registration attempt
      await register(username, email, password);
      
      // If successful, navigate to home
      navigate("/");
    } catch (err) {
      // Catch backend errors (e.g., "Email already in use")
      const errorMessage = 
        err.response?.data?.message || 
        err.message || 
        "Failed to create an account. Please try again.";
        
      setError(errorMessage);

      // Auto-hide the error after 5 seconds
      setTimeout(() => setError(null), 5000);
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
          Create Account
        </h1>

        <p className="text-slate-400 text-center mt-2 mb-6">
          Start preparing smarter with AI.
        </p>

        {/* ── Error Banner ── */}
        {error && (
          <div className="mb-6 flex items-center gap-3 rounded-xl border border-rose-500/20 bg-rose-500/10 px-4 py-3 text-sm font-medium text-rose-400 backdrop-blur-sm animate-in fade-in slide-in-from-top-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-slate-300 text-sm font-medium mb-1.5 block">Username</label>
            <input
              type="text"
              required
              placeholder="Enter username"
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-cyan-500 focus:bg-slate-900 focus:ring-2 focus:ring-cyan-500/30 transition-all"
            />
          </div>

          <div>
            <label className="text-slate-300 text-sm font-medium mb-1.5 block">Email</label>
            <input
              type="email"
              required
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
              placeholder="Create password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-cyan-500 focus:bg-slate-900 focus:ring-2 focus:ring-cyan-500/30 transition-all"
            />
          </div>

          <button 
            type="submit"
            className="w-full rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 py-3.5 font-bold text-white shadow-lg shadow-cyan-500/25 transition-all hover:-translate-y-0.5 hover:shadow-cyan-500/40 active:scale-[0.98] mt-2"
          >
            Create Account
          </button>
        </form>

        <p className="mt-8 text-center text-slate-400 text-sm">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-bold text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            Login
          </Link>
        </p>
      </div>
    </main>
  );
};

export default Register;