import React, { useState, useEffect } from "react";
import { useInterview } from "../hooks/useInterview.js";
import { useNavigate, useParams } from "react-router-dom";

const NAV_ITEMS = [
  {
    id: "technical",
    label: "Technical Questions",
    shortLabel: "Technical",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    id: "behavioral",
    label: "Behavioral Questions",
    shortLabel: "Behavioral",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    id: "roadmap",
    label: "Preparation Road Map",
    shortLabel: "Road Map",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="3 11 22 2 13 21 11 13 3 11" />
      </svg>
    ),
  },
];

// ── Sub-components ────────────────────────────────────────────────────────────
const QuestionCard = ({ item, index }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="group rounded-2xl border border-white/10 bg-slate-900/40 backdrop-blur-md overflow-hidden transition-all duration-300 hover:border-cyan-500/30 hover:bg-slate-900/60 shadow-lg mb-4">
      <button 
        onClick={() => setOpen((o) => !o)} 
        className="w-full flex items-start sm:items-center justify-between p-4 sm:p-5 text-left focus:outline-none min-h-[60px]"
      >
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 pr-4">
          <span className="flex-shrink-0 flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400 font-bold text-xs sm:text-sm border border-cyan-500/20 shadow-inner shadow-cyan-500/10">
            Q{index + 1}
          </span>
          <p className="font-semibold text-slate-200 text-sm sm:text-base leading-relaxed sm:mt-0 mt-1">{item.question}</p>
        </div>
        <span className={`flex-shrink-0 flex h-8 w-8 items-center justify-center rounded-full bg-slate-800/50 text-slate-400 transition-transform duration-300 mt-1 sm:mt-0 ${open ? "rotate-180 bg-cyan-500/20 text-cyan-400" : ""}`}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </span>
      </button>
      
      {open && (
        <div className="p-4 sm:p-5 pt-0 border-t border-white/5 mt-2 animate-in slide-in-from-top-2 fade-in duration-300">
          <div className="mb-4 mt-3 rounded-xl bg-violet-500/5 border border-violet-500/10 p-3 sm:p-4">
            <span className="inline-flex items-center gap-2 mb-2 text-[11px] sm:text-xs font-bold text-violet-400 uppercase tracking-wider">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="2"/></svg>
              Interviewer's Intention
            </span>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{item.intention}</p>
          </div>
          <div className="rounded-xl bg-emerald-500/5 border border-emerald-500/10 p-3 sm:p-4">
            <span className="inline-flex items-center gap-2 mb-2 text-[11px] sm:text-xs font-bold text-emerald-400 uppercase tracking-wider">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
              How to Answer
            </span>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{item.answer}</p>
          </div>
        </div>
      )}
    </div>
  );
};

const RoadMapDay = ({ day }) => (
  <div className="relative pl-6 sm:pl-8 pb-8 sm:pb-10 border-l border-slate-700/50 last:border-transparent last:pb-0 ml-2 sm:ml-0">
    <div className="absolute left-[-14px] sm:left-[-16px] top-0 flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full border-4 border-slate-950 bg-gradient-to-br from-cyan-400 to-blue-500 text-slate-950 font-bold text-[10px] sm:text-xs shadow-[0_0_15px_rgba(6,182,212,0.4)]">
      {day.day}
    </div>
    <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-5 sm:p-6 backdrop-blur-md transition-all hover:border-cyan-500/30 hover:shadow-lg hover:shadow-cyan-500/10 -mt-1 sm:-mt-2">
      <h3 className="text-base sm:text-lg font-bold text-white mb-3 sm:mb-4">{day.focus}</h3>
      <ul className="space-y-2 sm:space-y-3">
        {day.tasks.map((task, i) => (
          <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
            {task}
          </li>
        ))}
      </ul>
    </div>
  </div>
);

