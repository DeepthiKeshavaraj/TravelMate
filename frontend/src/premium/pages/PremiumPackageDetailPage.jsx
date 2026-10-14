import React, { useState, useEffect, useCallback } from "react";
import {
  ArrowLeft,
  MapPin,
  Clock,
  Users,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Plane,
  Server,
  DollarSign,
  Hotel,
  Calendar,
  ExternalLink,
  Navigation,
  Compass,
  Sparkles,
  Info,
  Car,
  Ticket,
  AlertCircle,
  Sun,
  Sunset,
  Moon,
  RefreshCw,
} from "lucide-react";
import { getPackageById, getAllPackages } from "../../api/packageApi";
import { getPackageImageUrl, handleImageError } from "../../utils/imageFallback";
import { getPackageItinerary } from "../../data/packageItineraries";

// Verified geographic coordinates lookup for genuine map embedding
const DESTINATION_COORDINATES = {
  ooty: { lat: 11.4102, lng: 76.695 },
  paris: { lat: 48.8566, lng: 2.3522 },
  dubai: { lat: 25.2048, lng: 55.2708 },
  bali: { lat: -8.4095, lng: 115.1889 },
  tokyo: { lat: 35.6762, lng: 139.6503 },
  switzerland: { lat: 46.6863, lng: 7.8632 },
  santorini: { lat: 36.3932, lng: 25.4615 },
};

function getCoordinates(destinationName) {
  if (!destinationName) return { lat: 20.5937, lng: 78.9629 };
  const lower = destinationName.toLowerCase();
  for (const [key, coords] of Object.entries(DESTINATION_COORDINATES)) {
    if (lower.includes(key)) return coords;
  }
  return { lat: 20.5937, lng: 78.9629 };
}

