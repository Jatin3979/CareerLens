import React, { useState, useRef } from "react";
import { useInterview } from "../hooks/useInterview.js";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState(null); // Tracks frontend validation errors
  
  const { loading, generateReport, reports } = useInterview();
  const [jobDescription, setJobDescription] = useState("");
  const [selfDescription, setSelfDescription] = useState("");
  const resumeInputRef = useRef();
  const navigate = useNavigate();

  const handleGenerateReport = async () => {
    // Clear any previous errors
    setError(null);
    const resumeFile = resumeInputRef.current?.files[0];

    // ── Frontend Validation ──
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

    // ── API Call ──
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
      <main className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-slate-950/80 backdrop-blur-md">
        <div className="relative flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center mb-6">
          <div className="absolute h-full w-full animate-ping rounded-full bg-cyan-500/20"></div>
          <div className="h-14 w-14 sm:h-16 sm:w-16 animate-spin rounded-full border-4 border-t-cyan-500 border-r-violet-500 border-b-transparent border-l-transparent"></div>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-400 animate-pulse text-center px-4">
          Loading your interview plan...
        </h1>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans relative overflow-x-hidden pb-28 sm:pb-12">
      {/* Background Ambient Glows */}
      <div className="absolute inset-0 -z-10 pointer-events-none fixed">
        <div className="absolute top-[-10%] left-[-5%] h-[300px] w-[300px] sm:h-[500px] sm:w-[500px] rounded-full bg-cyan-600/10 blur-[100px] sm:blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-5%] h-[300px] w-[300px] sm:h-[500px] sm:w-[500px] rounded-full bg-violet-600/10 blur-[100px] sm:blur-[120px] animate-pulse delay-1000" />
      </div>

      {/* ── Fixed Error Popup (Toast) ── */}
      {error && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] w-[calc(100%-2rem)] max-w-lg flex items-start gap-3 rounded-2xl border border-rose-500/30 bg-slate-900/95 px-5 py-4 text-sm font-medium text-rose-400 backdrop-blur-xl shadow-2xl shadow-rose-500/20 animate-in fade-in zoom-in-95 slide-in-from-top-10 duration-300">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-0.5">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <p className="flex-grow leading-relaxed">{error}</p>
          <button 
            onClick={() => setError(null)}
            className="shrink-0 p-1 text-rose-400/60 hover:text-rose-400 transition-colors rounded-lg hover:bg-rose-500/10"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-16">
        {/* Page Header */}
        <header className="text-center mb-10 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">
            Create Your Custom <br className="hidden md:block" />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 bg-clip-text text-transparent">
              Interview Plan
            </span>
          </h1>
          <p className="mt-4 sm:mt-6 max-w-2xl mx-auto text-base sm:text-lg text-slate-400 px-2">
            Let our AI analyze the job requirements and your unique profile to
            build a winning strategy.
          </p>
        </header>

        {/* Main Card */}
        <div className="rounded-2xl sm:rounded-3xl border border-white/10 bg-slate-900/40 backdrop-blur-xl shadow-2xl overflow-hidden ring-1 ring-white/5">
          <div className="grid lg:grid-cols-2">
            
            {/* Left Panel - Job Description */}
            <div className="p-5 sm:p-8 lg:p-10 border-b lg:border-b-0 lg:border-r border-white/10 flex flex-col">
              <div className="flex items-center justify-between mb-5 sm:mb-6">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                    </svg>
                  </span>
                  <h2 className="text-base sm:text-lg font-bold text-white">
                    Target Job Description
                  </h2>
                </div>
                <span className="rounded-full bg-red-500/10 px-2.5 py-1 text-[10px] sm:text-xs font-semibold text-red-400 border border-red-500/20">
                  Required
                </span>
              </div>

              <div className="relative flex-grow">
                <textarea
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  className="h-full min-h-[220px] sm:min-h-[300px] w-full resize-none rounded-2xl border border-slate-700 bg-slate-950/50 p-4 sm:p-6 text-sm leading-relaxed text-slate-200 placeholder:text-slate-500 outline-none transition-all focus:border-cyan-500 focus:bg-slate-900 focus:ring-2 focus:ring-cyan-500/20 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                  placeholder={`Paste the full job description here...\ne.g. 'Senior Frontend Engineer at Google requires proficiency in React, TypeScript, and large-scale system design...'`}
                  maxLength={5000}
                />
                <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-5 rounded-md bg-slate-900/80 px-2 py-1 text-[10px] sm:text-xs font-medium text-slate-500 backdrop-blur-sm border border-white/5">
                  {jobDescription.length} / 5000 chars
                </div>
              </div>
            </div>

            {/* Right Panel - Profile */}
            <div className="p-5 sm:p-8 lg:p-10 flex flex-col">
              <div className="flex items-center gap-3 mb-5 sm:mb-6">
                <span className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400 border border-violet-500/20">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </span>
                <h2 className="text-base sm:text-lg font-bold text-white">Your Profile</h2>
              </div>

              {/* Upload Resume */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-semibold text-slate-300">
                    Upload Resume
                  </label>
                  <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-[10px] sm:text-xs font-semibold text-emerald-400 border border-emerald-500/20">
                    Best Results
                  </span>
                </div>

                <label
                  htmlFor="resume"
                  className="group flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-700 bg-slate-950/50 p-6 sm:p-8 transition-all hover:border-cyan-500 hover:bg-slate-900/80 active:scale-[0.98]"
                >
                  <span className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-cyan-500/10 text-cyan-400 transition-transform group-hover:scale-110">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="sm:w-6 sm:h-6">
                      <polyline points="16 16 12 12 8 16" />
                      <line x1="12" y1="12" x2="12" y2="21" />
                      <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
                    </svg>
                  </span>
                  <p className="mt-3 sm:mt-4 text-sm font-semibold text-white">
                    Click to upload resume
                  </p>
                  <p className="mt-1 text-[10px] sm:text-xs text-slate-500">
                    PDF or DOCX (Max 5MB)
                  </p>
                  <input
                    ref={resumeInputRef}
                    hidden
                    type="file"
                    id="resume"
                    accept=".pdf,.docx"
                    onChange={(e) => {
                      setFileName(e.target.files[0]?.name || "");
                    }}
                  />
                </label>

                {/* UI Feedback for Selected File */}
                {fileName && (
                  <div className="mt-3 sm:mt-4 flex items-center justify-between rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-3 sm:px-4 py-2 sm:py-3 backdrop-blur-sm transition-all animate-in fade-in slide-in-from-top-2">
                    <div className="flex items-center gap-2 sm:gap-3 overflow-hidden">
                      <span className="text-emerald-400 text-sm sm:text-base">📄</span>
                      <p className="text-xs sm:text-sm font-medium text-emerald-300 truncate max-w-[200px] sm:max-w-xs">
                        {fileName}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setFileName("");
                        if (resumeInputRef.current)
                          resumeInputRef.current.value = "";
                      }}
                      className="text-slate-400 hover:text-red-400 transition-colors p-1"
                      title="Remove file"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                    </button>
                  </div>
                )}
              </div>

              {/* OR Divider */}
              <div className="relative my-5 sm:my-6 text-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-800"></div>
                </div>
                <span className="relative bg-slate-900 px-3 text-[10px] sm:text-xs font-semibold text-slate-500 rounded-full border border-slate-800">
                  OR
                </span>
              </div>

              {/* Quick Self-Description */}
              <div className="flex-grow">
                <label
                  className="mb-2 sm:mb-3 block text-sm font-semibold text-slate-300"
                  htmlFor="selfDescription"
                >
                  Quick Self-Description
                </label>
                <textarea
                  value={selfDescription}
                  onChange={(e) => setSelfDescription(e.target.value)}
                  id="selfDescription"
                  className="h-28 sm:h-32 w-full resize-none rounded-2xl border border-slate-700 bg-slate-950/50 p-4 sm:p-5 text-sm leading-relaxed text-slate-200 placeholder:text-slate-600 outline-none transition-all focus:border-violet-500 focus:bg-slate-900 focus:ring-2 focus:ring-violet-500/20 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                  placeholder="Briefly describe your experience, key skills, and years of experience if you don't have a resume handy..."
                />
              </div>

              {/* Info Box */}
              <div className="mt-5 sm:mt-6 flex items-start gap-3 rounded-xl border border-cyan-500/20 bg-gradient-to-r from-cyan-500/5 to-violet-500/5 p-3 sm:p-4">
                <span className="mt-0.5 text-cyan-400">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <circle cx="12" cy="12" r="10" opacity="0.2" />
                    <path d="M12 16v-4m0-4h.01M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                  </svg>
                </span>
                <p className="text-xs sm:text-sm text-slate-400">
                  Either a <strong className="text-slate-200">Resume</strong> or
                  a <strong className="text-slate-200">Self Description</strong>{" "}
                  is required to generate a personalized plan.
                </p>
              </div>
            </div>
          </div>

          {/* Card Footer (Desktop Only) */}
          <div className="hidden sm:flex flex-col items-center justify-between gap-4 border-t border-white/10 bg-slate-950/50 p-6 px-10 sm:flex-row">
            <span className="text-sm font-medium text-slate-400">
              AI-Powered Strategy Generation &bull; Approx 30s
            </span>
            <button
              onClick={handleGenerateReport}
              className="group flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-cyan-500/25 transition-all hover:-translate-y-0.5 hover:shadow-cyan-500/40 active:translate-y-0"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="transition-transform group-hover:rotate-12">
                <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
              </svg>
              Generate My Interview Strategy
            </button>
          </div>
        </div>

        {/* Recent Reports List */}
        {reports && reports.length > 0 && (
          <section className="mt-16 sm:mt-20">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 sm:mb-8">
              My Recent Interview Plans
            </h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {reports.map((report) => (
                <li
                  key={report._id}
                  onClick={() => navigate(`/interview/${report._id}`)}
                  className="group cursor-pointer rounded-2xl border border-slate-800 bg-slate-900/50 p-5 sm:p-6 transition-all hover:border-cyan-500/50 hover:bg-slate-800/50 hover:shadow-lg hover:shadow-cyan-500/10 active:scale-[0.98]"
                >
                  <h3 className="truncate text-base sm:text-lg font-bold text-slate-200 group-hover:text-cyan-400 transition-colors">
                    {report.title || "Untitled Position"}
                  </h3>
                  <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-slate-500">
                    Generated on{" "}
                    {new Date(report.createdAt).toLocaleDateString()}
                  </p>
                  <div className="mt-4 flex items-center">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 sm:px-3 py-1 text-[10px] sm:text-xs font-semibold border ${
                        report.matchScore >= 80
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                          : report.matchScore >= 60
                            ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                            : "bg-rose-500/10 text-rose-400 border-rose-500/20"
                      }`}
                    >
                      Match Score: {report.matchScore}%
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Page Footer */}
        <footer className="mt-16 sm:mt-20 flex flex-wrap justify-center gap-x-6 sm:gap-x-8 gap-y-4 border-t border-slate-800 pt-6 sm:pt-8 text-xs sm:text-sm font-medium text-slate-500">
          <a href="#" className="hover:text-cyan-400 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-cyan-400 transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-cyan-400 transition-colors">Help Center</a>
        </footer>
      </div>

      {/* ── Fixed Bottom Action Bar (Mobile Only) ── */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-[90] bg-slate-950/85 backdrop-blur-xl border-t border-white/10 p-4 pb-6 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
        <button
          onClick={handleGenerateReport}
          className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-4 text-sm font-bold text-white shadow-lg shadow-cyan-500/25 active:scale-[0.98] transition-transform border border-cyan-400/20"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
          </svg>
          Generate My Interview Strategy
        </button>
      </div>

    </div>
  );
};

export default Home;