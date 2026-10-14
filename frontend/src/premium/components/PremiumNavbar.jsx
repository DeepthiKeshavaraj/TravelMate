import React, { useState, useEffect } from "react";
import { Compass, Menu, X, Plane, Activity } from "lucide-react";
import { checkPackageServiceHealth } from "../../api/packageApi";
import { checkBookingServiceHealth } from "../../api/bookingApi";

export default function PremiumNavbar({ activePage, setActivePage, onBrowseAllPackages }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOnline, setServicesOnline] = useState({
    packages: false,
    bookings: false,
    checked: false,
  });

  useEffect(() => {
    let isMounted = true;
    async function checkHealth() {
      const [pkgRes, bkRes] = await Promise.all([
        checkPackageServiceHealth(),
        checkBookingServiceHealth(),
      ]);
      if (isMounted) {
        setServicesOnline({
          packages: pkgRes?.status === "ok",
          bookings: bkRes?.success === true,
          checked: true,
        });
      }
    }
    checkHealth();
    const interval = setInterval(checkHealth, 25000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  const navItems = [
    { id: "home", label: "Home" },
    { id: "destinations", label: "Destinations Guide" },
    { id: "packages", label: "Explore Packages" },
    { id: "bookings", label: "My Bookings" },
    { id: "architecture", label: "Architecture & Status" },
  ];

  const handleNavClick = (id) => {
    setMobileMenuOpen(false);
    if (id === "packages" && onBrowseAllPackages) {
      onBrowseAllPackages();
    } else {
      setActivePage(id);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const bothOnline = servicesOnline.packages && servicesOnline.bookings;

  return (
    <header className="sticky top-0 z-40 bg-[#0B1730]/95 backdrop-blur-md border-b border-white/10 transition-all text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <button
            type="button"
            onClick={() => handleNavClick("home")}
            className="flex items-center gap-3 group text-left focus:outline-none"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#1261A0] to-[#21B8D5] flex items-center justify-center text-white shadow-md shadow-[#1261A0]/30 group-hover:scale-105 transition-transform duration-200">
              <Compass className="w-6 h-6 animate-[spin_15s_linear_infinite]" />
            </div>
            <div>
              <span className="text-2xl font-black tracking-tight text-white flex items-center gap-1.5">
                TravelMate
                <span className="w-2 h-2 rounded-full bg-[#21B8D5]"></span>
              </span>
              <span className="block text-[10px] font-bold uppercase tracking-wider text-[#21B8D5] -mt-1">
                Microservices Travel
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1.5">
            {navItems.map((item) => {
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavClick(item.id)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 relative ${
                    isActive
                      ? "text-white bg-white/10 font-bold shadow-xs"
                      : "text-slate-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#21B8D5] rounded-full"></span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Live Microservices Pill & CTA Button */}
          <div className="hidden lg:flex items-center gap-4">
            <button
              type="button"
              onClick={() => handleNavClick("architecture")}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/15 text-xs font-medium text-slate-200 transition-colors cursor-pointer"
              title="Click to view live microservices architecture and telemetry"
            >
              <span className="flex h-2 w-2 relative">
                <span
                  className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                    bothOnline ? "bg-emerald-400" : "bg-amber-400"
                  }`}
                ></span>
                <span
                  className={`relative inline-flex rounded-full h-2 w-2 ${
                    bothOnline ? "bg-emerald-500" : "bg-amber-500"
                  }`}
                ></span>
              </span>
              <span className="text-[11px] font-semibold">
                {bothOnline
                  ? "Microservices Online"
                  : servicesOnline.checked
                  ? "Connecting Services..."
                  : "Checking Backend..."}
              </span>
            </button>

            <button
              type="button"
              onClick={() => (onBrowseAllPackages ? onBrowseAllPackages() : handleNavClick("packages"))}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1261A0] hover:bg-[#0E4D80] text-white font-bold text-xs shadow-md shadow-[#1261A0]/30 hover:shadow-lg active:scale-98 transition-all"
            >
              <Plane className="w-4 h-4" />
              Book Trip
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-white/10 bg-[#0B1730] px-4 pt-3 pb-6 space-y-2 shadow-2xl animate-in slide-in-from-top duration-200 text-white">
          {navItems.map((item) => {
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition-colors flex items-center justify-between ${
                  isActive
                    ? "bg-[#1261A0] text-white font-bold"
                    : "text-slate-300 hover:bg-white/10"
                }`}
              >
                <span>{item.label}</span>
                {isActive && (
                  <span className="w-2 h-2 rounded-full bg-[#21B8D5]"></span>
                )}
              </button>
            );
          })}
          <div className="pt-2">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                if (onBrowseAllPackages) onBrowseAllPackages();
                else handleNavClick("packages");
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#21B8D5] text-[#0B1730] font-bold text-sm shadow-md"
            >
              <Plane className="w-4 h-4" />
              Explore All Packages
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
