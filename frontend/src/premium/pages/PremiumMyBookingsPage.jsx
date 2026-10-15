import React, { useState, useEffect } from "react";
import {
  Calendar,
  Users,
  Mail,
  User,
  Search,
  RefreshCw,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Clock,
  MapPin,
  ArrowRight,
  Loader2,
  CalendarCheck,
} from "lucide-react";
import { getBookings, cancelBooking } from "../../api/bookingApi";
import { getAllPackages } from "../../api/packageApi";

export default function PremiumMyBookingsPage({ onNavigateToPackages }) {
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
        getAllPackages().catch(() => []), // Soft-fail if package service is unreachable
      ]);

      setBookings(bookingsData);

      const map = {};
      packagesData.forEach((p) => {
        if (p._id) map[p._id] = p;
      });
      setPackagesMap(map);
    } catch (err) {
      setError(
        "Booking Service at http://localhost:5002 is unreachable. Ensure the service is running."
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

  const handleCancel = async (bookingId) => {
    if (
      !window.confirm(
        "Are you sure you want to cancel this reservation? The Booking Service will update the status to cancelled."
      )
    ) {
      return;
    }

    setCancellingId(bookingId);
    setActionSuccess(null);
    setActionError(null);

    try {
      const result = await cancelBooking(bookingId);
      if (result && result.success) {
        setActionSuccess("Booking has been cancelled in the database.");
        await fetchBookingsAndPackages(activeEmailFilter);
      } else {
        throw new Error(result?.message || "Failed to cancel reservation.");
      }
    } catch (err) {
      setActionError(err.message || "Failed to cancel reservation.");
    } finally {
      setCancellingId(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#1261A0] block mb-1">
            Booking Service Reservations
          </span>
          <h1 className="text-3xl font-black text-[#14243D] tracking-tight">
            My Bookings
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Search reservations by email or view confirmed bookings stored in MongoDB
          </p>
        </div>

        <button
          type="button"
          onClick={() => fetchBookingsAndPackages(activeEmailFilter)}
          disabled={loading}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-[#14243D] text-xs font-semibold shadow-2xs self-start md:self-auto transition-all"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
          <span>Refresh List</span>
        </button>
      </div>

      {/* Notifications */}
      {actionSuccess && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-2xl flex items-center gap-3 text-xs font-medium">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>{actionSuccess}</span>
        </div>
      )}

      {actionError && (
        <div className="bg-rose-50 border border-rose-200 text-rose-800 p-4 rounded-2xl flex items-center gap-3 text-xs font-medium">
          <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
          <span>{actionError}</span>
        </div>
      )}

      {/* Email Search Box */}
      <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-xs">
        <form
          onSubmit={handleSearchEmail}
          className="flex flex-col sm:flex-row items-center gap-3"
        >
          <div className="relative flex-1 w-full">
            <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="email"
              placeholder="Search by customer email (e.g. traveller@example.com)..."
              value={emailQuery}
              onChange={(e) => setEmailQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-[#F5F8FC] border border-slate-200 rounded-xl text-xs sm:text-sm text-[#14243D] focus:outline-none focus:border-[#1261A0] focus:bg-white transition-all"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="submit"
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-[#1261A0] hover:bg-[#0E4D80] text-white font-bold text-xs shadow-xs transition-all"
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
            <span>Filtered for:</span>
            <strong className="text-[#1261A0] font-semibold bg-sky-50 px-2.5 py-0.5 rounded-md border border-sky-100 font-mono">
              {activeEmailFilter}
            </strong>
          </div>
        )}
      </div>

      {/* Loading State */}
      {loading && (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="h-32 bg-white rounded-2xl border border-slate-200 p-6 animate-pulse"
            ></div>
          ))}
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="bg-white rounded-3xl border border-rose-200 p-10 text-center space-y-3">
          <p className="text-sm font-semibold text-rose-700">{error}</p>
          <button
            type="button"
            onClick={() => fetchBookingsAndPackages(activeEmailFilter)}
            className="px-4 py-2 rounded-xl bg-[#1261A0] text-white text-xs font-bold"
          >
            Retry Connection
          </button>
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && bookings.length === 0 && (
        <div className="bg-white rounded-3xl border border-slate-200 p-16 text-center space-y-4 max-w-lg mx-auto shadow-xs">
          <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto">
            <CalendarCheck className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-[#14243D]">
              {activeEmailFilter
                ? `No bookings found for "${activeEmailFilter}"`
                : "No bookings found on record"}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-sm mx-auto leading-relaxed">
              {activeEmailFilter
                ? "Double check your email address spelling or search another email."
                : "You haven't reserved any travel packages yet. Explore our verified itineraries!"}
            </p>
          </div>
          {onNavigateToPackages && (
            <button
              type="button"
              onClick={onNavigateToPackages}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1261A0] hover:bg-[#0E4D80] text-white text-xs font-bold shadow-md shadow-[#1261A0]/20"
            >
              <span>Explore Packages</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      )}

      {/* Bookings List */}
      {!loading && !error && bookings.length > 0 && (
        <div className="space-y-4">
          <div className="text-xs text-slate-500 font-semibold px-1">
            Total {bookings.length} {bookings.length === 1 ? "booking" : "bookings"} on record
          </div>

          <div className="space-y-4">
            {bookings.map((booking) => {
              const matchedPkg = packagesMap[booking.packageId];
              const isCancelled = booking.status === "cancelled";
              const isCancelling = cancellingId === booking._id;

              return (
                <div
                  key={booking._id}
                  className={`bg-white rounded-3xl border p-6 transition-all duration-200 shadow-xs hover:shadow-md ${
                    isCancelled
                      ? "border-slate-200 bg-slate-50/60 opacity-80"
                      : "border-slate-200 hover:border-[#1261A0]/40"
                  }`}
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                    {/* Left: Info */}
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

                        {/* Package Chip */}
                        {matchedPkg ? (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#F5F8FC] text-[#1261A0] border border-slate-200">
                            <MapPin className="w-3.5 h-3.5 text-[#1261A0]" />
                            {matchedPkg.destination} — {matchedPkg.title}
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-xs text-slate-400 font-mono">
                            Package ID: {booking.packageId}
                          </span>
                        )}

                        <span className="text-[11px] text-slate-400 font-mono">
                          Ref: {booking._id}
                        </span>
                      </div>

                      {/* Guest details */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-1">
                        <div className="flex items-center gap-2 text-[#14243D]">
                          <User className="w-4 h-4 text-slate-400 flex-shrink-0" />
                          <span className="font-bold">{booking.customerName}</span>
                        </div>

                        <div className="flex items-center gap-2 text-slate-600">
                          <Mail className="w-4 h-4 text-slate-400 flex-shrink-0" />
                          <span>{booking.email}</span>
                        </div>

                        <div className="flex items-center gap-2 text-slate-600">
                          <Users className="w-4 h-4 text-slate-400 flex-shrink-0" />
                          <span>
                            {booking.numberOfPeople}{" "}
                            {booking.numberOfPeople === 1 ? "Guest" : "Guests"}
                          </span>
                        </div>
                      </div>

                      {/* Dates */}
                      <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1">
                        <span className="flex items-center gap-1.5 font-semibold text-[#14243D]">
                          <Calendar className="w-3.5 h-3.5 text-[#1261A0]" />
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
                          Booked: {new Date(booking.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    {/* Right: Price & Cancel */}
                    <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between border-t lg:border-t-0 pt-4 lg:pt-0 border-slate-100 gap-3">
                      <div className="text-left lg:text-right">
                        <span className="text-[11px] text-slate-400 font-medium block">
                          Total Amount Paid
                        </span>
                        <span className="text-2xl font-black text-[#14243D]">
                          ₹{Number(booking.totalPrice).toLocaleString("en-IN")}
                        </span>
                      </div>

                      {!isCancelled && (
                        <button
                          type="button"
                          onClick={() => handleCancel(booking._id)}
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
