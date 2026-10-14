import React from "react";
import { Compass, Server, ShieldCheck, Heart, ArrowUpRight, Cpu } from "lucide-react";

export default function PremiumFooter({ setActivePage, onBrowseAllPackages }) {
  const handleNav = (page) => {
    if (page === "packages" && onBrowseAllPackages) {
      onBrowseAllPackages();
    } else {
      setActivePage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-[#0B1730] text-slate-300 pt-16 pb-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#1261A0] to-[#21B8D5] flex items-center justify-center text-white">
                <Compass className="w-5 h-5" />
              </div>
              <span className="text-2xl font-black tracking-tight text-white">
                TravelMate
              </span>
            </div>
            <p className="text-slate-300 text-xs sm:text-sm max-w-md leading-relaxed">
              A premium, microservices-driven travel platform designed for modularity,
              capacity synchronization, and independent service deployments.
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium bg-white/10 text-[#21B8D5] border border-white/10 font-mono">
                <Server className="w-3 h-3" /> Package Service :5001
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium bg-white/10 text-emerald-400 border border-white/10 font-mono">
                <Server className="w-3 h-3" /> Booking Service :5002
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium bg-white/10 text-slate-300 border border-white/10 font-mono">
                <Cpu className="w-3 h-3" /> React + Vite :5173
              </span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <button
                  type="button"
                  onClick={() => handleNav("home")}
                  className="hover:text-white transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav("destinations")}
                  className="hover:text-white transition-colors"
                >
                  Destinations Guide
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav("packages")}
                  className="hover:text-white transition-colors"
                >
                  Explore Packages
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav("bookings")}
                  className="hover:text-white transition-colors"
                >
                  My Bookings
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav("architecture")}
                  className="hover:text-[#21B8D5] transition-colors font-semibold"
                >
                  Microservices Architecture
                </button>
              </li>
            </ul>
          </div>

          {/* Microservices Spec */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4">
              Architecture Spec
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#21B8D5]"></span>
                <span>Node.js / Express 5 Microservices</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#21B8D5]"></span>
                <span>MongoDB Mongoose ODM Schemas</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#21B8D5]"></span>
                <span>Inter-Service Capacity Synchronization</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#21B8D5]"></span>
                <span>REST API Contracts with CORS</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} TravelMate — Full-Stack Microservices Travel System.</p>
          <p className="flex items-center gap-1">
            Built for college project demonstration.
          </p>
        </div>
      </div>
    </footer>
  );
}
