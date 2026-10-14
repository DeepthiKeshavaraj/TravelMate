import React, { useState, useEffect } from "react";
import { Compass, Menu, X, Plane, Calendar, ShieldCheck, Radio } from "lucide-react";
import { checkPackageServiceHealth } from "../api/packageApi";
import { checkBookingServiceHealth } from "../api/bookingApi";

export default function Navbar({ activePage, setActivePage, onOpenMyBookings }) {
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
    const interval = setInterval(checkHealth, 30000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  const navItems = [
    { id: "home", label: "Home" },
    { id: "packages", label: "Explore Packages" },
    { id: "bookings", label: "My Bookings" },
  ];

  const handleNavClick = (id) => {
    setActivePage(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <button
            onClick={() => handleNavClick("home")}
            className="flex items-center gap-3 group text-left focus:outline-none"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-primary-600 to-sky-400 flex items-center justify-center text-white shadow-md shadow-primary-500/25 group-hover:scale-105 transition-transform duration-200">
              <Compass className="w-6 h-6 animate-[spin_12s_linear_infinite]" />
            </div>
            <div>
              <span className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-slate-900 via-primary-900 to-primary-700 bg-clip-text text-transparent">
                TravelMate
              </span>
              <span className="block text-[11px] font-semibold uppercase tracking-wider text-primary-600 -mt-1">
                Microservices Travel
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? "text-primary-700 bg-primary-50 font-bold shadow-xs"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/70"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Service Status & Quick Action (Desktop) */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Live Microservice Heartbeat Pill */}
            <div
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-medium text-slate-600"
              title={`Package Service (5001): ${
                servicesOnline.packages ? "Online" : "Connecting..."
              } | Booking Service (5002): ${
                servicesOnline.bookings ? "Online" : "Connecting..."
              }`}
            >
              <span className="flex h-2 w-2 relative">
                <span
                  className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                    servicesOnline.packages && servicesOnline.bookings
                      ? "bg-emerald-400"
                      : "bg-amber-400"
                  }`}
                ></span>
                <span
                  className={`relative inline-flex rounded-full h-2 w-2 ${
                    servicesOnline.packages && servicesOnline.bookings
                      ? "bg-emerald-500"
                      : "bg-amber-500"
                  }`}
                ></span>
              </span>
              <span>
                {servicesOnline.packages && servicesOnline.bookings
                  ? "Microservices Live"
                  : servicesOnline.checked
                  ? "Backend Services Connecting"
                  : "Checking Services..."}
              </span>
            </div>

            <button
              onClick={() => handleNavClick("packages")}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-semibold text-sm shadow-md shadow-primary-500/20 hover:shadow-lg hover:shadow-primary-500/30 active:scale-98 transition-all"
            >
              <Plane className="w-4 h-4" />
              Book Trip
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="p-2.5 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
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
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2 shadow-xl animate-in slide-in-from-top duration-200">
          {navItems.map((item) => {
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-4 py-3 rounded-xl text-base font-semibold transition-colors ${
                  isActive
                    ? "bg-primary-50 text-primary-700 font-bold"
                    : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                {item.label}
              </button>
            );
          })}
          <div className="pt-2">
            <button
              onClick={() => handleNavClick("packages")}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-primary-600 text-white font-semibold shadow-md shadow-primary-500/20"
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
