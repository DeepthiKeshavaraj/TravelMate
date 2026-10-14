import React, { useState, useMemo } from "react";
import {
  Compass,
  MapPin,
  Search,
  Filter,
  CheckCircle2,
  Calendar,
  ExternalLink,
  ChevronRight,
  Info,
  Sparkles,
  ArrowRight,
  Tag,
  Building,
  Plane,
  X,
  Star,
  Globe2,
} from "lucide-react";
import {
  DESTINATIONS_CATALOG,
  DESTINATION_CATEGORIES,
} from "../../data/destinationsCatalog";

export default function DestinationsDirectoryPage({
  onSelectDestination,
  onBrowseAllPackages,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("all"); // "all", "india", "international", "tamil-nadu"
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [onlyBookable, setOnlyBookable] = useState(false);
  const [modalDestination, setModalDestination] = useState(null);

  // Filtered destinations
  const filteredDestinations = useMemo(() => {
    return DESTINATIONS_CATALOG.filter((item) => {
      // Region filter
      if (selectedRegion === "india" && item.region !== "India") return false;
      if (selectedRegion === "international" && item.region !== "International")
        return false;
      if (selectedRegion === "tamil-nadu" && item.state !== "Tamil Nadu")
        return false;

      // Category filter
      if (
        selectedCategory !== "all" &&
        item.category.toLowerCase() !== selectedCategory.toLowerCase()
      ) {
        return false;
      }

      // Only bookable filter
      if (onlyBookable && !item.hasBookablePackage) {
        return false;
      }

      // Search term filter
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase().trim();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesState = (item.state || "").toLowerCase().includes(query);
        const matchesCountry = (item.country || "").toLowerCase().includes(query);
        const matchesCategory = (item.category || "").toLowerCase().includes(query);
        const matchesAttractions = (item.topAttractions || []).some((a) =>
          a.toLowerCase().includes(query)
        );

        if (
          !matchesName &&
          !matchesState &&
          !matchesCountry &&
          !matchesCategory &&
          !matchesAttractions
        ) {
          return false;
        }
      }

      return true;
    });
  }, [searchTerm, selectedRegion, selectedCategory, onlyBookable]);

  const bookableCount = DESTINATIONS_CATALOG.filter(
    (d) => d.hasBookablePackage
  ).length;

  return (
    <div className="min-h-screen bg-[#F5F8FC] py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-[#0B1730] via-[#0E2246] to-[#1261A0] rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-xl">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial from-[#21B8D5]/20 to-transparent pointer-events-none"></div>

          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-xs text-[#21B8D5] text-xs font-bold border border-white/10">
              <Compass className="w-3.5 h-3.5 animate-[spin_10s_linear_infinite]" />
              <span>Comprehensive Travel Guide & Microservices Catalog</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
              Explore Destinations Across India & The World
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Browse authentic travel guides covering all 28 Indian States & 8 Union Territories
              with deep Tamil Nadu coverage, plus world-famous international destinations.
              Destinations with live microservice packages are marked for instant reservation.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-medium text-slate-200">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/10">
                <Globe2 className="w-3.5 h-3.5 text-[#21B8D5]" />
                {DESTINATIONS_CATALOG.length} Curated Destinations
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                {bookableCount} Bookable Microservice Packages
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/10">
                <Building className="w-3.5 h-3.5 text-[#21B8D5]" />
                All 28 Indian States & 8 UTs Represented
              </span>
            </div>
          </div>
        </div>

        {/* Search & Filter Controls */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-6">
          <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search destination, state, country, attraction (e.g. Ooty, Tamil Nadu, Eiffel Tower, Temple)..."
                className="w-full pl-12 pr-4 py-3 bg-[#F5F8FC] border border-slate-200 rounded-2xl text-sm text-[#14243D] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1261A0]/20 focus:border-[#1261A0] transition-all"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600 p-0.5"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Bookable only toggle */}
            <label className="inline-flex items-center gap-2.5 px-4 py-3 rounded-2xl border border-slate-200 bg-[#F5F8FC] cursor-pointer hover:bg-slate-100 transition-colors text-xs font-bold text-[#14243D] select-none">
              <input
                type="checkbox"
                checked={onlyBookable}
                onChange={(e) => setOnlyBookable(e.target.checked)}
                className="w-4 h-4 text-[#1261A0] rounded focus:ring-0 cursor-pointer"
              />
              <span>Live Packages Only</span>
              <span className="px-1.5 py-0.5 rounded text-[10px] bg-emerald-100 text-emerald-800 font-extrabold">
                {bookableCount}
              </span>
            </label>
          </div>

          {/* Region Tabs */}
          <div className="space-y-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
              Filter by Region
            </span>
            <div className="flex flex-wrap gap-2">
              {[
                { id: "all", label: "All Destinations" },
                { id: "tamil-nadu", label: "🌟 Deep Tamil Nadu & South India" },
                { id: "india", label: "🇮🇳 All India (28 States & 8 UTs)" },
                { id: "international", label: "✈️ International Destinations" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setSelectedRegion(tab.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    selectedRegion === tab.id
                      ? "bg-[#1261A0] text-white shadow-sm"
                      : "bg-[#F5F8FC] text-slate-700 hover:bg-slate-200 border border-slate-200"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Category Chips */}
          <div className="space-y-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
              Travel Themes & Categories
            </span>
            <div className="flex flex-wrap gap-1.5">
              <button
                type="button"
                onClick={() => setSelectedCategory("all")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  selectedCategory === "all"
                    ? "bg-[#0B1730] text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                All Themes
              </button>
              {DESTINATION_CATEGORIES.map((cat) => {
                if (cat === "All Categories") return null;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      selectedCategory.toLowerCase() === cat.toLowerCase()
                        ? "bg-[#0B1730] text-white"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Results Count Banner */}
        <div className="flex items-center justify-between text-xs text-slate-500 px-1">
          <span>
            Showing <strong className="text-[#14243D]">{filteredDestinations.length}</strong> of{" "}
            {DESTINATIONS_CATALOG.length} destinations
          </span>
          {(searchTerm ||
            selectedRegion !== "all" ||
            selectedCategory !== "all" ||
            onlyBookable) && (
            <button
              type="button"
              onClick={() => {
                setSearchTerm("");
                setSelectedRegion("all");
                setSelectedCategory("all");
                setOnlyBookable(false);
              }}
              className="text-[#1261A0] hover:underline font-bold"
            >
              Reset all filters
            </button>
          )}
        </div>

        {/* Destination Cards Grid */}
        {filteredDestinations.length === 0 ? (
          <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
              <Compass className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-[#14243D]">No destinations match your filters</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Try clearing your search keyword or switching to &ldquo;All Destinations&rdquo; to explore all regions.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchTerm("");
                setSelectedRegion("all");
                setSelectedCategory("all");
                setOnlyBookable(false);
              }}
              className="px-5 py-2.5 rounded-xl bg-[#1261A0] text-white text-xs font-bold hover:bg-[#0E4D80] transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDestinations.map((dest) => {
              const displayImage = dest.image || dest.imageUrl;
              const sourceUrl = dest.sourceUrl || dest.officialTourismUrl;
              const targetKeyword = dest.packageSearchKeyword || dest.name;

              return (
                <div
                  key={dest.id}
                  className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all duration-200 flex flex-col group"
                >
                  {/* Image & Badges Header */}
                  <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                    <img
                      src={displayImage}
                      alt={dest.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B1730]/85 via-transparent to-black/20"></div>

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#0B1730]/85 text-white backdrop-blur-xs border border-white/10">
                        {dest.category}
                      </span>
                      {dest.hasBookablePackage ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500 text-white shadow-sm">
                          <CheckCircle2 className="w-3 h-3" /> Bookable Package
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-medium bg-white/80 text-slate-700 backdrop-blur-xs">
                          <Info className="w-3 h-3 text-[#1261A0]" /> Travel Guide
                        </span>
                      )}
                    </div>

                    {/* Bottom Image Overlay text */}
                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <div className="flex items-center gap-1.5 text-xs text-[#21B8D5] font-semibold">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>
                          {dest.state ? `${dest.state}, ` : ""}
                          {dest.country}
                        </span>
                      </div>
                      <h3 className="text-xl font-black tracking-tight text-white mt-0.5 truncate">
                        {dest.name}
                      </h3>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-3">
                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                        {dest.description}
                      </p>

                      {/* Top Attractions Pills */}
                      <div className="space-y-1.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                          Key Attractions:
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {(dest.topAttractions || []).slice(0, 3).map((attr) => (
                            <span
                              key={attr}
                              className="text-[11px] px-2 py-0.5 rounded-md bg-slate-50 text-slate-700 border border-slate-200/80 truncate max-w-[200px]"
                            >
                              {attr}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons Footer */}
                    <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setModalDestination(dest)}
                        className="flex-1 py-2 px-3 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
                      >
                        <Info className="w-3.5 h-3.5 text-[#1261A0]" />
                        <span>View Guide</span>
                      </button>

                      {dest.hasBookablePackage ? (
                        <button
                          type="button"
                          onClick={() => onSelectDestination(targetKeyword)}
                          className="flex-1 py-2 px-3 rounded-xl bg-[#1261A0] hover:bg-[#0E4D80] text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5 active:scale-98"
                        >
                          <span>Book Package</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      ) : (
                        sourceUrl && (
                          <a
                            href={sourceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium transition-colors inline-flex items-center gap-1"
                            title="Official Tourism Board"
                          >
                            <Globe2 className="w-3.5 h-3.5 text-slate-500" />
                            <ExternalLink className="w-3 h-3 text-slate-400" />
                          </a>
                        )
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Informational Modal for Selected Destination */}
        {modalDestination && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-[#0B1730]/75 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
              {/* Modal Hero Banner */}
              <div className="relative h-56 sm:h-64 w-full bg-slate-900">
                <img
                  src={modalDestination.image || modalDestination.imageUrl}
                  alt={modalDestination.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1730] via-[#0B1730]/40 to-transparent"></div>

                <button
                  type="button"
                  onClick={() => setModalDestination(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-black/40 text-white hover:bg-black/70 backdrop-blur-xs transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="absolute bottom-5 left-6 right-6 text-white space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#1261A0] text-white">
                      {modalDestination.category}
                    </span>
                    <span className="text-xs text-[#21B8D5] font-semibold flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {modalDestination.state ? `${modalDestination.state}, ` : ""}
                      {modalDestination.country}
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-white">
                    {modalDestination.name}
                  </h2>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
                {/* Description */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Destination Overview
                  </h4>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    {modalDestination.description}
                  </p>
                </div>

                {/* Quick Info Grid */}
                <div className="grid grid-cols-2 gap-3 bg-[#F5F8FC] p-4 rounded-2xl border border-slate-200 text-xs">
                  <div>
                    <span className="text-slate-400 font-medium block">Region</span>
                    <span className="font-bold text-[#14243D] mt-0.5 block">
                      {modalDestination.region} ({modalDestination.state || modalDestination.country})
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-medium block">Microservice Status</span>
                    <span
                      className={`font-bold mt-0.5 block ${
                        modalDestination.hasBookablePackage
                          ? "text-emerald-600"
                          : "text-slate-500"
                      }`}
                    >
                      {modalDestination.hasBookablePackage
                        ? "Active Package on :5001"
                        : "Informational Guide Only"}
                    </span>
                  </div>
                </div>

                {/* Top Attractions */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Famous Attractions & Landmarks
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {(modalDestination.topAttractions || []).map((attr) => (
                      <div
                        key={attr}
                        className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2 text-xs text-[#14243D]"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                        <span className="font-medium">{attr}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Verified External Links */}
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Verified Tourism Resources
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {(modalDestination.sourceUrl || modalDestination.officialTourismUrl) && (
                      <a
                        href={modalDestination.sourceUrl || modalDestination.officialTourismUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#1261A0]/10 hover:bg-[#1261A0]/20 text-[#1261A0] text-xs font-bold transition-colors"
                      >
                        <Globe2 className="w-4 h-4" />
                        <span>Official Tourism Portal</span>
                        <ExternalLink className="w-3 h-3 ml-0.5" />
                      </a>
                    )}

                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                        `${modalDestination.name} ${modalDestination.state || ""} ${modalDestination.country}`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
                    >
                      <MapPin className="w-4 h-4 text-[#1261A0]" />
                      <span>Open in Google Maps</span>
                      <ExternalLink className="w-3 h-3 ml-0.5" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setModalDestination(null)}
                  className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-100 transition-colors"
                >
                  Close Guide
                </button>

                {modalDestination.hasBookablePackage ? (
                  <button
                    type="button"
                    onClick={() => {
                      const target =
                        modalDestination.packageSearchKeyword ||
                        modalDestination.name;
                      setModalDestination(null);
                      onSelectDestination(target);
                    }}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#1261A0] hover:bg-[#0E4D80] text-white text-xs font-bold shadow-md shadow-[#1261A0]/20 transition-all"
                  >
                    <span>View & Book Packages</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <span className="text-xs text-slate-500 font-medium italic">
                    Microservice booking for this route coming soon
                  </span>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
