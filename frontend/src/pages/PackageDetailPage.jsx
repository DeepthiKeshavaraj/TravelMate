import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  MapPin,
  Clock,
  Users,
  Calendar,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Plane,
  AlertCircle,
} from "lucide-react";
import { getPackageById } from "../api/packageApi";
import { getPackageImageUrl, handleImageError } from "../utils/imageFallback";
import LoadingSpinner from "../components/LoadingSpinner";
import AlertBanner from "../components/AlertBanner";

export default function PackageDetailPage({
  packageId,
  initialPackage,
  onBack,
  onBook,
}) {
  const [pkg, setPkg] = useState(initialPackage || null);
  const [loading, setLoading] = useState(!initialPackage && Boolean(packageId));
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!initialPackage && packageId) {
      setLoading(true);
      setError(null);
      getPackageById(packageId)
        .then((data) => {
          if (!data) throw new Error("Package not found");
          setPkg(data);
        })
        .catch((err) => {
          setError(
            err.message || "Failed to load package details from Package Service"
          );
        })
        .finally(() => setLoading(false));
    }
  }, [packageId, initialPackage]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20">
        <LoadingSpinner message="Loading travel package details..." size="lg" />
      </div>
    );
  }

  if (error || !pkg) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 space-y-6">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Packages
        </button>
        <AlertBanner
          type="error"
          title="Package Not Found"
          message={error || "The requested package could not be retrieved."}
        />
      </div>
    );
  }

  const imageUrl = getPackageImageUrl(pkg);
  const isSoldOut = Number(pkg.availableSlots) <= 0;
  const isLowSlots =
    Number(pkg.availableSlots) > 0 && Number(pkg.availableSlots) <= 5;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Back button */}
      <div>
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-slate-700 hover:text-slate-900 text-xs font-semibold hover:bg-slate-50 transition-all shadow-2xs"
        >
          <ArrowLeft className="w-4 h-4" /> Back to all packages
        </button>
      </div>

      {/* Main Grid: Details (Left) + Booking Sidebar (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left: Package Info */}
        <div className="lg:col-span-8 space-y-8">
          {/* Main Visual Header */}
          <div className="relative rounded-3xl overflow-hidden h-80 sm:h-96 w-full shadow-lg bg-slate-100">
            <img
              src={imageUrl}
              alt={pkg.title}
              onError={handleImageError}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent"></div>

            <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-primary-600 text-white shadow-sm">
                  <MapPin className="w-3.5 h-3.5" />
                  {pkg.destination}
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-black/60 backdrop-blur-xs text-white">
                  <Clock className="w-3.5 h-3.5 text-sky-400" />
                  {pkg.duration}
                </span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
                {pkg.title}
              </h1>
            </div>
          </div>

          {/* Quick Info Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-2xl border border-slate-200">
              <span className="text-xs text-slate-400 font-medium block">
                Destination
              </span>
              <span className="text-base font-bold text-slate-900 mt-0.5 block truncate">
                {pkg.destination}
              </span>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200">
              <span className="text-xs text-slate-400 font-medium block">
                Duration
              </span>
              <span className="text-base font-bold text-slate-900 mt-0.5 block">
                {pkg.duration}
              </span>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200">
              <span className="text-xs text-slate-400 font-medium block">
                Price / Person
              </span>
              <span className="text-base font-bold text-primary-700 mt-0.5 block">
                ₹{Number(pkg.price).toLocaleString("en-IN")}
              </span>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200">
              <span className="text-xs text-slate-400 font-medium block">
                Available Slots
              </span>
              <span
                className={`text-base font-bold mt-0.5 block ${
                  isSoldOut
                    ? "text-rose-600"
                    : isLowSlots
                    ? "text-amber-600"
                    : "text-emerald-600"
                }`}
              >
                {pkg.availableSlots} slots
              </span>
            </div>
          </div>

          {/* Overview & Description */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 space-y-4">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              About This Itinerary
            </h2>
            <p className="text-slate-700 leading-relaxed whitespace-pre-line text-base">
              {pkg.description}
            </p>
          </div>

          {/* Microservices Transparency Card */}
          <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl space-y-2 text-xs text-slate-600">
            <div className="flex items-center gap-2 font-bold text-slate-800">
              <ShieldCheck className="w-4 h-4 text-primary-600" />
              <span>Service Integration Details</span>
            </div>
            <p>
              This record is retrieved from MongoDB via the{" "}
              <strong>TravelMate Package Service</strong> (Port 5001) under
              document ID: <code className="font-mono bg-white px-1.5 py-0.5 rounded border text-slate-800">{pkg._id}</code>.
            </p>
          </div>
        </div>

        {/* Right: Booking Summary Sticky Sidebar */}
        <div className="lg:col-span-4">
          <div className="sticky top-28 bg-white rounded-3xl border border-slate-200/90 shadow-xl p-6 sm:p-7 space-y-6">
            <div>
              <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold block">
                Total Price Rate
              </span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-3xl font-black text-slate-900">
                  ₹{Number(pkg.price).toLocaleString("en-IN")}
                </span>
                <span className="text-sm font-medium text-slate-500">
                  / person
                </span>
              </div>
            </div>

            {/* Availability Alert */}
            <div
              className={`p-4 rounded-2xl flex items-start gap-3 text-xs ${
                isSoldOut
                  ? "bg-rose-50 text-rose-800 border border-rose-200"
                  : isLowSlots
                  ? "bg-amber-50 text-amber-800 border border-amber-200"
                  : "bg-emerald-50 text-emerald-800 border border-emerald-200"
              }`}
            >
              <Users className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block">
                  {isSoldOut
                    ? "Trip Fully Booked"
                    : isLowSlots
                    ? "High Demand — Limited Slots"
                    : "Slots Open For Booking"}
                </span>
                <span className="mt-0.5 block">
                  {isSoldOut
                    ? "All capacity for this package has been filled."
                    : `${pkg.availableSlots} spaces currently open.`}
                </span>
              </div>
            </div>

            {/* Booking Action */}
            <button
              onClick={() => onBook(pkg)}
              disabled={isSoldOut}
              className={`w-full py-4 rounded-2xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 ${
                isSoldOut
                  ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                  : "bg-primary-600 hover:bg-primary-700 text-white shadow-primary-500/25 hover:shadow-lg hover:shadow-primary-500/35 active:scale-98"
              }`}
            >
              <Plane className="w-4 h-4" />
              {isSoldOut ? "Package Sold Out" : "Book This Itinerary"}
            </button>

            {/* Assurance Points */}
            <div className="pt-4 border-t border-slate-100 space-y-2.5 text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>Instant reservation confirmed via Booking Service</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>Live capacity checking prevents double booking</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>Manage and cancel bookings anytime</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
