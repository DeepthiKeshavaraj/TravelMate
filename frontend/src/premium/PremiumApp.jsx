import React, { useState, useEffect, useCallback } from "react";
import PremiumNavbar from "./components/PremiumNavbar";
import PremiumFooter from "./components/PremiumFooter";
import ReviewBookingModal from "./components/ReviewBookingModal";
import PremiumHomePage from "./pages/PremiumHomePage";
import DestinationsDirectoryPage from "./pages/DestinationsDirectoryPage";
import PremiumPackagesPage from "./pages/PremiumPackagesPage";
import PremiumPackageDetailPage from "./pages/PremiumPackageDetailPage";
import PremiumMyBookingsPage from "./pages/PremiumMyBookingsPage";
import ArchitecturePage from "./pages/ArchitecturePage";

export default function PremiumApp() {
  // Read initial route and params from URL query string if present
  const parseUrlParams = () => {
    if (typeof window === "undefined")
      return { page: "home", dest: "all", search: "", budget: "any", id: "" };
    const params = new URLSearchParams(window.location.search);
    const page = params.get("page") || "home";
    const dest = params.get("destination") || "all";
    const search = params.get("search") || "";
    const budget = params.get("budget") || "any";
    const id = params.get("id") || "";
    return { page, dest, search, budget, id };
  };

  const initial = parseUrlParams();

  const [activePage, setActivePage] = useState(initial.page);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [selectedPackageId, setSelectedPackageId] = useState(initial.id || "");
  const [bookingPackage, setBookingPackage] = useState(null);
  const [searchTerm, setSearchTerm] = useState(initial.search);
  const [selectedDestination, setSelectedDestination] = useState(initial.dest);
  const [budgetFilter, setBudgetFilter] = useState(initial.budget);

  // Sync state to URL without reloading the page
  const updateUrl = useCallback((page, params = {}) => {
    if (typeof window === "undefined") return;
    const searchParams = new URLSearchParams();
    if (page !== "home") searchParams.set("page", page);
    if (params.id) {
      searchParams.set("id", params.id);
    }
    if (params.destination && params.destination !== "all") {
      searchParams.set("destination", params.destination);
    }
    if (params.search && params.search.trim()) {
      searchParams.set("search", params.search.trim());
    }
    if (params.budget && params.budget !== "any") {
      searchParams.set("budget", params.budget);
    }

    const qs = searchParams.toString();
    const newUrl = qs ? `${window.location.pathname}?${qs}` : window.location.pathname;
    window.history.pushState({ page, params }, "", newUrl);
  }, []);

  // Listen for browser Back/Forward navigation
  useEffect(() => {
    const handlePopState = () => {
      const current = parseUrlParams();
      setActivePage(current.page);
      setSelectedDestination(current.dest);
      setSearchTerm(current.search);
      setBudgetFilter(current.budget);
      setSelectedPackageId(current.id);
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // Generic navigation helper
  const navigateTo = (page, params = {}) => {
    setActivePage(page);
    updateUrl(page, params);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /**
   * Action: Browse All Packages (from Navbar, Home CTAs, or Reset)
   * Explicitly clears all filters and searches, showing the full database catalog.
   */
  const handleBrowseAllPackages = () => {
    setSearchTerm("");
    setSelectedDestination("all");
    setBudgetFilter("any");
    navigateTo("packages", { destination: "all", search: "", budget: "any" });
  };

  /**
   * Action: Explore Trips for a Specific Destination (from Popular Destinations cards)
   * Preserves the selected destination in state and URL without polluting the search input.
   */
  const handleExploreDestination = (destName, extra = {}) => {
    const cleanDest = (destName || "").trim();
    const budget = extra.budget || "any";
    setSelectedDestination(cleanDest);
    setSearchTerm("");
    setBudgetFilter(budget);
    navigateTo("packages", { destination: cleanDest, search: "", budget });
  };

  const handleSelectPackage = (pkg) => {
    setSelectedPackage(pkg);
    setSelectedPackageId(pkg?._id || "");
    navigateTo("package-detail", { id: pkg?._id });
  };

  const handleOpenBooking = (pkg) => {
    setBookingPackage(pkg);
  };

  const handleCloseBooking = () => {
    setBookingPackage(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F8FC] text-[#14243D] selection:bg-[#21B8D5] selection:text-[#0B1730]">
      {/* Premium Header */}
      <PremiumNavbar
        activePage={activePage}
        setActivePage={navigateTo}
        onBrowseAllPackages={handleBrowseAllPackages}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activePage === "home" && (
          <PremiumHomePage
            onSelectPackage={handleSelectPackage}
            onBookPackage={handleOpenBooking}
            onNavigate={navigateTo}
            onBrowseAll={handleBrowseAllPackages}
            onExploreDestination={handleExploreDestination}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            budgetFilter={budgetFilter}
            setBudgetFilter={setBudgetFilter}
          />
        )}

        {activePage === "destinations" && (
          <DestinationsDirectoryPage
            onSelectDestination={handleExploreDestination}
            onBrowseAllPackages={handleBrowseAllPackages}
          />
        )}

        {activePage === "packages" && (
          <PremiumPackagesPage
            onSelectPackage={handleSelectPackage}
            onBookPackage={handleOpenBooking}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedDestination={selectedDestination}
            setSelectedDestination={setSelectedDestination}
            budgetFilter={budgetFilter}
            setBudgetFilter={setBudgetFilter}
            onBrowseAll={handleBrowseAllPackages}
            onClearAllFilters={handleBrowseAllPackages}
          />
        )}

        {activePage === "package-detail" && (
          <PremiumPackageDetailPage
            initialPackage={selectedPackage}
            packageId={selectedPackage?._id || selectedPackageId}
            onBack={() => navigateTo("packages")}
            onBook={handleOpenBooking}
          />
        )}

        {activePage === "bookings" && (
          <PremiumMyBookingsPage
            onNavigateToPackages={handleBrowseAllPackages}
          />
        )}

        {activePage === "architecture" && <ArchitecturePage />}
      </main>

      {/* Multi-step Review Booking Modal */}
      <ReviewBookingModal
        pkg={bookingPackage}
        isOpen={Boolean(bookingPackage)}
        onClose={handleCloseBooking}
        onNavigateToBookings={() => navigateTo("bookings")}
      />

      {/* Premium Footer */}
      <PremiumFooter
        setActivePage={navigateTo}
        onBrowseAllPackages={handleBrowseAllPackages}
      />
    </div>
  );
}
