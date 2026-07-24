import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useContact } from "../hooks/useContact"; // 👈 Import your new hook

const Contact = () => {
  // 1. UI State (just for the input fields)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // 2. Hook State (handles the backend process)
  const { isSubmitting, isSubmitted, error, submitContactForm, clearError } =
    useContact();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Call the hook. If it returns true (success), clear the form inputs.
    const isSuccess = await submitContactForm(formData);
    if (isSuccess) {
      setFormData({ name: "", email: "", message: "" });
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-950 text-slate-200 font-sans relative overflow-x-hidden py-12 lg:py-20 flex items-center">
      {/* Background Ambient Glows */}
      <div className="absolute inset-0 -z-10 pointer-events-none fixed">
        <div className="absolute top-[-10%] left-[-5%] h-[300px] w-[300px] sm:h-[500px] sm:w-[500px] rounded-full bg-cyan-600/10 blur-[100px] sm:blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-5%] h-[300px] w-[300px] sm:h-[500px] sm:w-[500px] rounded-full bg-violet-600/10 blur-[100px] sm:blur-[120px] animate-pulse delay-1000" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        {/* Fixed Error Popup for failed sends */}
        {error && (
          <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] w-[calc(100%-2rem)] max-w-lg flex items-center gap-3 rounded-2xl border border-rose-500/30 bg-slate-900/95 px-5 py-4 text-sm font-medium text-rose-400 backdrop-blur-xl shadow-2xl shadow-rose-500/20 animate-in fade-in zoom-in-95 slide-in-from-top-10 duration-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="shrink-0"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <p className="flex-grow">{error}</p>
            <button
              onClick={clearError}
              className="shrink-0 p-1 hover:bg-rose-500/20 rounded"
            >
              ✕
            </button>
          </div>
        )}

        {/* Header */}
        <header className="text-center mb-12 sm:mb-16">
          <span className="inline-block rounded-full bg-slate-800/80 border border-white/5 px-3 py-1 text-xs font-medium text-slate-400 mb-4 tracking-wider uppercase">
            Get In Touch
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white">
            Let's build something <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 bg-clip-text text-transparent">
              incredible together.
            </span>
          </h1>
        </header>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start max-w-6xl mx-auto">
          {/* ── Left Column: Contact Info & Resume ── */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <a
              href="mailto:jatin397911@gmail.com"
              className="group rounded-3xl border border-white/10 bg-slate-900/40 backdrop-blur-xl p-8 transition-all hover:border-cyan-500/30 hover:bg-slate-800/50 hover:shadow-lg hover:shadow-cyan-500/10 active:scale-[0.98]"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 mb-6 transition-transform group-hover:scale-110">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Email Me</h3>
              <p className="text-slate-400 text-sm mb-4">
                I generally reply within 24 hours.
              </p>
              <p className="text-cyan-400 font-medium text-lg tracking-wide group-hover:text-cyan-300 transition-colors">
                jatin397911@gmail.com
              </p>
            </a>

            <div className="rounded-3xl border border-white/10 bg-slate-900/40 backdrop-blur-xl p-8">
              <div className="flex items-center gap-4 mb-8 pb-8 border-b border-white/10">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-violet-500/10 text-violet-400 border border-violet-500/20">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-white">Location</h3>
                  <p className="text-slate-400 text-sm">Delhi, India</p>
                </div>
              </div>

              <div>
                <Link
                  to="/resume"
                  className="group flex w-full items-center justify-center gap-3 rounded-2xl bg-slate-800/80 border border-slate-700 px-6 py-4 text-sm font-bold text-slate-200 shadow-lg transition-all hover:bg-slate-800 hover:border-slate-500 hover:text-white active:scale-[0.98]"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-slate-400 group-hover:text-white transition-colors"
                  >
                    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                    <polyline points="14 2 14 8 20 8" />
                    <path d="M12 18v-6" />
                    <path d="m9 15 3 3 3-3" />
                  </svg>
                  View Resume
                </Link>
              </div>
            </div>
          </div>

          {/* ── Right Column: Contact Form ── */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-white/10 bg-slate-900/40 backdrop-blur-xl p-6 sm:p-10 shadow-2xl">
              <h2 className="text-2xl font-bold text-white mb-2">
                Send a Message
              </h2>
              <p className="text-slate-400 text-sm mb-8">
                Got a project in mind? Let's chat.
              </p>

              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-semibold text-slate-300"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-slate-700 bg-slate-950/50 px-5 py-4 text-sm text-slate-200 placeholder:text-slate-600 outline-none transition-all focus:border-cyan-500 focus:bg-slate-900 focus:ring-2 focus:ring-cyan-500/20"
                    placeholder="e.g. Alex (or Batman 🦇)"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-semibold text-slate-300"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-slate-700 bg-slate-950/50 px-5 py-4 text-sm text-slate-200 placeholder:text-slate-600 outline-none transition-all focus:border-cyan-500 focus:bg-slate-900 focus:ring-2 focus:ring-cyan-500/20"
                    placeholder="e.g. alex@yournextbigidea.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 block text-sm font-semibold text-slate-300"
                  >
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full resize-none rounded-2xl border border-slate-700 bg-slate-950/50 px-5 py-4 text-sm leading-relaxed text-slate-200 placeholder:text-slate-600 outline-none transition-all focus:border-cyan-500 focus:bg-slate-900 focus:ring-2 focus:ring-cyan-500/20 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                    placeholder="How can I help you today?"
                  />
                </div>

                <div className="mt-2 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                  {isSubmitted ? (
                    <div className="flex items-center gap-2 text-emerald-400 font-medium bg-emerald-500/10 px-4 py-2 rounded-xl border border-emerald-500/20 w-full sm:w-auto justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      Thanks for reaching out! I'll connect with you shortly.
                    </div>
                  ) : (
                    <p className="text-xs text-slate-500 hidden sm:block">
                      Your data is secure and will not be shared.
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting || isSubmitted}
                    className="group flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 text-sm font-bold text-white shadow-lg shadow-cyan-500/25 transition-all hover:-translate-y-0.5 hover:shadow-cyan-500/40 active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                  >
                    {isSubmitting ? (
                      <>
                        <svg
                          className="h-5 w-5 animate-spin text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v4A4 4 0 008 12H4z"
                          ></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="transition-transform group-hover:translate-x-1"
                        >
                          <line x1="22" y1="2" x2="11" y2="13" />
                          <polygon points="22 2 15 22 11 13 2 9 22 2" />
                        </svg>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
