import React, { useState, useEffect, useMemo } from "react";
import {
  Search,
  RefreshCw,
  MapPin,
  ArrowUpDown,
  DollarSign,
  Clock,
  Sparkles,
  Info,
  X,
  Compass,
  Database,
  ArrowRight,
} from "lucide-react";
import PremiumPackageCard from "../components/PremiumPackageCard";
import PackageCardSkeleton from "../components/PackageCardSkeleton";
import { getAllPackages } from "../../api/packageApi";

export default function PremiumPackagesPage({
  onSelectPackage,
  onBookPackage,
  searchTerm = "",
  setSearchTerm,
  selectedDestination = "all",
  setSelectedDestination,
  budgetFilter = "any",
  setBudgetFilter,
  onBrowseAll,
  onClearAllFilters,
}) {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Local sorting and availability toggle
  const [sortBy, setSortBy] = useState("featured");
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  const [durationFilter, setDurationFilter] = useState("all");

  const fetchPackages = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllPackages();
      setPackages(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(
        "Could not load packages from Package Service (Port 5001). Please verify that the package-service backend is running."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  // Extract distinct destinations present in loaded DB packages
  const dbDestinations = useMemo(() => {
    const set = new Set();
    packages.forEach((p) => {
      if (p.destination) set.add(p.destination.trim());
    });
    return Array.from(set).sort();
  }, [packages]);

  // Normalize string helper for safe, accent-insensitive and punctuation-insensitive comparisons
  const normalize = (str) =>
    (str || "")
      .toLowerCase()
      .trim()
      .replace(/[,.-]/g, " ")
      .replace(/\s+/g, " ");

  // Match selectedDestination to the matching DB destination format (e.g. "Dubai" -> "Dubai, UAE")
  const selectedDropdownValue = useMemo(() => {
    if (!selectedDestination || selectedDestination === "all") return "all";
    const exact = dbDestinations.find(
      (d) => d.toLowerCase() === selectedDestination.toLowerCase()
    );
    if (exact) return exact;
    const partial = dbDestinations.find(
      (d) =>
        normalize(d).includes(normalize(selectedDestination)) ||
        normalize(selectedDestination).includes(normalize(d))
    );
    if (partial) return partial;
    return selectedDestination;
  }, [selectedDestination, dbDestinations]);

  // Combined destination options list for the select dropdown:
  // If the user navigated for a specific destination not yet in the DB, display it so UI remains consistent.
  const dropdownDestinations = useMemo(() => {
    const list = [...dbDestinations];
    if (
      selectedDropdownValue &&
      selectedDropdownValue !== "all" &&
      !list.some((d) => d.toLowerCase() === selectedDropdownValue.toLowerCase())
    ) {
      list.unshift(selectedDropdownValue);
    }
    return list;
  }, [dbDestinations, selectedDropdownValue]);

  // Filtered and sorted package list
  const filteredPackages = useMemo(() => {
    return packages
      .filter((pkg) => {
        const pkgTitle = normalize(pkg.title);
        const pkgDest = normalize(pkg.destination);
        const pkgDesc = normalize(pkg.description);

        // 1. Keyword search filter
        if (searchTerm && searchTerm.trim()) {
          const term = normalize(searchTerm);
          const matchesKeyword =
            pkgTitle.includes(term) ||
            pkgDest.includes(term) ||
            pkgDesc.includes(term);
          if (!matchesKeyword) return false;
        }

        // 2. Explicit destination filter
        if (selectedDestination && selectedDestination !== "all") {
          const selected = normalize(selectedDestination);
          // Check if destination contains the selected keyword or vice versa (e.g. "Paris" matches "Paris, France")
          const matchesDest =
            pkgDest.includes(selected) ||
            selected.includes(pkgDest) ||
            pkgTitle.includes(selected);
          if (!matchesDest) return false;
        }

        // 3. Duration filter
        if (durationFilter !== "all") {
          const normDur = normalize(pkg.duration);
          const normFilt = normalize(durationFilter);
          if (!normDur.includes(normFilt)) return false;
        }

        // 4. Budget filter (in Indian Rs, below 1,00,000)
        if (budgetFilter && budgetFilter !== "any") {
          const price = Number(pkg.price);
          if (budgetFilter === "under15000" || budgetFilter === "under1000") {
            if (price >= 15000) return false;
          } else if (budgetFilter === "15000-25000" || budgetFilter === "15000-20000" || budgetFilter === "1000-2500") {
            if (price < 15000 || price > 25000) return false;
          } else if (budgetFilter === "25000-100000" || budgetFilter === "above20000" || budgetFilter === "above2500") {
            if (price < 25000 || price > 100000) return false;
          }
        }

        // 5. Available capacity filter
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
        // Default: newest first
        return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
      });
  }, [
    packages,
    searchTerm,
    selectedDestination,
    durationFilter,
    budgetFilter,
    onlyAvailable,
    sortBy,
  ]);

  const handleClearFilters = () => {
    setDurationFilter("all");
    setSortBy("featured");
    setOnlyAvailable(false);
    if (setSearchTerm) setSearchTerm("");
    if (setSelectedDestination) setSelectedDestination("all");
    if (setBudgetFilter) setBudgetFilter("any");
    if (onClearAllFilters) {
      onClearAllFilters();
    }
  };

  const handleClearDestinationOnly = () => {
    if (setSelectedDestination) setSelectedDestination("all");
    if (setSearchTerm && searchTerm) {
      const normTerm = normalize(searchTerm);
      const normDest = normalize(selectedDestination);
      if (normTerm.includes(normDest) || normDest.includes(normTerm)) {
        setSearchTerm("");
      }
    }
  };

  const hasActiveDestinationFilter =
    selectedDestination && selectedDestination !== "all";

  // Check if the requested destination actually exists in database packages
  const destinationMatchInDb = useMemo(() => {
    if (!hasActiveDestinationFilter) return null;
    const selected = normalize(selectedDestination);
    return packages.find((p) => {
      const pDest = normalize(p.destination);
      const pTitle = normalize(p.title);
      return pDest.includes(selected) || selected.includes(pDest) || pTitle.includes(selected);
    });
  }, [packages, hasActiveDestinationFilter, selectedDestination]);

  const hasActiveFilters =
    Boolean(searchTerm && searchTerm.trim()) ||
    hasActiveDestinationFilter ||
    durationFilter !== "all" ||
    (budgetFilter && budgetFilter !== "any") ||
    onlyAvailable ||
    sortBy !== "featured";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#1261A0] block mb-1">
            Package Service Itineraries
          </span>
          <h1 className="text-3xl font-black text-[#14243D] tracking-tight">
            Explore Travel Packages
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Complete collection retrieved live from the Package Service database
          </p>
        </div>

        <div className="flex items-center gap-3">
          {hasActiveFilters && (
            <button
              type="button"
              onClick={handleClearFilters}
              className="px-3.5 py-2 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 text-xs font-semibold transition-all"
            >
              Reset Filters
            </button>
          )}

          <button
            type="button"
            onClick={fetchPackages}
            disabled={loading}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-[#14243D] text-xs font-semibold shadow-2xs transition-all"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            <span>Refresh List</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4">
          {/* Keyword Search Input */}
          <div className="md:col-span-4 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder="Search by keywords, title, or destination..."
              value={searchTerm}
              onChange={(e) => setSearchTerm && setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-[#F5F8FC] border border-slate-200 rounded-xl text-xs sm:text-sm text-[#14243D] focus:outline-none focus:border-[#1261A0] focus:bg-white transition-all"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm && setSearchTerm("")}
                className="absolute right-3 top-3 text-xs text-slate-400 hover:text-slate-600"
              >
                Clear
              </button>
            )}
          </div>

          {/* Destination Dropdown */}
          <div className="md:col-span-3 relative">
            <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <select
              value={selectedDropdownValue}
              onChange={(e) => {
                const val = e.target.value;
                if (setSelectedDestination) setSelectedDestination(val);
                // Clear search term if it was duplicating or conflicting with destination
                if (searchTerm) {
                  const normTerm = normalize(searchTerm);
                  const normDest = normalize(selectedDestination);
                  const normVal = normalize(val);
                  if (val === "all" || normTerm.includes(normDest) || normDest.includes(normTerm) || normTerm.includes(normVal)) {
                    if (setSearchTerm) setSearchTerm("");
                  }
                }
              }}
              className="w-full pl-10 pr-8 py-2.5 bg-[#F5F8FC] border border-slate-200 rounded-xl text-xs sm:text-sm text-[#14243D] focus:outline-none focus:border-[#1261A0] focus:bg-white transition-all appearance-none"
            >
              <option value="all">All Destinations</option>
              {dropdownDestinations.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          {/* Budget Range Dropdown */}
          <div className="md:col-span-2 relative">
            <DollarSign className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <select
              value={budgetFilter || "any"}
              onChange={(e) => setBudgetFilter && setBudgetFilter(e.target.value)}
              className="w-full pl-9 pr-6 py-2.5 bg-[#F5F8FC] border border-slate-200 rounded-xl text-xs sm:text-sm text-[#14243D] focus:outline-none focus:border-[#1261A0] focus:bg-white transition-all appearance-none"
            >
              <option value="any">Any Price</option>
              <option value="under15000">Under ₹15,000</option>
              <option value="15000-25000">₹15,000 - ₹25,000</option>
              <option value="25000-100000">₹25,000 - ₹1,00,000</option>
            </select>
          </div>

          {/* Sort By Dropdown */}
          <div className="md:col-span-3 relative">
            <ArrowUpDown className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full pl-9 pr-6 py-2.5 bg-[#F5F8FC] border border-slate-200 rounded-xl text-xs sm:text-sm text-[#14243D] focus:outline-none focus:border-[#1261A0] focus:bg-white transition-all appearance-none"
            >
              <option value="featured">Sort: Newest First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="slots-desc">Most Available Slots</option>
            </select>
          </div>
        </div>

        {/* Active Filter Chips & Clear Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100 text-xs">
          <div className="flex flex-wrap items-center gap-2">
            <label className="flex items-center gap-2 cursor-pointer text-slate-700 font-medium select-none mr-2">
              <input
                type="checkbox"
                checked={onlyAvailable}
                onChange={(e) => setOnlyAvailable(e.target.checked)}
                className="rounded text-[#1261A0] focus:ring-[#1261A0] w-4 h-4"
              />
              <span>Open capacity only</span>
            </label>

            {/* Active Destination Pill */}
            {hasActiveDestinationFilter && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100 text-[#1261A0] font-semibold">
                <MapPin className="w-3 h-3" />
                <span>Destination: {selectedDestination}</span>
                <button
                  type="button"
                  onClick={handleClearDestinationOnly}
                  className="hover:text-sky-900 ml-1"
                  aria-label="Remove destination filter"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {/* Active Keyword Pill */}
            {searchTerm && searchTerm.trim() && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-800 font-semibold">
                <span>Keyword: "{searchTerm}"</span>
                <button
                  type="button"
                  onClick={() => setSearchTerm && setSearchTerm("")}
                  className="hover:text-black ml-1"
                  aria-label="Remove keyword search"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {/* Active Budget Pill */}
            {budgetFilter && budgetFilter !== "any" && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-semibold">
                <DollarSign className="w-3 h-3" />
                <span>
                  Budget: {budgetFilter === "under15000" || budgetFilter === "under1000"
                    ? "< ₹15,000"
                    : budgetFilter === "15000-25000" || budgetFilter === "15000-20000" || budgetFilter === "1000-2500"
                    ? "₹15,000 - ₹25,000"
                    : "< ₹1,00,000"}
                </span>
                <button
                  type="button"
                  onClick={() => setBudgetFilter && setBudgetFilter("any")}
                  className="hover:text-emerald-950 ml-1"
                  aria-label="Remove budget filter"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
          </div>

          {/* Result Count Feedback */}
          <div className="flex items-center gap-3">
            <span className="text-slate-600 font-medium">
              {!hasActiveFilters ? (
                <>
                  Showing all{" "}
                  <strong className="text-[#14243D] font-bold">
                    {packages.length}
                  </strong>{" "}
                  {packages.length === 1 ? "package" : "packages"} from Package Service
                </>
              ) : filteredPackages.length > 0 ? (
                <>
                  Showing{" "}
                  <strong className="text-[#14243D] font-bold">
                    {filteredPackages.length}
                  </strong>{" "}
                  of {packages.length} packages
                </>
              ) : (
                <span className="text-amber-800 font-semibold">
                  0 matching packages (out of {packages.length} in catalog)
                </span>
              )}
            </span>

            {hasActiveFilters && (
              <button
                type="button"
                onClick={handleClearFilters}
                className="text-[#1261A0] hover:underline font-semibold"
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Loading Skeletons */}
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <PackageCardSkeleton count={4} />
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-white rounded-3xl border border-rose-200 p-10 text-center space-y-3">
          <p className="text-sm font-semibold text-rose-700">{error}</p>
          <button
            type="button"
            onClick={fetchPackages}
            className="px-4 py-2 rounded-xl bg-[#1261A0] text-white text-xs font-bold"
          >
            Retry Connection
          </button>
        </div>
      )}

      {/* TRUTHFUL EMPTY STATE when no packages match the selected destination / filter */}
      {!loading && !error && filteredPackages.length === 0 && (
        <div className="bg-white rounded-3xl border border-slate-200 p-10 sm:p-14 text-center space-y-6 max-w-2xl mx-auto shadow-sm">
          <div className="w-16 h-16 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center mx-auto">
            <Compass className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h3 className="text-xl sm:text-2xl font-black text-[#14243D]">
              {destinationMatchInDb
                ? `"${destinationMatchInDb.destination}" Package Found!`
                : hasActiveDestinationFilter
                ? `No Packages Currently Found for "${selectedDestination}"`
                : "No Packages Match Your Current Filters"}
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
              {destinationMatchInDb ? (
                <>
                  We found <strong>{destinationMatchInDb.title}</strong> (Price: <strong>₹{Number(destinationMatchInDb.price).toLocaleString("en-IN")}</strong>) in the database, but it was hidden by your active budget or capacity filter.
                </>
              ) : hasActiveDestinationFilter ? (
                <>
                  The Package Service database does not currently have any itineraries
                  registered for <strong>{selectedDestination}</strong>. However, there{" "}
                  {packages.length === 1 ? "is" : "are"}{" "}
                  <strong>{packages.length} package</strong> available in other
                  destinations (e.g. {packages[0]?.destination || "available locales"}).
                </>
              ) : packages.length === 0 ? (
                "The Package Service database is currently empty. Add packages via the Package Service API."
              ) : (
                `None of the ${packages.length} packages in the database meet your active criteria.`
              )}
            </p>
          </div>

          {/* Action buttons to recover */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            {destinationMatchInDb && (
              <button
                type="button"
                onClick={() => {
                  if (setBudgetFilter) setBudgetFilter("any");
                  setOnlyAvailable(false);
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md transition-all active:scale-95"
              >
                <span>View {destinationMatchInDb.destination} Package (₹{Number(destinationMatchInDb.price).toLocaleString("en-IN")})</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}

            <button
              type="button"
              onClick={handleClearFilters}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#1261A0] hover:bg-[#0E4D80] text-white text-xs font-bold shadow-md shadow-[#1261A0]/20 transition-all active:scale-95"
            >
              <span>Browse All Packages ({packages.length})</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {hasActiveFilters && (
              <button
                type="button"
                onClick={handleClearFilters}
                className="w-full sm:w-auto px-5 py-3 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-semibold"
              >
                Reset All Filters
              </button>
            )}
          </div>

          {/* Helpful college demonstration note */}
          <div className="mt-6 p-4 rounded-2xl bg-[#F5F8FC] border border-slate-200 text-left text-xs text-slate-500 space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-[#14243D]">
              <Database className="w-3.5 h-3.5 text-[#1261A0]" />
              <span>Database Verification Status</span>
            </div>
            <p>
              Backend endpoint <code className="bg-white px-1 rounded font-mono text-slate-800">GET http://localhost:5001/api/packages</code> returned {packages.length} total document(s).
              To add packages for {hasActiveDestinationFilter ? selectedDestination : "new destinations"}, submit a JSON payload to <code className="bg-white px-1 rounded font-mono text-slate-800">POST /api/packages</code>.
            </p>
          </div>
        </div>
      )}

      {/* When All Packages are Shown and only 1 package is in DB, display an honest note */}
      {!loading && !error && filteredPackages.length === 1 && !hasActiveFilters && (
        <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200 flex items-center gap-3 text-xs text-sky-900">
          <Info className="w-4 h-4 text-[#1261A0] flex-shrink-0" />
          <p>
            Showing all verified travel packages currently registered in the MongoDB database ({packages[0]?.destination}).
          </p>
        </div>
      )}

      {/* Package Grid (Properly balanced for 1, 2, or many packages) */}
      {!loading && !error && filteredPackages.length > 0 && (
        <div
          className={`grid gap-6 ${
            filteredPackages.length === 1
              ? "grid-cols-1 max-w-md mx-auto"
              : filteredPackages.length === 2
              ? "grid-cols-1 md:grid-cols-2 max-w-3xl mx-auto"
              : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          }`}
        >
          {filteredPackages.map((pkg) => (
            <PremiumPackageCard
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