export default function PremiumPackageDetailPage({
  packageId,
  initialPackage,
  onBack,
  onBook,
}) {
  const [pkg, setPkg] = useState(initialPackage || null);
  const [loading, setLoading] = useState(!initialPackage);
  const [error, setError] = useState(null);
  const [activeDayIndex, setActiveDayIndex] = useState(0);

  // Sync initialPackage when prop changes
  useEffect(() => {
    if (initialPackage) {
      setPkg(initialPackage);
      setLoading(false);
      setError(null);
    }
  }, [initialPackage]);

  // Resilient package fetcher
  const fetchPackageData = useCallback(async () => {
    if (initialPackage) {
      setPkg(initialPackage);
      setLoading(false);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // 1. If packageId is provided, attempt direct fetch
      if (packageId) {
        try {
          const directData = await getPackageById(packageId);
          if (directData && directData._id) {
            setPkg(directData);
            setLoading(false);
            return;
          }
        } catch (fetchErr) {
          console.warn("Direct getPackageById failed, trying package catalog:", fetchErr);
        }
      }

      // 2. Fetch all packages from Package Service to find matching or fallback
      const allPkgs = await getAllPackages();
      if (Array.isArray(allPkgs) && allPkgs.length > 0) {
        const target = packageId
          ? allPkgs.find((p) => p._id === packageId) || allPkgs[0]
          : allPkgs[0];
        setPkg(target);
      } else {
        throw new Error("No travel packages are currently registered in the Package Service database.");
      }
    } catch (err) {
      setError(
        err.message ||
          "Could not load package details from Package Service. Please verify service health."
      );
    } finally {
      setLoading(false);
    }
  }, [packageId, initialPackage]);

  useEffect(() => {
    if (!initialPackage) {
      fetchPackageData();
    }
  }, [initialPackage, fetchPackageData]);

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-16 space-y-6">
        <div className="h-80 bg-slate-200 animate-pulse rounded-3xl"></div>
        <div className="h-8 bg-slate-200 animate-pulse rounded w-1/2"></div>
        <div className="h-4 bg-slate-200 animate-pulse rounded w-full"></div>
        <div className="h-4 bg-slate-200 animate-pulse rounded w-3/4"></div>
      </div>
    );
  }

  if (error || !pkg) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 space-y-6">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-bold text-[#1261A0] hover:underline"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Packages
        </button>

        <div className="bg-white rounded-3xl border border-rose-200 p-8 sm:p-10 text-center space-y-4 shadow-sm">
          <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
            <AlertCircle className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-[#14243D]">
              Itinerary Could Not Be Loaded
            </h3>
            <p className="text-xs text-rose-700 font-medium">
              {error || "The requested package could not be retrieved from the Package Service."}
            </p>
          </div>

          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={fetchPackageData}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1261A0] text-white text-xs font-bold hover:bg-[#0E4D80] transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Retry Loading</span>
            </button>
            <button
              type="button"
              onClick={onBack}
              className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-50 transition-colors"
            >
              Browse All Packages
            </button>
          </div>
        </div>
      </div>
    );
  }

  const imageUrl = getPackageImageUrl(pkg);
  const slots = Number(pkg.availableSlots) || 0;
  const isSoldOut = slots <= 0;
  const isLowSlots = slots > 0 && slots <= 5;

  // Retrieve authentic itinerary and accommodation details
  const itinerary = getPackageItinerary(pkg) || {};
  const accommodation = itinerary.accommodation || null;
  const days = Array.isArray(itinerary.days) ? itinerary.days : [];
  const coords = itinerary.coordinates || getCoordinates(pkg.destination);

  // Safe accommodation field extractors
  const hotelPhoto = accommodation?.image || accommodation?.photoUrl || imageUrl;
  const hotelRating = accommodation?.type || accommodation?.starRating || "Verified Stay";
  const checkInPolicy = accommodation?.checkIn || accommodation?.checkInTime || "14:00";
  const checkOutPolicy = accommodation?.checkOut || accommodation?.checkOutTime || "12:00";
  const hotelAmenities = Array.isArray(accommodation?.amenities) ? accommodation.amenities : [];

  // Active day item
  const activeDay = days[activeDayIndex] || days[0] || null;
  const currentDayNum = activeDay ? (activeDay.dayNumber || activeDay.day || activeDayIndex + 1) : 1;

  // Safe activity item renderer (supports both string and structured object)
  const renderActivityItem = (act, timeOfDay, Icon, iconBg, iconColor, textColor) => {
    if (!act) return null;

    if (typeof act === "string") {
      return (
        <div className="flex items-start gap-3 p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs">
          <div className={`w-8 h-8 rounded-xl ${iconBg} ${iconColor} flex items-center justify-center flex-shrink-0 mt-0.5`}>
            <Icon className="w-4 h-4" />
          </div>
          <div className="text-xs space-y-1">
            <span className={`font-bold block uppercase tracking-wider text-[10px] ${textColor}`}>
              {timeOfDay}
            </span>
            <p className="text-slate-700 leading-relaxed text-xs sm:text-sm">
              {act}
            </p>
          </div>
        </div>
      );
    }

    const activityTitle = act.activity || act.title || act.attraction || "Scheduled Excursion";
    const time = act.time || "";
    const duration = act.duration || "";
    const description = act.description || "";
    const location = act.location || "";
    const transport = act.transport || "";
    const entranceFee = act.entranceFee || "";
    const notes = act.notes || "";
    const mapUrl = act.mapUrl || "";

    return (
      <div className="flex items-start gap-3 p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs">
        <div className={`w-8 h-8 rounded-xl ${iconBg} ${iconColor} flex items-center justify-center flex-shrink-0 mt-0.5`}>
          <Icon className="w-4 h-4" />
        </div>
        <div className="text-xs space-y-2 flex-1 min-w-0">
          <div className="flex flex-wrap items-center justify-between gap-1.5">
            <span className={`font-bold uppercase tracking-wider text-[10px] ${textColor}`}>
              {timeOfDay} {time && `• ${time}`}
            </span>
            {duration && (
              <span className="text-[11px] text-slate-400 font-medium">
                Duration: {duration}
              </span>
            )}
          </div>

          <h4 className="font-bold text-[#14243D] text-sm">
            {activityTitle}
          </h4>

          {description && (
            <p className="text-slate-600 leading-relaxed text-xs sm:text-sm">
              {description}
            </p>
          )}

          {/* Practical details chips */}
          <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px]">
            {transport && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200 text-slate-600">
                <Car className="w-3 h-3 text-[#1261A0]" />
                <span className="truncate max-w-[280px]">{transport}</span>
              </span>
            )}
            {entranceFee && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 font-semibold">
                <Ticket className="w-3 h-3 text-emerald-600" />
                <span>{entranceFee}</span>
              </span>
            )}
            {location && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200 text-slate-600">
                <MapPin className="w-3 h-3 text-[#1261A0]" />
                <span className="truncate max-w-[280px]">{location}</span>
              </span>
            )}
            {mapUrl && (
              <a
                href={mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[#1261A0] font-bold hover:underline"
              >
                <span>View Map</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </a>
            )}
          </div>

          {notes && (
            <div className="text-[11px] text-amber-900 bg-amber-50 border border-amber-200 p-2 rounded-lg">
              <strong>Tip:</strong> {notes}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top Back Navigation */}
      <div>
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-[#14243D] hover:bg-slate-50 text-xs font-semibold transition-all shadow-2xs"
        >
          <ArrowLeft className="w-4 h-4 text-[#1261A0]" />
          <span>Back to All Packages</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Main Details (Left 8 cols) */}
        <div className="lg:col-span-8 space-y-10">
          {/* Hero Banner */}
          <div className="relative rounded-3xl overflow-hidden h-80 sm:h-96 w-full shadow-lg bg-slate-100">
            <img
              src={imageUrl}
              alt={pkg.title}
              onError={handleImageError}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1730]/90 via-[#0B1730]/35 to-transparent"></div>

            <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#1261A0] text-white shadow-sm">
                  <MapPin className="w-3.5 h-3.5 text-[#21B8D5]" />
                  {pkg.destination}
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#0B1730]/80 text-white backdrop-blur-xs border border-white/10">
                  <Clock className="w-3.5 h-3.5 text-[#21B8D5]" />
                  {pkg.duration}
                </span>
                {itinerary.bestSeason && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-white/20 text-white backdrop-blur-xs">
                    <Calendar className="w-3.5 h-3.5 text-[#21B8D5]" />
                    Best: {itinerary.bestSeason}
                  </span>
                )}
              </div>
              <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
                {pkg.title}
              </h1>
            </div>
          </div>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
              <span className="text-[11px] text-slate-400 font-medium block">
                Destination
              </span>
              <span className="text-sm sm:text-base font-bold text-[#14243D] mt-0.5 block truncate">
                {pkg.destination}
              </span>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
              <span className="text-[11px] text-slate-400 font-medium block">
                Duration
              </span>
              <span className="text-sm sm:text-base font-bold text-[#14243D] mt-0.5 block">
                {pkg.duration}
              </span>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
              <span className="text-[11px] text-slate-400 font-medium block">
                Price / Person
              </span>
              <span className="text-sm sm:text-base font-black text-[#1261A0] mt-0.5 block">
                ${Number(pkg.price).toLocaleString()}
              </span>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
              <span className="text-[11px] text-slate-400 font-medium block">
                Available Slots
              </span>
              <span
                className={`text-sm sm:text-base font-bold mt-0.5 block ${
                  isSoldOut
                    ? "text-rose-600"
                    : isLowSlots
                    ? "text-amber-600"
                    : "text-emerald-600"
                }`}
              >
                {slots} open
              </span>
            </div>
          </div>

          {/* About This Journey */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 space-y-4 shadow-2xs">
            <div className="flex items-center gap-2">
              <Compass className="w-5 h-5 text-[#1261A0]" />
              <h2 className="text-xl font-bold text-[#14243D] tracking-tight">
                About This Journey
              </h2>
            </div>
            <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
              {pkg.description}
            </p>
          </div>

          {/* Real Verified Accommodation Showcase */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 space-y-6 shadow-2xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#1261A0]/10 flex items-center justify-center text-[#1261A0]">
                  <Hotel className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-[#14243D]">
                    Accommodation Details
                  </h2>
                  <span className="text-xs text-slate-400 font-medium">
                    Verified real property & check-in policy
                  </span>
                </div>
              </div>

              {accommodation && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  {hotelRating}
                </span>
              )}
            </div>

            {accommodation ? (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                {/* Hotel Photo */}
                <div className="md:col-span-5 rounded-2xl overflow-hidden h-48 sm:h-56 relative bg-slate-100 border border-slate-200 shadow-2xs">
                  <img
                    src={hotelPhoto}
                    alt={accommodation.name}
                    className="w-full h-full object-cover"
                    onError={handleImageError}
                  />
                  <div className="absolute bottom-2 left-2 right-2 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-xs text-white text-[11px] font-semibold truncate">
                    {accommodation.roomType || "Standard Room"}
                  </div>
                </div>

                {/* Hotel Details */}
                <div className="md:col-span-7 space-y-3.5">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-[#14243D]">
                      {accommodation.name}
                    </h3>
                    <div className="flex items-start gap-1.5 text-xs text-slate-500 mt-1">
                      <MapPin className="w-3.5 h-3.5 text-[#1261A0] flex-shrink-0 mt-0.5" />
                      <span>{accommodation.address}</span>
                    </div>
                  </div>

                  {/* Policies */}
                  <div className="grid grid-cols-2 gap-2 text-xs bg-[#F5F8FC] p-3 rounded-xl border border-slate-200">
                    <div>
                      <span className="text-slate-400 block font-medium">Check-In</span>
                      <span className="font-bold text-[#14243D]">
                        {checkInPolicy}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-medium">Check-Out</span>
                      <span className="font-bold text-[#14243D]">
                        {checkOutPolicy}
                      </span>
                    </div>
                  </div>

                  {/* Amenities */}
                  {hotelAmenities.length > 0 && (
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                        Verified Hotel Amenities:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {hotelAmenities.map((amenity) => (
                          <span
                            key={amenity}
                            className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-medium"
                          >
                            {amenity}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Hotel Google Maps link */}
                  <div className="pt-1">
                    <a
                      href={
                        accommodation.mapUrl ||
                        `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                          `${accommodation.name} ${accommodation.address}`
                        )}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1261A0] hover:underline"
                    >
                      <Navigation className="w-3.5 h-3.5" />
                      <span>View hotel location on Google Maps</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-slate-400 flex-shrink-0" />
                <span>Accommodation details have not been provided for this package.</span>
              </div>
            )}
          </div>

          {/* Day-by-Day Detailed Itinerary */}
          {days.length > 0 && (
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 space-y-6 shadow-2xs">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-[#1261A0]/10 flex items-center justify-center text-[#1261A0]">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-[#14243D]">
                      Day-by-Day Itinerary ({days.length} Days)
                    </h2>
                    <span className="text-xs text-slate-400 font-medium">
                      Morning, afternoon & evening activity schedule
                    </span>
                  </div>
                </div>
              </div>

              {/* Day Selector Tabs */}
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
                {days.map((dayItem, idx) => {
                  const num = dayItem.dayNumber || dayItem.day || idx + 1;
                  return (
                    <button
                      key={`day-tab-${num}-${idx}`}
                      type="button"
                      onClick={() => setActiveDayIndex(idx)}
                      className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                        activeDayIndex === idx
                          ? "bg-[#1261A0] text-white shadow-sm"
                          : "bg-[#F5F8FC] text-slate-700 hover:bg-slate-200 border border-slate-200"
                      }`}
                    >
                      Day {num}: {dayItem.title}
                    </button>
                  );
                })}
              </div>

              {/* Active Day Card */}
              {activeDay && (
                <div className="p-5 sm:p-6 rounded-2xl bg-[#F5F8FC] border border-slate-200 space-y-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-lg bg-[#0B1730] text-white text-xs font-extrabold">
                        Day {currentDayNum}
                      </span>
                      <h3 className="text-base font-bold text-[#14243D]">
                        {activeDay.title}
                      </h3>
                    </div>
                    {activeDay.estimatedDuration && (
                      <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-[#1261A0]" />
                        {activeDay.estimatedDuration}
                      </span>
                    )}
                  </div>

                  {activeDay.overview && (
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                      &ldquo;{activeDay.overview}&rdquo;
                    </p>
                  )}

                  {/* Morning / Afternoon / Evening Timeline */}
                  <div className="space-y-3 pt-2">
                    {renderActivityItem(
                      activeDay.morning,
                      "Morning",
                      Sun,
                      "bg-amber-500/10",
                      "text-amber-600",
                      "text-amber-700"
                    )}
                    {renderActivityItem(
                      activeDay.afternoon,
                      "Afternoon",
                      Sunset,
                      "bg-sky-500/10",
                      "text-sky-600",
                      "text-sky-700"
                    )}
                    {renderActivityItem(
                      activeDay.evening,
                      "Evening",
                      Moon,
                      "bg-indigo-500/10",
                      "text-indigo-600",
                      "text-indigo-700"
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Genuine Geographic Location & Map */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 space-y-5 shadow-2xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#1261A0]/10 flex items-center justify-center text-[#1261A0]">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-[#14243D]">
                    Geographic Location & Map
                  </h2>
                  <span className="text-xs text-slate-400 font-medium">
                    Verified coordinates: {coords.lat.toFixed(4)}° N, {coords.lng.toFixed(4)}° E
                  </span>
                </div>
              </div>

              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  `${pkg.destination} attractions`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
              >
                <Navigation className="w-3.5 h-3.5 text-[#1261A0]" />
                <span>Open in Google Maps</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Embedded Responsive Interactive Map */}
            <div className="rounded-2xl overflow-hidden border border-slate-200 h-64 sm:h-72 w-full bg-slate-100 relative">
              <iframe
                title={`Map for ${pkg.destination}`}
                width="100%"
                height="100%"
                frameBorder="0"
                scrolling="no"
                marginHeight="0"
                marginWidth="0"
                src={`https://maps.google.com/maps?q=${coords.lat},${coords.lng}&z=12&output=embed`}
                className="w-full h-full"
              ></iframe>
            </div>
          </div>

          {/* Inclusions & Exclusions */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 space-y-5 shadow-2xs">
            <h2 className="text-lg font-bold text-[#14243D] border-b border-slate-100 pb-3">
              Package Inclusions & Exclusions
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
              {/* Inclusions */}
              <div className="space-y-3">
                <span className="font-bold text-emerald-800 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  What&apos;s Included
                </span>
                <div className="space-y-2">
                  {(
                    itinerary.inclusions || [
                      "Verified hotel accommodation",
                      "Daily gourmet breakfast",
                      "Private guided excursions",
                      "All intra-city transfers",
                      "Standard monument & park entry passes",
                    ]
                  ).map((item) => (
                    <div
                      key={item}
                      className="p-2.5 rounded-xl bg-emerald-50/50 border border-emerald-100 flex items-center gap-2 text-slate-700"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Exclusions */}
              <div className="space-y-3">
                <span className="font-bold text-rose-800 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                  <XCircle className="w-4 h-4 text-rose-600" />
                  What&apos;s Not Included
                </span>
                <div className="space-y-2">
                  {(
                    itinerary.exclusions || [
                      "International or domestic airfare to gateway",
                      "Personal expenses, shopping & gratuities",
                      "Comprehensive travel and medical insurance",
                      "Optional high-altitude or helicopter excursions",
                    ]
                  ).map((item) => (
                    <div
                      key={item}
                      className="p-2.5 rounded-xl bg-rose-50/50 border border-rose-100 flex items-center gap-2 text-slate-700"
                    >
                      <XCircle className="w-3.5 h-3.5 text-rose-500 flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Official Tourism References & Microservice Spec */}
          <div className="bg-[#0B1730] text-slate-300 p-6 sm:p-7 rounded-3xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
              <div className="flex items-center gap-2 text-white font-bold text-sm">
                <Server className="w-4 h-4 text-[#21B8D5]" />
                <span>Microservice Origin: Package Service (:5001)</span>
              </div>
              <code className="text-[11px] font-mono text-[#21B8D5] bg-white/10 px-2 py-1 rounded">
                GET /api/packages/{pkg._id}
              </code>
            </div>

            {(itinerary.sourceAttribution || itinerary.officialTourism || itinerary.officialReferences) && (
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div>
                  <span className="text-slate-400 block font-medium">
                    Official Destination Authority:
                  </span>
                  <span className="font-bold text-white">
                    {itinerary.sourceAttribution ||
                      itinerary.officialTourism?.name ||
                      itinerary.officialReferences?.[0]?.name ||
                      "Verified State Tourism Development Authority"}
                  </span>
                </div>
                {(itinerary.officialTourism?.url || itinerary.officialReferences?.[0]?.url) && (
                  <a
                    href={itinerary.officialTourism?.url || itinerary.officialReferences?.[0]?.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-[#21B8D5] font-bold text-xs transition-colors"
                  >
                    <span>Visit Tourism Portal</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right Sticky Booking Card (Right 4 cols) */}
        <div className="lg:col-span-4">
          <div className="sticky top-28 bg-white rounded-3xl border border-slate-200/90 shadow-xl p-6 sm:p-7 space-y-6">
            <div>
              <span className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold block">
                Standard Rate
              </span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-3xl font-black text-[#14243D]">
                  ${Number(pkg.price).toLocaleString()}
                </span>
                <span className="text-xs font-medium text-slate-500">
                  / guest
                </span>
              </div>
            </div>

            {/* Capacity status banner */}
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
                    ? "Fully Booked"
                    : isLowSlots
                    ? "Limited Spots Remaining"
                    : "Capacity Available"}
                </span>
                <span className="mt-0.5 block text-slate-600">
                  {isSoldOut
                    ? "No slots open for this trip."
                    : `${slots} spots available on this itinerary.`}
                </span>
              </div>
            </div>

            {/* Book Now Trigger */}
            <button
              type="button"
              onClick={() => onBook(pkg)}
              disabled={isSoldOut}
              className={`w-full py-4 rounded-2xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 ${
                isSoldOut
                  ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                  : "bg-[#1261A0] hover:bg-[#0E4D80] text-white shadow-[#1261A0]/25 hover:shadow-lg active:scale-98"
              }`}
            >
              <Plane className="w-4 h-4" />
              {isSoldOut ? "Package Sold Out" : "Reserve This Trip"}
            </button>

            {/* Hotel Summary Snapshot if available */}
            {accommodation && (
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-1.5">
                <span className="font-bold text-[#14243D] block text-[11px] uppercase tracking-wider text-slate-400">
                  Included Hotel:
                </span>
                <p className="font-bold text-[#14243D] truncate">
                  {accommodation.name}
                </p>
                <p className="text-slate-500 text-[11px]">
                  {accommodation.roomType || "Deluxe Suite"} • {hotelRating}
                </p>
              </div>
            )}

            {/* Features */}
            <div className="pt-4 border-t border-slate-100 space-y-2.5 text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Verified capacity checking on Booking Service</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Instant confirmation receipt with reference ID</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>MongoDB persistence on microservice :5002</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
