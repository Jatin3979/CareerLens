// components/Navbar.jsx
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

// 👇 1. Import your logout API function here (adjust the path to match your folder structure)
import { useAuth } from "../../auth/hooks/useAuth"; 

// If you are using an AuthContext to track the user state globally, 
// you might also want to import your useAuth hook here to clear the state!
// import { useAuth } from "../features/auth/auth.context";

const Navbar = () => {
    const { logout } = useAuth(); // Assuming you have a logout function in your auth API
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate(); // 👇 2. We use this to redirect to /login

  // const { setUser } = useAuth(); // (Uncomment if you use context to track the user)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Contact Me", path: "/contact" },
  ];

  // 👇 3. The actual working logout function
  const handleLogout = async () => {
    try {
      // Call your backend to clear the cookie/session
      await logout();
      
      // If you use React Context to store the user, clear it here:
      // setUser(null); 

      // Redirect the user to the login page and replace the history 
      // so they can't click the "Back" button to go back to the protected page
      navigate("/login", { replace: true });
      
    } catch (error) {
      console.error("Failed to log out:", error);
      // Even if the backend fails, you might still want to force them to the login screen:
      // navigate("/login", { replace: true });
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-slate-950/70 backdrop-blur-xl border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.1)]"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div 
          className={`absolute bottom-0 left-0 h-[1px] w-full bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent transition-opacity duration-500 ${
            isScrolled ? "opacity-100" : "opacity-0"
          }`} 
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center gap-3">
              <Link to="/" className="flex items-center gap-3 group">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/25 transition-transform group-hover:scale-105">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                    <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
                  </svg>
                </div>
                <span className="text-xl font-extrabold text-white tracking-tight">
                  Career<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Lens</span>
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`text-sm font-semibold transition-all duration-300 ${
                      isActive
                        ? "text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>

            {/* Logout Button (Desktop) */}
            <div className="hidden md:flex items-center gap-4">
              <button 
                onClick={handleLogout}
                className="group flex items-center gap-2 rounded-full border border-rose-500/20 bg-rose-500/10 px-4 py-2 transition-all hover:bg-rose-500/20 hover:border-rose-500/40 cursor-pointer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-rose-400 transition-transform group-hover:-translate-x-0.5">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                  <polyline points="16 17 21 12 16 7"></polyline>
                  <line x1="21" y1="12" x2="9" y2="12"></line>
                </svg>
                <span className="text-sm font-medium text-rose-400">Logout</span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-slate-400 hover:text-white focus:outline-none p-2 rounded-lg bg-slate-900/50 border border-white/5 cursor-pointer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  {isMobileMenuOpen ? (
                    <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>
                  ) : (
                    <><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></>
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Dropdown */}
      <div 
        className={`fixed inset-0 z-40 bg-slate-950/95 backdrop-blur-2xl transition-all duration-300 md:hidden flex flex-col pt-24 px-6 ${
          isMobileMenuOpen ? "opacity-100 visible pointer-events-auto" : "opacity-0 invisible pointer-events-none"
        }`}
      >
        <div className="flex flex-col gap-6">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`text-2xl font-bold tracking-tight transition-colors ${
                  isActive ? "text-cyan-400" : "text-slate-400 hover:text-white"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>
        
        {/* Logout Button (Mobile) */}
        <div className="mt-auto mb-10 pb-10 border-t border-white/10 pt-6">
          <button 
            onClick={handleLogout}
            className="flex w-full items-center justify-center gap-3 rounded-2xl bg-rose-500/10 p-4 border border-rose-500/20 active:scale-[0.98] transition-transform cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-rose-400">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
            <span className="text-sm font-bold text-rose-400">Log Out</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;