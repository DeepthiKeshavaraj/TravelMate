import React, { useState, useEffect } from "react";
import {
  Search,
  Sparkles,
  Plane,
  ShieldCheck,
  Compass,
  ArrowRight,
  TrendingUp,
  MapPin,
  CalendarCheck,
  Server,
  Zap,
} from "lucide-react";
import PackageCard from "../components/PackageCard";
import LoadingSpinner from "../components/LoadingSpinner";
import AlertBanner from "../components/AlertBanner";
import { getAllPackages } from "../api/packageApi";

export default function HomePage({
  onSelectPackage,
  onBookPackage,
  onNavigate,
  searchTerm,
  setSearchTerm,
}) {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchFeaturedPackages = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllPackages();
      setPackages(data);
    } catch (err) {
      setError(
        "Could not load packages from Package Service (Port 5001). Please verify the backend is running."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeaturedPackages();
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onNavigate("packages");
  };

  // Select top 3 packages as featured
  const featuredPackages = packages.slice(0, 3);

  return (
    <div className="space-y-20 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary-950 via-slate-900 to-slate-950 text-white pt-24 pb-32">
        {/* Ambient background glows */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-500/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-sky-400/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold text-sky-300">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Microservices-Powered Travel Platform</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-[1.1] text-white">
              Discover & Book Your Next{" "}
              <span className="bg-gradient-to-r from-sky-400 via-primary-300 to-emerald-300 bg-clip-text text-transparent">
                Great Adventure
              </span>
            </h1>

            <p className="text-lg text-slate-300 leading-relaxed font-normal max-w-2xl mx-auto">
              Explore handpicked destinations, transparent pricing, and instant
              reservations powered by independent, high-performance microservices.
            </p>

            {/* Destination Search Box */}
            <form
              onSubmit={handleSearchSubmit}
              className="mt-8 p-2.5 bg-white rounded-2xl shadow-2xl flex flex-col sm:flex-row items-center gap-2 max-w-2xl mx-auto text-slate-800"
            >
              <div className="flex items-center gap-3 flex-1 w-full px-3">
                <MapPin className="w-5 h-5 text-primary-600 flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Where do you want to travel? (e.g., Paris, Bali, Tokyo)"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-transparent text-sm sm:text-base font-medium placeholder-slate-400 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-bold text-sm shadow-md shadow-primary-500/30 transition-all active:scale-95"
              >
                <Search className="w-4 h-4" />
                <span>Search</span>
              </button>
            </form>

            {/* Quick destination suggestion tags */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-xs text-slate-400">
              <span className="font-semibold text-slate-300">Popular:</span>
              {["Paris", "Bali", "Tokyo", "Switzerland", "Goa"].map((dest) => (
                <button
                  key={dest}
                  type="button"
                  onClick={() => {
                    setSearchTerm(dest);
                    onNavigate("packages");
                  }}
                  className="px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors"
                >
                  {dest}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Value Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-7 rounded-2xl shadow-lg border border-slate-200/80 hover:border-primary-200 transition-all space-y-3">
            <div className="w-12 h-12 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center">
              <Plane className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              Curated Itineraries
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Every package is designed with carefully planned durations, top
              attractions, and verified available slots.
            </p>
          </div>

          <div className="bg-white p-7 rounded-2xl shadow-lg border border-slate-200/80 hover:border-primary-200 transition-all space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CalendarCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              Instant Confirmations
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Bookings are processed through the dedicated Booking Microservice
              with automated capacity checking and real-time receipts.
            </p>
          </div>

          <div className="bg-white p-7 rounded-2xl shadow-lg border border-slate-200/80 hover:border-primary-200 transition-all space-y-3">
            <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
              <Server className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              Microservices Architecture
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Built on independent services running on dedicated ports with REST
              endpoints, robust CORS, and error handlers.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Packages Live Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-primary-600 tracking-wider uppercase mb-1">
              <TrendingUp className="w-4 h-4" />
              <span>Trending Destinations</span>
            </div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
              Featured Travel Packages
            </h2>
            <p className="text-slate-600 text-sm mt-1">
              Top-rated trips currently available in the Package Service
            </p>
          </div>

          <button
            onClick={() => {
              if (setSearchTerm) setSearchTerm("");
              onNavigate("packages");
            }}
            className="inline-flex items-center gap-2 text-sm font-bold text-primary-600 hover:text-primary-700 hover:gap-3 transition-all"
          >
            <span>View All Packages</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Dynamic State Handling */}
        {loading && (
          <div className="bg-white rounded-2xl border border-slate-200 p-12">
            <LoadingSpinner
              message="Fetching available travel packages from Package Service..."
              size="lg"
            />
          </div>
        )}

        {error && (
          <AlertBanner
            type="error"
            title="Backend Service Notice"
            message={error}
            actionButton={
              <button
                onClick={fetchFeaturedPackages}
                className="mt-2 text-xs font-bold text-primary-700 underline hover:no-underline"
              >
                Retry connection
              </button>
            }
          />
        )}

        {!loading && !error && featuredPackages.length === 0 && (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-4">
            <div className="w-14 h-14 bg-sky-50 text-primary-600 rounded-full flex items-center justify-center mx-auto">
              <Compass className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-800">
              No Travel Packages Found
            </h3>
            <p className="text-sm text-slate-500 max-w-md mx-auto">
              No packages have been added to the Package Service database yet.
              Add packages using POST /api/packages or create them in your
              database.
            </p>
          </div>
        )}

        {!loading && !error && featuredPackages.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPackages.map((pkg, idx) => (
              <PackageCard
                key={pkg._id}
                pkg={pkg}
                featured={idx === 0}
                onSelect={onSelectPackage}
                onBook={onBookPackage}
              />
            ))}
          </div>
        )}
      </section>

      {/* Call to Action Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary-700 via-primary-600 to-sky-600 text-white p-8 sm:p-14 shadow-xl">
          <div className="max-w-2xl space-y-4 relative z-10">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-200">
              Ready to take flight?
            </span>
            <h3 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
              Start Your Journey with TravelMate Today
            </h3>
            <p className="text-sky-100 text-sm sm:text-base leading-relaxed">
              Explore all packages, customize guest counts, and check your booking
              history at any time.
            </p>
            <div className="pt-4 flex flex-wrap gap-3">
              <button
                onClick={() => {
                  if (setSearchTerm) setSearchTerm("");
                  onNavigate("packages");
                }}
                className="px-6 py-3 rounded-xl bg-white text-primary-700 font-bold text-sm shadow-md hover:bg-sky-50 transition-colors"
              >
                Browse All Packages
              </button>
              <button
                onClick={() => onNavigate("bookings")}
                className="px-6 py-3 rounded-xl bg-primary-800/60 hover:bg-primary-800/80 text-white font-semibold text-sm border border-white/20 backdrop-blur-xs transition-colors"
              >
                View My Bookings
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
