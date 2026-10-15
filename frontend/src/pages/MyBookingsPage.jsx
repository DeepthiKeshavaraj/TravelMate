import React, { useState, useEffect } from "react";
import {
  Calendar,
  Users,
  Mail,
  User,
  CreditCard,
  Search,
  RefreshCw,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Clock,
  MapPin,
  ArrowRight,
  ShieldAlert,
  Loader2,
} from "lucide-react";
import { getBookings, cancelBooking } from "../api/bookingApi";
import { getAllPackages } from "../api/packageApi";
import LoadingSpinner from "../components/LoadingSpinner";
import AlertBanner from "../components/AlertBanner";

export default function MyBookingsPage({ onNavigateToPackages }) {
  const [bookings, setBookings] = useState([]);
  const [packagesMap, setPackagesMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [emailQuery, setEmailQuery] = useState("");
  const [activeEmailFilter, setActiveEmailFilter] = useState("");

  // Cancellation state
  const [cancellingId, setCancellingId] = useState(null);
  const [actionSuccess, setActionSuccess] = useState(null);
  const [actionError, setActionError] = useState(null);

  const fetchBookingsAndPackages = async (emailToFilter = activeEmailFilter) => {
    setLoading(true);
    setError(null);
    try {
      const [bookingsData, packagesData] = await Promise.all([
        getBookings(emailToFilter),
        getAllPackages().catch(() => []), // Soft-fail if package service is down
      ]);

      setBookings(bookingsData);

      // Map packages by ID for quick title/destination lookup
      const map = {};
      packagesData.forEach((p) => {
        if (p._id) map[p._id] = p;
      });
      setPackagesMap(map);
    } catch (err) {
      setError(
        "Could not retrieve bookings from Booking Service (Port 5002). Please ensure the service is running."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookingsAndPackages();
  }, [activeEmailFilter]);

  const handleSearchEmail = (e) => {
    e.preventDefault();
    setActiveEmailFilter(emailQuery.trim());
  };

  const handleClearEmail = () => {
    setEmailQuery("");
    setActiveEmailFilter("");
  };

  const handleCancelBooking = async (bookingId) => {
    if (!window.confirm("Are you sure you want to cancel this booking? This will update your reservation status to cancelled.")) {
      return;
    }

    setCancellingId(bookingId);
    setActionSuccess(null);
    setActionError(null);

    try {
      const result = await cancelBooking(bookingId);
      if (result && result.success) {
        setActionSuccess("Booking has been cancelled successfully.");
        // Refresh bookings list
        await fetchBookingsAndPackages(activeEmailFilter);
      } else {
        throw new Error(result?.message || "Failed to cancel booking.");
      }
    } catch (err) {
      setActionError(err.message || "Failed to cancel booking.");
    } finally {
      setCancellingId(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-primary-600 block mb-1">
            Reservation Management
          </span>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            My Bookings
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Track and manage your reservations verified through the Booking Service
          </p>
        </div>

        <button
          onClick={() => fetchBookingsAndPackages(activeEmailFilter)}
          disabled={loading}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-2xs self-start md:self-auto transition-all"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
          Refresh Bookings
        </button>
      </div>

      {/* Notifications */}
      {actionSuccess && (
        <AlertBanner
          type="success"
          title="Reservation Updated"
          message={actionSuccess}
          onClose={() => setActionSuccess(null)}
        />
      )}

      {actionError && (
        <AlertBanner
          type="error"
          title="Operation Failed"
          message={actionError}
          onClose={() => setActionError(null)}
        />
      )}

      {/* Search by Customer Email */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
        <form
          onSubmit={handleSearchEmail}
          className="flex flex-col sm:flex-row items-center gap-3"
        >
          <div className="relative flex-1 w-full">
            <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="email"
              placeholder="Filter by customer email (e.g., guest@example.com)..."
              value={emailQuery}
              onChange={(e) => setEmailQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-primary-500 focus:bg-white transition-all"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="submit"
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-bold text-xs shadow-xs transition-all"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Search Email</span>
            </button>

            {activeEmailFilter && (
              <button
                type="button"
                onClick={handleClearEmail}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-semibold"
              >
                Clear Filter
              </button>
            )}
          </div>
        </form>

        {activeEmailFilter && (
          <div className="mt-3 text-xs text-slate-500 flex items-center gap-2">
            <span>Showing bookings for:</span>
            <strong className="text-slate-800 font-semibold bg-sky-50 text-primary-700 px-2 py-0.5 rounded-md border border-sky-100">
              {activeEmailFilter}
            </strong>
          </div>
        )}
      </div>

      {/* State Handling */}
      {loading && (
        <div className="bg-white rounded-2xl border border-slate-200 p-16">
          <LoadingSpinner
            message="Querying Booking Service database..."
            size="lg"
          />
        </div>
      )}

      {error && (
        <AlertBanner
          type="error"
          title="Booking Service Unavailable"
          message={error}
          actionButton={
            <button
              onClick={() => fetchBookingsAndPackages(activeEmailFilter)}
              className="mt-2 text-xs font-bold text-primary-700 underline hover:no-underline"
            >
              Try Again
            </button>
          }
        />
      )}

      {!loading && !error && bookings.length === 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-16 text-center space-y-4">
          <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto">
            <Calendar className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-800">
              {activeEmailFilter
                ? `No bookings found for "${activeEmailFilter}"`
                : "No bookings found"}
            </h3>
            <p className="text-slate-500 text-sm mt-1 max-w-md mx-auto">
              {activeEmailFilter
                ? "Check your email address for typos or search for a different address."
                : "You haven't made any travel package bookings yet. Explore our packages and start your adventure!"}
            </p>
          </div>
          {onNavigateToPackages && (
            <button
              onClick={onNavigateToPackages}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary-600 hover:bg-primary-700 text-white text-xs font-bold shadow-md shadow-primary-500/20"
            >
              <span>Explore Packages</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      )}

      {!loading && !error && bookings.length > 0 && (
        <div className="space-y-4">
          <div className="text-xs text-slate-500 font-semibold px-1">
            Total {bookings.length} {bookings.length === 1 ? "booking" : "bookings"} on record
          </div>

          <div className="grid grid-cols-1 gap-4">
            {bookings.map((booking) => {
              const matchedPkg = packagesMap[booking.packageId];
              const isCancelled = booking.status === "cancelled";
              const isCancelling = cancellingId === booking._id;

              return (
                <div
                  key={booking._id}
                  className={`bg-white rounded-2xl border p-6 transition-all duration-200 shadow-xs hover:shadow-md ${
                    isCancelled
                      ? "border-slate-200 bg-slate-50/50 opacity-80"
                      : "border-slate-200 hover:border-primary-200"
                  }`}
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                    {/* Left: Booking Details */}
                    <div className="space-y-3 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        {/* Status Badge */}
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                            isCancelled
                              ? "bg-slate-200 text-slate-700"
                              : "bg-emerald-100 text-emerald-800"
                          }`}
                        >
                          {isCancelled ? (
                            <>
                              <XCircle className="w-3.5 h-3.5 text-slate-500" />
                              Cancelled
                            </>
                          ) : (
                            <>
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                              Confirmed
                            </>
                          )}
                        </span>

                        {/* Package Destination Chip */}
                        {matchedPkg ? (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-sky-50 text-primary-700 border border-sky-100">
                            <MapPin className="w-3.5 h-3.5" />
                            {matchedPkg.destination} — {matchedPkg.title}
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-xs text-slate-400 font-mono">
                            Package ID: {booking.packageId}
                          </span>
                        )}

                        <span className="text-xs text-slate-400 font-mono">
                          Ref: {booking._id}
                        </span>
                      </div>

                      {/* Guest & Contact info */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-1">
                        <div className="flex items-center gap-2 text-slate-700">
                          <User className="w-4 h-4 text-slate-400 flex-shrink-0" />
                          <span className="font-semibold">{booking.customerName}</span>
                        </div>

                        <div className="flex items-center gap-2 text-slate-700">
                          <Mail className="w-4 h-4 text-slate-400 flex-shrink-0" />
                          <span>{booking.email}</span>
                        </div>

                        <div className="flex items-center gap-2 text-slate-700">
                          <Users className="w-4 h-4 text-slate-400 flex-shrink-0" />
                          <span>
                            {booking.numberOfPeople}{" "}
                            {booking.numberOfPeople === 1 ? "Guest" : "Guests"}
                          </span>
                        </div>
                      </div>

                      {/* Dates and Timestamps */}
                      <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1">
                        <span className="flex items-center gap-1.5 font-medium text-slate-800">
                          <Calendar className="w-3.5 h-3.5 text-primary-600" />
                          Travel Date:{" "}
                          <strong>
                            {new Date(booking.travelDate).toLocaleDateString(
                              "en-US",
                              {
                                weekday: "short",
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              }
                            )}
                          </strong>
                        </span>

                        <span className="flex items-center gap-1 text-slate-400">
                          <Clock className="w-3.5 h-3.5" />
                          Booked on:{" "}
                          {new Date(booking.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    {/* Right: Price & Cancel Action */}
                    <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between border-t lg:border-t-0 pt-4 lg:pt-0 border-slate-100 gap-3">
                      <div className="text-left lg:text-right">
                        <span className="text-[11px] text-slate-400 font-medium block">
                          Total Price
                        </span>
                        <span className="text-2xl font-black text-slate-900">
                          ₹{Number(booking.totalPrice).toLocaleString("en-IN")}
                        </span>
                      </div>

                      {!isCancelled && (
                        <button
                          onClick={() => handleCancelBooking(booking._id)}
                          disabled={isCancelling}
                          className="px-4 py-2 rounded-xl border border-rose-200 text-rose-700 hover:bg-rose-50 text-xs font-bold transition-all disabled:opacity-50"
                        >
                          {isCancelling ? (
                            <span className="flex items-center gap-1.5">
                              <Loader2 className="w-3.5 h-3.5 animate-spin" />
                              Cancelling...
                            </span>
                          ) : (
                            "Cancel Booking"
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