// ── Main Component ────────────────────────────────────────────────────────────
const Interview = () => {
  const [activeNav, setActiveNav] = useState("technical");
  const { report, getReportById, loading, getResumePdf } = useInterview();
  const { interviewId } = useParams();

  useEffect(() => {
    if (interviewId) {
      getReportById(interviewId);
    }
  }, [interviewId]);

  if (loading || !report) {
    return (
      <main className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950/80 backdrop-blur-md">
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

  // Dynamic styling based on score
  const getScoreStyles = (score) => {
    if (score >= 80) return "text-emerald-400 border-emerald-500/30 bg-emerald-500/10 drop-shadow-[0_0_15px_rgba(16,185,129,0.3)]";
    if (score >= 60) return "text-amber-400 border-amber-500/30 bg-amber-500/10 drop-shadow-[0_0_15px_rgba(245,158,11,0.3)]";
    return "text-rose-400 border-rose-500/30 bg-rose-500/10 drop-shadow-[0_0_15px_rgba(225,29,72,0.3)]";
  };

  const getSeverityStyles = (severity) => {
    switch(severity.toLowerCase()) {
      case "high": return "bg-rose-500/10 text-rose-400 border-rose-500/20";
      case "medium": return "bg-amber-500/10 text-amber-400 border-amber-500/20";
      case "low": return "bg-blue-500/10 text-blue-400 border-blue-500/20";
      default: return "bg-slate-500/10 text-slate-400 border-slate-500/20";
    }
  };

  // Extracted Skill Gaps for reuse in mobile vs desktop flow
  const renderSkillGaps = (isDesktop = false) => {
    if (!report.skillGaps || report.skillGaps.length === 0) return null;
    return (
      <div className={`rounded-3xl border border-white/10 bg-slate-900/40 backdrop-blur-xl p-5 sm:p-6 shadow-xl ${!isDesktop ? 'mb-6 lg:hidden' : 'hidden lg:block'}`}>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-amber-400">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
          </span>
          <p className="text-sm font-bold text-slate-200 uppercase tracking-wider">Skill Gaps</p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {report.skillGaps.map((gap, i) => (
            <span
              key={i}
              className={`inline-flex items-center rounded-full px-3 py-1.5 text-xs font-semibold border ${getSeverityStyles(gap.severity)}`}
            >
              {gap.skill}
              <span className="ml-1.5 opacity-60 font-normal">({gap.severity})</span>
            </span>
          ))}
        </div>
      </div>
    );
  };

  return (
    // Increased pb-36 to prevent the fixed bottom mobile bar from covering the last item
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans relative overflow-x-hidden pb-36 lg:pb-20">
      
      {/* Background Ambient Glows */}
      <div className="absolute inset-0 -z-10 pointer-events-none fixed">
        <div className="absolute top-[-10%] left-[-5%] h-[300px] w-[300px] sm:h-[500px] sm:w-[500px] rounded-full bg-cyan-600/10 blur-[100px] sm:blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-5%] h-[300px] w-[300px] sm:h-[500px] sm:w-[500px] rounded-full bg-violet-600/10 blur-[100px] sm:blur-[120px] animate-pulse delay-1000" />
      </div>

      {/* Increased pt-24 sm:pt-28 to clear the global app top navbar completely on mobile */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 lg:pt-20">
        
        {/* ── Brilliant Mobile Header ── */}
        <header className="lg:hidden mb-6 flex flex-col gap-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1 min-w-0">
              <span className="inline-block rounded-full bg-slate-800/80 border border-white/5 px-2.5 py-0.5 text-[10px] font-medium text-slate-400 mb-2">
                Target Role
              </span>
              <h1 className="text-2xl font-extrabold text-white truncate leading-tight">{report.title || "Interview Strategy"}</h1>
            </div>
            
            {/* Compact Match Score Ring for Mobile */}
            <div className={`flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-full border-[3px] shadow-lg ${getScoreStyles(report.matchScore)}`}>
              <span className="text-lg font-extrabold leading-none">{report.matchScore}</span>
            </div>
          </div>
        </header>

        {/* ── Mobile Skill Gaps (Rendered up top for maximum visibility) ── */}
        {renderSkillGaps(false)}

        {/* ── Brilliant Mobile Sticky Nav ── */}
        {/* top-[70px] ensures it doesn't overlap the global app navbar when scrolling */}
        <div className="lg:hidden sticky top-[70px] sm:top-[80px] z-40 -mx-4 px-4 py-3 mb-6 bg-slate-950/90 backdrop-blur-2xl border-b border-white/5 shadow-md overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <div className="flex gap-2 w-max">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveNav(item.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold transition-all duration-300 ${
                  activeNav === item.id 
                  ? "bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 shadow-inner shadow-cyan-500/10" 
                  : "bg-slate-900/80 text-slate-400 border border-white/5 hover:text-slate-200"
                }`}
              >
                <span className={activeNav === item.id ? "text-cyan-400" : "text-slate-500"}>{item.icon}</span>
                {item.shortLabel}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          
          {/* ── Desktop Left Nav (Col 1-3) ── */}
          <nav className="hidden lg:flex lg:col-span-3 lg:sticky lg:top-24 flex-col gap-6">
            <div className="rounded-3xl border border-white/10 bg-slate-900/40 backdrop-blur-xl p-6 shadow-xl">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4 px-2">Sections</p>
              <div className="flex flex-col gap-2">
                {NAV_ITEMS.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveNav(item.id)}
                    className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                      activeNav === item.id 
                      ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shadow-inner shadow-cyan-500/10" 
                      : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200 border border-transparent"
                    }`}
                  >
                    <span className={activeNav === item.id ? "text-cyan-400" : "text-slate-500"}>{item.icon}</span>
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => getResumePdf(interviewId)}
              className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-6 py-4 text-sm font-bold text-white shadow-lg shadow-violet-500/25 transition-all hover:-translate-y-0.5 hover:shadow-violet-500/40 active:translate-y-0 border border-violet-400/20"
            >
              <svg height="18" width="18" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="transition-transform group-hover:scale-110">
                <path d="M10.6144 17.7956 11.492 15.7854C12.2731 13.9966 13.6789 12.5726 15.4325 11.7942L17.8482 10.7219C18.6162 10.381 18.6162 9.26368 17.8482 8.92277L15.5079 7.88394C13.7092 7.08552 12.2782 5.60881 11.5105 3.75894L10.6215 1.61673C10.2916.821765 9.19319.821767 8.8633 1.61673L7.97427 3.75892C7.20657 5.60881 5.77553 7.08552 3.97685 7.88394L1.63658 8.92277C.868537 9.26368.868536 10.381 1.63658 10.7219L4.0523 11.7942C5.80589 12.5726 7.21171 13.9966 7.99275 15.7854L8.8704 17.7956C9.20776 18.5682 10.277 18.5682 10.6144 17.7956ZM19.4014 22.6899 19.6482 22.1242C20.0882 21.1156 20.8807 20.3125 21.8695 19.8732L22.6299 19.5353C23.0412 19.3526 23.0412 18.7549 22.6299 18.5722L21.9121 18.2532C20.8978 17.8026 20.0911 16.9698 19.6586 15.9269L19.4052 15.3156C19.2285 14.8896 18.6395 14.8896 18.4628 15.3156L18.2094 15.9269C17.777 16.9698 16.9703 17.8026 15.956 18.2532L15.2381 18.5722C14.8269 18.7549 14.8269 19.3526 15.2381 19.5353L15.9985 19.8732C16.9874 20.3125 17.7798 21.1156 18.2198 22.1242L18.4667 22.6899C18.6473 23.104 19.2207 23.104 19.4014 22.6899Z"></path>
              </svg>
              Tailor Resume to PDF
            </button>
          </nav>

          {/* ── Center Content (Col 4-9) ── */}
          <main className="lg:col-span-6 min-h-[500px]">
            {/* Header (Desktop Only) */}
            <header className="hidden lg:block mb-10">
              <span className="inline-block rounded-full bg-slate-800/80 border border-white/5 px-3 py-1 text-xs font-medium text-slate-400 mb-4">
                Target Role
              </span>
              <h1 className="text-4xl font-extrabold text-white leading-tight">{report.title || "Interview Strategy"}</h1>
            </header>

            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              
              {activeNav === "technical" && (
                <section>
                  <div className="flex items-center justify-between mb-5 sm:mb-6">
                    <h2 className="text-xl sm:text-2xl font-bold text-white">Technical</h2>
                    <span className="rounded-full bg-slate-800 border border-slate-700 px-3 py-1 text-xs font-semibold text-slate-300">
                      {report.technicalQuestions.length} Qs
                    </span>
                  </div>
                  <div>
                    {report.technicalQuestions.map((q, i) => (
                      <QuestionCard key={i} item={q} index={i} />
                    ))}
                  </div>
                </section>
              )}

              {activeNav === "behavioral" && (
                <section>
                  <div className="flex items-center justify-between mb-5 sm:mb-6">
                    <h2 className="text-xl sm:text-2xl font-bold text-white">Behavioral</h2>
                    <span className="rounded-full bg-slate-800 border border-slate-700 px-3 py-1 text-xs font-semibold text-slate-300">
                      {report.behavioralQuestions.length} Qs
                    </span>
                  </div>
                  <div>
                    {report.behavioralQuestions.map((q, i) => (
                      <QuestionCard key={i} item={q} index={i} />
                    ))}
                  </div>
                </section>
              )}

              {activeNav === "roadmap" && (
                <section>
                  <div className="flex items-center justify-between mb-6 sm:mb-8">
                    <h2 className="text-xl sm:text-2xl font-bold text-white">Road Map</h2>
                    <span className="rounded-full bg-slate-800 border border-slate-700 px-3 py-1 text-xs font-semibold text-slate-300">
                      {report.preparationPlan.length}-Day
                    </span>
                  </div>
                  <div>
                    {report.preparationPlan.map((day) => (
                      <RoadMapDay key={day.day} day={day} />
                    ))}
                  </div>
                </section>
              )}

            </div>
          </main>

          {/* ── Right Sidebar (Col 10-12) ── */}
          <aside className="lg:col-span-3 lg:sticky lg:top-24 flex flex-col gap-6 mt-6 lg:mt-0">
            
            {/* Match Score Card (Hidden on Mobile because it's in the header) */}
            <div className="hidden lg:flex rounded-3xl border border-white/10 bg-slate-900/40 backdrop-blur-xl p-8 shadow-xl text-center flex-col items-center">
              <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-6">Profile Match Score</p>
              
              <div className={`flex h-32 w-32 items-center justify-center rounded-full border-4 ${getScoreStyles(report.matchScore)}`}>
                <div className="flex items-baseline">
                  <span className="text-5xl font-extrabold tracking-tighter">{report.matchScore}</span>
                  <span className="text-xl font-bold opacity-60 ml-1">%</span>
                </div>
              </div>
              
              <p className="mt-6 text-sm font-medium text-slate-300 bg-slate-800/50 rounded-full px-4 py-1.5 border border-white/5">
                {report.matchScore >= 80 ? "Strong Match 🚀" : report.matchScore >= 60 ? "Moderate Match 🎯" : "Needs Preparation 📚"}
              </p>
            </div>

            {/* Desktop Skill Gaps (Hidden on mobile as it renders at the top) */}
            {renderSkillGaps(true)}
            
          </aside>

        </div>
      </div>

      {/* ── Fixed Bottom Action Bar (Mobile Only) ── */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-slate-950/85 backdrop-blur-xl border-t border-white/10 p-4 pb-6">
        <button
          onClick={() => getResumePdf(interviewId)}
          className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-6 py-4 text-sm font-bold text-white shadow-lg shadow-violet-500/25 active:scale-[0.98] transition-transform border border-violet-400/20"
        >
          <svg height="18" width="18" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M10.6144 17.7956 11.492 15.7854C12.2731 13.9966 13.6789 12.5726 15.4325 11.7942L17.8482 10.7219C18.6162 10.381 18.6162 9.26368 17.8482 8.92277L15.5079 7.88394C13.7092 7.08552 12.2782 5.60881 11.5105 3.75894L10.6215 1.61673C10.2916.821765 9.19319.821767 8.8633 1.61673L7.97427 3.75892C7.20657 5.60881 5.77553 7.08552 3.97685 7.88394L1.63658 8.92277C.868537 9.26368.868536 10.381 1.63658 10.7219L4.0523 11.7942C5.80589 12.5726 7.21171 13.9966 7.99275 15.7854L8.8704 17.7956C9.20776 18.5682 10.277 18.5682 10.6144 17.7956ZM19.4014 22.6899 19.6482 22.1242C20.0882 21.1156 20.8807 20.3125 21.8695 19.8732L22.6299 19.5353C23.0412 19.3526 23.0412 18.7549 22.6299 18.5722L21.9121 18.2532C20.8978 17.8026 20.0911 16.9698 19.6586 15.9269L19.4052 15.3156C19.2285 14.8896 18.6395 14.8896 18.4628 15.3156L18.2094 15.9269C17.777 16.9698 16.9703 17.8026 15.956 18.2532L15.2381 18.5722C14.8269 18.7549 14.8269 19.3526 15.2381 19.5353L15.9985 19.8732C16.9874 20.3125 17.7798 21.1156 18.2198 22.1242L18.4667 22.6899C18.6473 23.104 19.2207 23.104 19.4014 22.6899Z"></path>
          </svg>
          Tailor Resume to PDF
        </button>
      </div>

    </div>
  );
};

export default Interview;