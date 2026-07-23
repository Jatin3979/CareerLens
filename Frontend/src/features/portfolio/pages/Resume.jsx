// src/features/portfolio/pages/Resume.jsx
import React from "react";
import { Link } from "react-router-dom";

const Resume = () => {
  const resumeUrl = "/Resume.pdf";

  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-950 text-slate-200 p-4 sm:p-6 lg:p-8 flex flex-col relative overflow-hidden">
      
      {/* Background Ambient Glows */}
      <div className="absolute inset-0 -z-10 pointer-events-none fixed">
        <div className="absolute top-[-10%] left-[-5%] h-[500px] w-[500px] rounded-full bg-cyan-600/10 blur-[120px]" />
      </div>

      <div className="max-w-5xl mx-auto w-full flex flex-col h-full flex-grow">
        
        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <Link 
            to="/contact" 
            className="group flex items-center gap-2 rounded-xl bg-slate-900/50 border border-white/10 px-4 py-2.5 text-sm font-semibold text-slate-300 transition-all hover:bg-slate-800 hover:text-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:-translate-x-1">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            Back to Profile
          </Link>

          <h1 className="text-lg font-bold text-white hidden sm:block">
            Jatin Kumar - Resume
          </h1>

          <a 
            href={resumeUrl}
            download="Jatin_Kumar_Resume.pdf"
            className="flex items-center gap-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 px-4 py-2.5 text-sm font-semibold text-cyan-400 transition-all hover:bg-cyan-500/20"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            Download PDF
          </a>
        </div>

        {/* PDF Viewer Container */}
        <div className="flex-grow w-full rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl overflow-hidden min-h-[75vh] flex items-center justify-center p-2 sm:p-4">
          
          {/* 
            👇 THE MAGIC HAPPENS HERE 👇
            #toolbar=0 : Hides the top grey bar
            #navpanes=0 : Hides the left thumbnail sidebar
            #scrollbar=0 : Hides the ugly native scrollbar
            #view=FitH : Fits it perfectly to the width
          */}
          <iframe 
            src={`${resumeUrl}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`} 
            title="Resume PDF Viewer"
            className="w-full h-full min-h-[70vh] rounded-xl bg-white"
            style={{ border: 'none' }}
          />
        </div>
        
      </div>
    </div>
  );
};

export default Resume;