import React, { useState, useRef } from "react";
import { useInterview } from "../hooks/useInterview.js";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState(null);

  const { loading, generateReport, reports } = useInterview();
  const [jobDescription, setJobDescription] = useState("");
  const [selfDescription, setSelfDescription] = useState("");
  const resumeInputRef = useRef();
  const navigate = useNavigate();

  const handleGenerateReport = async () => {
    setError(null);
    const resumeFile = resumeInputRef.current?.files[0];

    if (!jobDescription.trim()) {
      setError("Please provide a Target Job Description to proceed.");
      setTimeout(() => setError(null), 5000);
      return;
    }

    if (!resumeFile && !selfDescription.trim()) {
      setError("Please provide either a Resume or a Quick Self-Description.");
      setTimeout(() => setError(null), 5000);
      return;
    }

    try {
      const data = await generateReport({
        jobDescription,
        selfDescription,
        resumeFile,
      });

      if (data && data._id) {
        navigate(`/interview/${data._id}`);
      }
    } catch {
      // Global axios interceptor handles backend error notifications.
    }
  };

  if (loading) {
    return (
      <main className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-slate-950/80 backdrop-blur-2xl">
        <div className="relative flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center mb-8">
          <div className="absolute h-full w-full animate-ping rounded-full bg-cyan-500/30"></div>
          <div className="absolute h-full w-full animate-spin rounded-full bg-gradient-to-tr from-cyan-500 to-violet-500 blur-md opacity-50"></div>
          <div className="relative h-14 w-14 sm:h-16 sm:w-16 animate-spin rounded-full border-4 border-t-white border-r-transparent border-b-transparent border-l-transparent"></div>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-white to-violet-300 animate-pulse text-center px-4 tracking-wide">
          Synthesizing your strategy...
        </h1>
      </main>
    );
  }

  return (
    // pb-36 ensures the content doesn't get hidden behind the fixed mobile button
    <div className="min-h-screen bg-[#020617] text-slate-200 font-sans relative overflow-x-hidden pb-36 sm:pb-16 selection:bg-cyan-500/30 selection:text-cyan-50">
      
      {/* ── Immersive Aurora Glows ── */}
      <div className="absolute inset-0 -z-10 pointer-events-none fixed overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] h-[400px] w-[400px] sm:h-[600px] sm:w-[600px] rounded-full bg-cyan-600/15 blur-[120px] sm:blur-[160px] mix-blend-screen" />
        <div className="absolute top-[20%] right-[-10%] h-[300px] w-[300px] sm:h-[500px] sm:w-[500px] rounded-full bg-violet-600/15 blur-[100px] sm:blur-[140px] mix-blend-screen" />
        <div className="absolute bottom-[-20%] left-[20%] h-[400px] w-[400px] rounded-full bg-blue-600/10 blur-[120px] mix-blend-screen" />
      </div>

      {/* ── Fixed Error Popup ── */}
      {error && (
        <div className="fixed top-6 sm:top-24 left-1/2 -translate-x-1/2 z-[100] w-[calc(100%-2rem)] max-w-md flex items-start gap-3 rounded-2xl border border-rose-500/30 bg-slate-900/80 px-5 py-4 text-sm font-medium text-rose-300 backdrop-blur-xl shadow-2xl shadow-rose-900/20 animate-in fade-in zoom-in-95 slide-in-from-top-4 duration-300">
          <svg className="shrink-0 mt-0.5 text-rose-500" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <p className="flex-grow leading-relaxed">{error}</p>
          <button onClick={() => setError(null)} className="shrink-0 p-1 text-rose-400/60 hover:text-rose-300 transition-colors rounded-lg hover:bg-rose-500/20">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      )}

     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 lg:pt-16">
        
        {/* ── Header ── */}
        <header className="text-center mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.05] backdrop-blur-md mb-6">
            <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-pulse"></span>
            <span className="text-xs font-medium tracking-wide text-slate-300 uppercase">AI-Powered Strategy</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white drop-shadow-lg">
            Create Your Custom <br className="hidden md:block" />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400 bg-clip-text text-transparent">
              Interview Plan
            </span>
          </h1>
          <p className="mt-4 sm:mt-6 max-w-2xl mx-auto text-base sm:text-lg text-slate-400 px-2 font-light">
            Let our AI analyze the job requirements and your unique profile to build a winning strategy.
          </p>
        </header>

        {/* ── Premium Frosted Glass Card ── */}
        <div className="relative rounded-3xl bg-slate-900/30 backdrop-blur-2xl border border-white/[0.08] shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] overflow-hidden">
          {/* Subtle inner gradient highlight */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />

          <div className="relative grid lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-white/[0.08]">
            
            {/* Left Panel - Job Description */}
            <div className="p-5 sm:p-8 lg:p-10 flex flex-col group">
              <div className="flex items-center justify-between mb-5 sm:mb-6">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/10 text-cyan-400 border border-cyan-500/20 shadow-[0_0_15px_rgba(6,182,212,0.15)] group-hover:shadow-[0_0_25px_rgba(6,182,212,0.25)] transition-all">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                    </svg>
                  </span>
                  <h2 className="text-lg font-bold text-white tracking-wide">Target Job Description</h2>
                </div>
                <span className="rounded-full bg-rose-500/10 px-2.5 py-1 text-[10px] sm:text-xs font-semibold text-rose-400 border border-rose-500/20 backdrop-blur-md">
                  Required
                </span>
              </div>

              <div className="relative flex-grow flex flex-col">
                <textarea
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  className="flex-grow min-h-[180px] sm:min-h-[300px] w-full resize-none rounded-2xl border border-white/[0.05] bg-black/20 p-5 text-sm leading-relaxed text-slate-200 placeholder:text-slate-500 outline-none transition-all focus:border-cyan-500/50 focus:bg-black/40 focus:ring-4 focus:ring-cyan-500/10 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] shadow-inner"
                  placeholder={`Paste the full job description here...\ne.g. 'Senior Frontend Engineer at Google requires proficiency in React, TypeScript, and large-scale system design...'`}
                  maxLength={5000}
                />
                <div className="absolute bottom-4 right-4 rounded-lg bg-black/40 px-2.5 py-1 text-[10px] font-medium text-slate-400 backdrop-blur-md border border-white/5">
                  {jobDescription.length} / 5000
                </div>
              </div>
            </div>

            {/* Right Panel - Profile */}
            <div className="p-5 sm:p-8 lg:p-10 flex flex-col">
              <div className="flex items-center gap-3 mb-5 sm:mb-6">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/20 to-fuchsia-500/10 text-violet-400 border border-violet-500/20 shadow-[0_0_15px_rgba(139,92,246,0.15)] transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </span>
                <h2 className="text-lg font-bold text-white tracking-wide">Your Profile</h2>
              </div>

              {/* Upload Resume */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-medium text-slate-300">Upload Resume</label>
                  <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-[10px] font-semibold text-emerald-400 border border-emerald-500/20 backdrop-blur-md">
                    Best Results
                  </span>
                </div>

                <label
                  htmlFor="resume"
                  className="relative group flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-white/10 bg-black/20 p-6 sm:p-8 transition-all hover:border-cyan-500/50 hover:bg-black/40 active:scale-[0.98] overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="relative flex h-12 w-12 items-center justify-center rounded-full bg-white/5 text-slate-300 transition-all group-hover:scale-110 group-hover:bg-cyan-500/20 group-hover:text-cyan-400 group-hover:shadow-[0_0_20px_rgba(6,182,212,0.3)]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="16 16 12 12 8 16" />
                      <line x1="12" y1="12" x2="12" y2="21" />
                      <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
                    </svg>
                  </span>
                  <p className="relative mt-4 text-sm font-medium text-white group-hover:text-cyan-100 transition-colors">
                    Click to upload document
                  </p>
                  <p className="relative mt-1.5 text-[11px] text-slate-500 font-medium tracking-wide">
                    PDF OR DOCX (MAX 5MB)
                  </p>
                  <input
                    ref={resumeInputRef}
                    hidden
                    type="file"
                    id="resume"
                    accept=".pdf,.docx"
                    onChange={(e) => setFileName(e.target.files[0]?.name || "")}
                  />
                </label>

                {/* UI Feedback for Selected File */}
                {fileName && (
                  <div className="mt-3 flex items-center justify-between rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 backdrop-blur-md shadow-[0_0_15px_rgba(16,185,129,0.1)] transition-all animate-in zoom-in-95">
                    <div className="flex items-center gap-3 overflow-hidden">
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                      </span>
                      <p className="text-sm font-semibold text-emerald-200 truncate max-w-[180px] sm:max-w-[220px]">
                        {fileName}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setFileName("");
                        if (resumeInputRef.current) resumeInputRef.current.value = "";
                      }}
                      className="text-emerald-400/60 hover:text-emerald-300 hover:bg-emerald-500/20 transition-all p-1.5 rounded-lg"
                      title="Remove file"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                    </button>
                  </div>
                )}
              </div>

              {/* Minimal OR Divider */}
              <div className="relative my-6 flex items-center justify-center">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/[0.06]"></div></div>
                <span className="relative bg-slate-900/80 px-4 text-[11px] font-bold tracking-widest text-slate-500 rounded-full border border-white/[0.08] backdrop-blur-xl">
                  OR
                </span>
              </div>

              {/* Quick Self-Description */}
              <div className="flex-grow flex flex-col">
                <label className="mb-3 block text-sm font-medium text-slate-300" htmlFor="selfDescription">
                  Quick Self-Description
                </label>
                <textarea
                  value={selfDescription}
                  onChange={(e) => setSelfDescription(e.target.value)}
                  id="selfDescription"
                  className="flex-grow min-h-[120px] sm:min-h-[140px] w-full resize-none rounded-2xl border border-white/[0.05] bg-black/20 p-5 text-sm leading-relaxed text-slate-200 placeholder:text-slate-600 outline-none transition-all focus:border-violet-500/50 focus:bg-black/40 focus:ring-4 focus:ring-violet-500/10 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] shadow-inner"
                  placeholder="Describe your tech stack, years of experience, and key projects..."
                />
              </div>

            </div>
          </div>

          {/* Card Footer (Desktop Only) */}
          <div className="hidden sm:flex items-center justify-between border-t border-white/[0.08] bg-white/[0.01] p-6 px-10">
            <span className="flex items-center gap-2 text-xs font-medium tracking-wide text-slate-500">
              <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span></span>
              ~30s AI Generation Time
            </span>
            <button
              onClick={handleGenerateReport}
              className="group relative inline-flex items-center justify-center gap-2 rounded-xl px-8 py-3.5 text-sm font-bold text-white transition-all active:scale-95 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-500 bg-[length:200%_100%] transition-all group-hover:bg-[100%_0] group-hover:scale-105" />
              <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity mix-blend-overlay" />
              <span className="relative flex items-center gap-2 shadow-black/50 drop-shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="transition-transform group-hover:rotate-12"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" /></svg>
                Generate Strategy
              </span>
            </button>
          </div>
        </div>

        {/* ── Recent Reports Grid ── */}
        {reports && reports.length > 0 && (
          <section className="mt-20">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-8 tracking-wide">
              Recent Plans
            </h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {reports.map((report) => (
                <li
                  key={report._id}
                  onClick={() => navigate(`/interview/${report._id}`)}
                  className="group relative cursor-pointer rounded-2xl bg-white/[0.02] border border-white/[0.05] p-6 transition-all hover:bg-white/[0.04] hover:border-cyan-500/30 active:scale-[0.98] overflow-hidden backdrop-blur-xl"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 via-transparent to-violet-500/0 group-hover:from-cyan-500/10 group-hover:to-violet-500/10 transition-colors" />
                  <div className="relative">
                    <h3 className="truncate text-lg font-bold text-slate-200 group-hover:text-white transition-colors">
                      {report.title || "Untitled Position"}
                    </h3>
                    <p className="mt-1 text-xs font-medium text-slate-500">
                      {new Date(report.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                    </p>
                    <div className="mt-5">
                      <span className={`inline-flex items-center rounded-lg px-3 py-1.5 text-xs font-bold border backdrop-blur-md shadow-inner ${
                        report.matchScore >= 80 ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : report.matchScore >= 60 ? "bg-amber-500/10 text-amber-400 border-amber-500/20" : "bg-rose-500/10 text-rose-400 border-rose-500/20"
                      }`}>
                        Match: {report.matchScore}%
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* ── Footer ── */}
        <footer className="mt-20 flex flex-wrap justify-center gap-x-8 gap-y-4 border-t border-white/[0.05] pt-8 text-xs font-medium text-slate-500 tracking-wide">
          <a href="#" className="hover:text-cyan-400 transition-colors">Privacy</a>
          <a href="#" className="hover:text-cyan-400 transition-colors">Terms</a>
          <a href="#" className="hover:text-cyan-400 transition-colors">Help Center</a>
        </footer>
      </div>

      {/* ── Fixed Bottom Action Bar (Mobile Only) ── */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-[90] bg-slate-950/80 backdrop-blur-2xl border-t border-white/[0.08] p-4 pb-safe shadow-[0_-20px_40px_-15px_rgba(0,0,0,0.7)] supports-[padding:max(0px)]:pb-[max(1rem,env(safe-area-inset-bottom))]">
        <button
          onClick={handleGenerateReport}
          className="group relative flex w-full items-center justify-center gap-2 rounded-xl py-4 text-sm font-bold text-white transition-all active:scale-[0.98] overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-violet-500" />
          <div className="absolute inset-0 bg-white/20 opacity-0 active:opacity-100 transition-opacity mix-blend-overlay" />
          <span className="relative flex items-center gap-2 drop-shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" /></svg>
            Generate Strategy
          </span>
        </button>
      </div>
    </div>
  );
};

export default Home;