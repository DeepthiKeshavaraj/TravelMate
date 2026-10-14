import React, { useState, useEffect, useMemo } from "react";
import {
  Search,
  Filter,
  SlidersHorizontal,
  RefreshCw,
  MapPin,
  Compass,
  ArrowUpDown,
  Sparkles,
} from "lucide-react";
import PackageCard from "../components/PackageCard";
import LoadingSpinner from "../components/LoadingSpinner";
import AlertBanner from "../components/AlertBanner";
import { getAllPackages } from "../api/packageApi";

export default function PackagesPage({
  onSelectPackage,
  onBookPackage,
  searchTerm,
  setSearchTerm,
}) {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filters & sorting
  const [selectedDestination, setSelectedDestination] = useState("all");
  const [sortBy, setSortBy] = useState("featured");
  const [onlyAvailable, setOnlyAvailable] = useState(false);

  const fetchPackages = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllPackages();
      setPackages(data);
    } catch (err) {
      setError(
        "Failed to connect to the TravelMate Package Service at http://localhost:5001. Ensure the package service is running and accessible."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  // Extract distinct destinations dynamically from loaded packages
  const destinations = useMemo(() => {
    const set = new Set();
    packages.forEach((p) => {
      if (p.destination) set.add(p.destination.trim());
    });
    return Array.from(set).sort();
  }, [packages]);

  // Apply search, filters, and sort
  const filteredPackages = useMemo(() => {
    return packages
      .filter((pkg) => {
        // Search term filter
        if (searchTerm.trim()) {
          const term = searchTerm.toLowerCase();
          const matchesTitle = pkg.title?.toLowerCase().includes(term);
          const matchesDest = pkg.destination?.toLowerCase().includes(term);
          const matchesDesc = pkg.description?.toLowerCase().includes(term);
          if (!matchesTitle && !matchesDest && !matchesDesc) return false;
        }

        // Destination filter
        if (selectedDestination !== "all") {
          const sel = (selectedDestination || "").toLowerCase().trim();
          const pDest = (pkg.destination || "").toLowerCase().trim();
          if (!pDest.includes(sel) && !sel.includes(pDest)) {
            return false;
          }
        }

        // Available slots filter
        if (onlyAvailable && Number(pkg.availableSlots) <= 0) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "price-asc") {
          return Number(a.price) - Number(b.price);
        }
        if (sortBy === "price-desc") {
          return Number(b.price) - Number(a.price);
        }
        if (sortBy === "slots-desc") {
          return Number(b.availableSlots) - Number(a.availableSlots);
        }
        // Default: created recently (or keep order)
        return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
      });
  }, [packages, searchTerm, selectedDestination, onlyAvailable, sortBy]);

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedDestination("all");
    setSortBy("featured");
    setOnlyAvailable(false);
  };

  const hasActiveFilters =
    Boolean(searchTerm.trim()) ||
    selectedDestination !== "all" ||
    onlyAvailable ||
    sortBy !== "featured";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-primary-600 block mb-1">
            Explore Destinations
          </span>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Travel Packages
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Browse all verified travel itineraries provided by the Package Service
          </p>
        </div>

        <button
          onClick={fetchPackages}
          disabled={loading}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-2xs self-start md:self-auto transition-all"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
          Refresh List
        </button>
      </div>

      {/* Filter and Search Control Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Search Input */}
          <div className="md:col-span-5 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder="Search by destination, title, or keywords..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-primary-500 focus:bg-white transition-all"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-3 text-xs text-slate-400 hover:text-slate-600"
              >
                Clear
              </button>
            )}
          </div>

          {/* Destination Dropdown */}
          <div className="md:col-span-3">
            <div className="relative">
              <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <select
                value={selectedDestination}
                onChange={(e) => setSelectedDestination(e.target.value)}
                className="w-full pl-10 pr-8 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-primary-500 focus:bg-white transition-all appearance-none text-slate-700"
              >
                <option value="all">All Destinations</option>
                {destinations.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Sort By Dropdown */}
          <div className="md:col-span-4">
            <div className="relative">
              <ArrowUpDown className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full pl-10 pr-8 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-primary-500 focus:bg-white transition-all appearance-none text-slate-700"
              >
                <option value="featured">Sort: Default / Newest</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="slots-desc">Most Available Slots</option>
              </select>
            </div>
          </div>
        </div>

        {/* Secondary filters row */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100 text-xs">
          <label className="flex items-center gap-2 cursor-pointer text-slate-700 font-medium select-none">
            <input
              type="checkbox"
              checked={onlyAvailable}
              onChange={(e) => setOnlyAvailable(e.target.checked)}
              className="rounded text-primary-600 focus:ring-primary-500 w-4 h-4"
            />
            <span>Show only packages with open slots</span>
          </label>

          <div className="flex items-center gap-3">
            <span className="text-slate-500 font-medium">
              Showing{" "}
              <strong className="text-slate-900 font-bold">
                {filteredPackages.length}
              </strong>{" "}
              of {packages.length} packages
            </span>

            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="text-primary-600 hover:text-primary-800 font-semibold underline"
              >
                Reset Filters
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Content State Handling */}
      {loading && (
        <div className="bg-white rounded-2xl border border-slate-200 p-16">
          <LoadingSpinner
            message="Connecting to Package Service & retrieving catalog..."
            size="lg"
          />
        </div>
      )}

      {error && (
        <AlertBanner
          type="error"
          title="Unable to Retrieve Packages"
          message={error}
          actionButton={
            <button
              onClick={fetchPackages}
              className="mt-2 text-xs font-bold text-primary-700 underline hover:no-underline"
            >
              Try Again
            </button>
          }
        />
      )}

      {!loading && !error && filteredPackages.length === 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-16 text-center space-y-4">
          <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto">
            <Search className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-800">
              No matching packages found
            </h3>
            <p className="text-slate-500 text-sm mt-1 max-w-md mx-auto">
              {hasActiveFilters
                ? "Try adjusting your search criteria or clearing active filters to see more results."
                : "No packages exist in the Package Service database. Add packages via the Package Service API."}
            </p>
          </div>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="px-4 py-2 rounded-xl bg-primary-600 text-white text-xs font-semibold shadow-xs"
            >
              Clear All Filters
            </button>
          )}
        </div>
      )}

      {!loading && !error && filteredPackages.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPackages.map((pkg) => (
            <PackageCard
              key={pkg._id}
              pkg={pkg}
              onSelect={onSelectPackage}
              onBook={onBookPackage}
            />
          ))}
        </div>
      )}
    </div>
  );
}
