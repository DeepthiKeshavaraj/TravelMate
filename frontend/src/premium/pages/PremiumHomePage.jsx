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
  Calendar,
  Users,
  DollarSign,
  CalendarCheck,
  Server,
  Zap,
  Activity,
  CheckCircle2,
} from "lucide-react";
import PremiumPackageCard from "../components/PremiumPackageCard";
import PackageCardSkeleton from "../components/PackageCardSkeleton";
import DestinationCard from "../components/DestinationCard";
import { getAllPackages } from "../../api/packageApi";

export default function PremiumHomePage({
  onSelectPackage,
  onBookPackage,
  onNavigate,
  onBrowseAll,
  onExploreDestination,
  searchTerm,
  setSearchTerm,
  budgetFilter,
  setBudgetFilter,
}) {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Search parameters for hero search box
  const [heroDestination, setHeroDestination] = useState(searchTerm || "");
  const [heroDate, setHeroDate] = useState("");
  const [heroGuests, setHeroGuests] = useState("1");
  const [heroBudget, setHeroBudget] = useState(budgetFilter || "any");

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];

  const fetchFeaturedPackages = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllPackages();
      setPackages(data);
    } catch (err) {
      setError(
        "Package Service at http://localhost:5001 is offline or unreachable."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeaturedPackages();
  }, []);

  const handleHeroSearch = (e) => {
    e.preventDefault();
    if (heroDestination.trim()) {
      if (onExploreDestination) {
        onExploreDestination(heroDestination.trim(), { budget: heroBudget });
      } else {
        setSearchTerm(heroDestination.trim());
        if (setBudgetFilter && heroBudget !== "any") setBudgetFilter(heroBudget);
        onNavigate("packages");
      }
    } else {
      if (onBrowseAll) {
        onBrowseAll();
      } else {
        onNavigate("packages");
      }
    }
  };

  const popularDestinations = [
    {
      name: "Paris",
      country: "France",
      tagline: "The City of Light, art & cuisine",
      image:
        "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Bali",
      country: "Indonesia",
      tagline: "Tropical beaches, temples & serenity",
      image:
        "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Tokyo",
      country: "Japan",
      tagline: "Neon-lit skylines & historic shrines",
      image:
        "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Switzerland",
      country: "Swiss Alps",
      tagline: "Majestic alpine peaks & crystal lakes",
      image:
        "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Dubai",
      country: "UAE",
      tagline: "Modern luxury & desert adventures",
      image:
        "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Ooty",
      country: "Tamil Nadu, India",
      tagline: "Queen of Hill Stations, Nilgiri Mountain Railway & tea estates",
      image:
        "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Santorini",
      country: "Greece",
      tagline: "Whitewashed cliffs & Aegean sunsets",
      image:
        "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=80",
    },
  ];

  // Up to 4 featured packages
  const featuredPackages = packages.slice(0, 4);

  return (
    <div className="space-y-20 pb-20 bg-[#F5F8FC]">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0B1730] via-[#0E2246] to-[#1261A0] text-white pt-24 pb-32">
        {/* Subtle background glow highlights */}
        <div className="absolute top-10 right-1/4 w-[500px] h-[500px] bg-[#21B8D5]/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-10 left-1/4 w-[400px] h-[400px] bg-[#1261A0]/30 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            {/* Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold text-[#21B8D5]">
              <Sparkles className="w-3.5 h-3.5 text-[#21B8D5]" />
              <span>Full-Stack Microservices Architecture</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.08] text-white">
              Discover & Reserve Your Next{" "}
              <span className="bg-gradient-to-r from-[#21B8D5] via-sky-300 to-white bg-clip-text text-transparent">
                Memorable Journey
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-2xl mx-auto font-normal">
              Experience seamless travel discovery with decoupled microservices,
              real-time capacity synchronization, and verified MongoDB bookings.
            </p>

            {/* Multi-parameter Search Control Card */}
            <div className="mt-10 bg-white p-4 sm:p-5 rounded-3xl shadow-2xl border border-white/20 text-[#14243D] text-left">
              <form
                onSubmit={handleHeroSearch}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
              >
                {/* Destination */}
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Destination
                  </label>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#1261A0] flex-shrink-0" />
                    <input
                      type="text"
                      placeholder="e.g. Paris, Bali, Tokyo"
                      value={heroDestination}
                      onChange={(e) => setHeroDestination(e.target.value)}
                      className="w-full bg-transparent text-sm font-semibold text-[#14243D] placeholder-slate-400 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Travel Date */}
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Travel Date
                  </label>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#1261A0] flex-shrink-0" />
                    <input
                      type="date"
                      min={minDate}
                      value={heroDate}
                      onChange={(e) => setHeroDate(e.target.value)}
                      className="w-full bg-transparent text-sm font-semibold text-[#14243D] focus:outline-none"
                    />
                  </div>
                </div>

                {/* Guests */}
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Party Size
                  </label>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-[#1261A0] flex-shrink-0" />
                    <select
                      value={heroGuests}
                      onChange={(e) => setHeroGuests(e.target.value)}
                      className="w-full bg-transparent text-sm font-semibold text-[#14243D] focus:outline-none appearance-none"
                    >
                      <option value="1">1 Person</option>
                      <option value="2">2 People</option>
                      <option value="4">4 People</option>
                      <option value="6">6+ People</option>
                    </select>
                  </div>
                </div>

                {/* Budget Range / Submit button */}
                <div className="flex flex-col justify-between gap-2">
                  <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-2xl">
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">
                      Budget
                    </label>
                    <div className="flex items-center gap-1.5">
                      <DollarSign className="w-3.5 h-3.5 text-[#1261A0] flex-shrink-0" />
                      <select
                        value={heroBudget}
                        onChange={(e) => setHeroBudget(e.target.value)}
                        className="w-full bg-transparent text-xs font-semibold text-[#14243D] focus:outline-none"
                      >
                        <option value="any">Any Budget</option>
                        <option value="under1000">Under $1,000</option>
                        <option value="1000-2500">$1,000 - $2,500</option>
                        <option value="above2500">$2,500+</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-2xl bg-[#1261A0] hover:bg-[#0E4D80] text-white font-bold text-sm shadow-md shadow-[#1261A0]/30 transition-all active:scale-95"
                  >
                    <Search className="w-4 h-4" />
                    <span>Search Packages</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Quick CTAs */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <button
                type="button"
                onClick={() => (onBrowseAll ? onBrowseAll() : onNavigate("packages"))}
                className="px-6 py-3 rounded-xl bg-[#21B8D5] hover:bg-[#1CA0BA] text-[#0B1730] font-bold text-sm shadow-lg shadow-[#21B8D5]/20 active:scale-95 transition-all"
              >
                Browse All Packages
              </button>
              <button
                type="button"
                onClick={() => onNavigate("architecture")}
                className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/20 active:scale-95 transition-all flex items-center gap-2"
              >
                <Activity className="w-4 h-4 text-[#21B8D5]" />
                <span>Microservices Telemetry</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Popular Destinations Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#1261A0] block mb-1">
              Featured Locales
            </span>
            <h2 className="text-3xl font-black text-[#14243D] tracking-tight">
              Popular Destinations
            </h2>
            <p className="text-slate-600 text-sm mt-1">
              Explore world-renowned destinations supported in the TravelMate ecosystem
            </p>
          </div>

          <button
            type="button"
            onClick={() => onNavigate("destinations")}
            className="inline-flex items-center gap-2 text-sm font-bold text-[#1261A0] hover:text-[#0E4D80] hover:gap-3 transition-all"
          >
            <span>Explore All 36+ Guides & States</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularDestinations.map((dest) => (
            <DestinationCard
              key={dest.name}
              name={dest.name}
              country={dest.country}
              tagline={dest.tagline}
              image={dest.image}
              onClick={() => {
                if (onExploreDestination) {
                  onExploreDestination(dest.name);
                } else {
                  setSearchTerm(dest.name);
                  onNavigate("packages");
                }
              }}
            />
          ))}
        </div>
      </section>

      {/* 3. Trending Packages Section (Actual Backend API) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1261A0] tracking-wider uppercase mb-1">
              <TrendingUp className="w-4 h-4 text-[#21B8D5]" />
              <span>Package Service :5001</span>
            </div>
            <h2 className="text-3xl font-black text-[#14243D] tracking-tight">
              Trending Itineraries
            </h2>
            <p className="text-slate-600 text-sm mt-1">
              Directly queried from MongoDB via the TravelPackage schema
            </p>
          </div>

          <button
            type="button"
            onClick={() => (onBrowseAll ? onBrowseAll() : onNavigate("packages"))}
            className="inline-flex items-center gap-2 text-sm font-bold text-[#1261A0] hover:text-[#0E4D80] hover:gap-3 transition-all"
          >
            <span>View All Packages</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <PackageCardSkeleton count={4} />
          </div>
        )}

        {error && (
          <div className="bg-white rounded-2xl border border-rose-200 p-8 text-center space-y-3">
            <p className="text-sm text-rose-700 font-semibold">{error}</p>
            <button
              type="button"
              onClick={fetchFeaturedPackages}
              className="text-xs font-bold text-[#1261A0] underline"
            >
              Retry Connection
            </button>
          </div>
        )}

        {!loading && !error && featuredPackages.length === 0 && (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3">
            <p className="text-base font-bold text-[#14243D]">
              No packages found in Package Service
            </p>
            <p className="text-xs text-slate-500">
              Add travel packages to MongoDB using the Package Service REST API.
            </p>
          </div>
        )}

        {!loading && !error && featuredPackages.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredPackages.map((pkg, idx) => (
              <PremiumPackageCard
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

      {/* 4. Why Choose TravelMate (Feature Pillars) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#1261A0] block mb-1">
            Engineered For Reliability
          </span>
          <h2 className="text-3xl font-black text-[#14243D] tracking-tight">
            Why TravelMate Platform?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-8 rounded-3xl border border-slate-200/90 shadow-xs space-y-4 hover:border-[#1261A0]/30 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-sky-50 text-[#1261A0] flex items-center justify-center font-bold">
              <Server className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#14243D]">
              Decoupled Microservices
            </h3>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              Package management and Booking management operate as independent
              Express.js services on dedicated ports (5001 & 5002) with REST communication.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200/90 shadow-xs space-y-4 hover:border-[#1261A0]/30 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#14243D]">
              Real-Time Slot Verification
            </h3>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              Every booking invokes inter-service queries to verify trip price
              and validate that sufficient spots remain before committing to MongoDB.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200/90 shadow-xs space-y-4 hover:border-[#1261A0]/30 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-[#21B8D5]/15 text-[#1261A0] flex items-center justify-center font-bold">
              <CalendarCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#14243D]">
              Instant Confirmation & Control
            </h3>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              Customers receive immediate confirmation receipts with unique MongoDB
              references and the ability to manage or cancel confirmed bookings.
            </p>
          </div>
        </div>
      </section>

      {/* 5. How It Works (4-Step Booking Process) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/90 shadow-sm space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#1261A0]">
              Simple Reservation Process
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#14243D]">
              How Booking Works
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-[#F5F8FC] border border-slate-200 space-y-3">
              <div className="w-8 h-8 rounded-xl bg-[#1261A0] text-white flex items-center justify-center font-black text-xs">
                01
              </div>
              <h4 className="font-bold text-sm text-[#14243D]">Explore Catalog</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Browse verified packages filtered by destination, price, and open capacity.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#F5F8FC] border border-slate-200 space-y-3">
              <div className="w-8 h-8 rounded-xl bg-[#1261A0] text-white flex items-center justify-center font-black text-xs">
                02
              </div>
              <h4 className="font-bold text-sm text-[#14243D]">Select Dates & Guests</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Specify your party size (1–20) and a future travel date with client-side validation.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#F5F8FC] border border-slate-200 space-y-3">
              <div className="w-8 h-8 rounded-xl bg-[#1261A0] text-white flex items-center justify-center font-black text-xs">
                03
              </div>
              <h4 className="font-bold text-sm text-[#14243D]">Review Before Submit</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Confirm your itemized calculation and party details before initiating the API call.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#F5F8FC] border border-slate-200 space-y-3">
              <div className="w-8 h-8 rounded-xl bg-[#1261A0] text-white flex items-center justify-center font-black text-xs">
                04
              </div>
              <h4 className="font-bold text-sm text-[#14243D]">Instant Confirmation</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Booking Service commits your reservation to MongoDB and provides your reference ID.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Live Architecture Showcase Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#0B1730] via-[#0E2246] to-[#1261A0] text-white p-8 sm:p-12 shadow-xl border border-white/10">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 relative z-10">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-bold text-[#21B8D5] border border-white/10">
                <Activity className="w-3.5 h-3.5" /> Live Microservice Telemetry
              </div>
              <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
                Inspect Microservices Status & Architecture
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Review the decoupled communication between Package Service (Port 5001),
                Booking Service (Port 5002), and MongoDB Atlas in real time.
              </p>
            </div>

            <button
              type="button"
              onClick={() => onNavigate("architecture")}
              className="px-6 py-3.5 rounded-2xl bg-[#21B8D5] hover:bg-[#1CA0BA] text-[#0B1730] font-black text-xs sm:text-sm shadow-lg shadow-[#21B8D5]/20 active:scale-95 transition-all flex items-center gap-2 flex-shrink-0"
            >
              <span>View System Architecture</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
