import React from "react";
import { Compass, Server, Heart, ArrowUpRight, ShieldCheck, MapPin } from "lucide-react";

export default function Footer({ setActivePage }) {
  return (
    <footer className="bg-slate-900 text-slate-400 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary-600 flex items-center justify-center text-white">
                <Compass className="w-5 h-5" />
              </div>
              <span className="text-2xl font-black tracking-tight text-white">
                TravelMate
              </span>
            </div>
            <p className="text-slate-400 text-sm max-w-md leading-relaxed">
              A modern, microservices-driven travel booking platform built with
              React, Express, and MongoDB. Designed for modular scalability,
              independent service deployments, and effortless travel exploration.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-slate-800 text-sky-400 border border-slate-700">
                <Server className="w-3.5 h-3.5" /> Package Service :5001
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-slate-800 text-emerald-400 border border-slate-700">
                <Server className="w-3.5 h-3.5" /> Booking Service :5002
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-slate-800 text-purple-400 border border-slate-700">
                <ShieldCheck className="w-3.5 h-3.5" /> REST / JSON APIs
              </span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => {
                    setActivePage("home");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="hover:text-white transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActivePage("packages");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="hover:text-white transition-colors"
                >
                  Explore Packages
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActivePage("bookings");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="hover:text-white transition-colors"
                >
                  My Bookings
                </button>
              </li>
            </ul>
          </div>

          {/* Architecture Details */}
          <div>
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase mb-4">
              Microservices Stack
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-400"></span>
                <span>React 18 + Vite + Tailwind CSS</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-400"></span>
                <span>Node.js & Express.js Backends</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-400"></span>
                <span>MongoDB & Mongoose ODM</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-400"></span>
                <span>CORS & REST Interservice Bridge</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} TravelMate — Microservices Travel Management System.</p>
          <p className="flex items-center gap-1">
            Built with modern web standards and care.
          </p>
        </div>
      </div>
    </footer>
  );
}
