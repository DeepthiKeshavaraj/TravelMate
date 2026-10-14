import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import BookingModal from "./components/BookingModal";
import HomePage from "./pages/HomePage";
import PackagesPage from "./pages/PackagesPage";
import PackageDetailPage from "./pages/PackageDetailPage";
import MyBookingsPage from "./pages/MyBookingsPage";

export default function App() {
  const [activePage, setActivePage] = useState("home");
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [bookingPackage, setBookingPackage] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const navigateTo = (page) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSelectPackage = (pkg) => {
    setSelectedPackage(pkg);
    navigateTo("package-detail");
  };

  const handleOpenBooking = (pkg) => {
    setBookingPackage(pkg);
  };

  const handleCloseBooking = () => {
    setBookingPackage(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      {/* Navigation Bar */}
      <Navbar
        activePage={activePage}
        setActivePage={navigateTo}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activePage === "home" && (
          <HomePage
            onSelectPackage={handleSelectPackage}
            onBookPackage={handleOpenBooking}
            onNavigate={navigateTo}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        )}

        {activePage === "packages" && (
          <PackagesPage
            onSelectPackage={handleSelectPackage}
            onBookPackage={handleOpenBooking}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        )}

        {activePage === "package-detail" && (
          <PackageDetailPage
            initialPackage={selectedPackage}
            packageId={selectedPackage?._id}
            onBack={() => navigateTo("packages")}
            onBook={handleOpenBooking}
          />
        )}

        {activePage === "bookings" && (
          <MyBookingsPage
            onNavigateToPackages={() => navigateTo("packages")}
          />
        )}
      </main>

      {/* Booking Modal */}
      <BookingModal
        pkg={bookingPackage}
        isOpen={Boolean(bookingPackage)}
        onClose={handleCloseBooking}
        onNavigateToBookings={() => navigateTo("bookings")}
      />

      {/* Footer */}
      <Footer setActivePage={navigateTo} />
    </div>
  );
}
