import React from "react";
import { MapPin, Clock, Users, ArrowRight, Sparkles } from "lucide-react";
import { getPackageImageUrl, handleImageError } from "../utils/imageFallback";

export default function PackageCard({
  pkg,
  onSelect,
  onBook,
  featured = false,
}) {
  const imageUrl = getPackageImageUrl(pkg);
  const isSoldOut = Number(pkg.availableSlots) <= 0;
  const isLowSlots = Number(pkg.availableSlots) > 0 && Number(pkg.availableSlots) <= 5;

  return (
    <div
      className={`group flex flex-col bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-xl hover:border-primary-200 hover:-translate-y-1 transition-all duration-300 ${
        featured ? "ring-2 ring-primary-500/20" : ""
      }`}
    >
      {/* Image Header with Badges */}
      <div className="relative h-56 w-full overflow-hidden bg-slate-100">
        <img
          src={imageUrl}
          alt={pkg.title || "Travel Package"}
          onError={handleImageError}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent"></div>

        {/* Destination Chip */}
        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/95 text-slate-800 shadow-sm backdrop-blur-xs">
            <MapPin className="w-3.5 h-3.5 text-primary-600" />
            {pkg.destination}
          </span>
        </div>

        {/* Featured Tag (if applicable) */}
        {featured && (
          <div className="absolute top-3 right-3">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/95 text-white shadow-sm">
              <Sparkles className="w-3 h-3" /> Featured
            </span>
          </div>
        )}

        {/* Duration Chip (bottom right of image) */}
        <div className="absolute bottom-3 right-3">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium bg-black/60 text-white backdrop-blur-sm">
            <Clock className="w-3.5 h-3.5 text-sky-400" />
            {pkg.duration}
          </span>
        </div>
      </div>

      {/* Content Body */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div className="space-y-3">
          {/* Title */}
          <h3 className="text-xl font-bold text-slate-900 group-hover:text-primary-600 transition-colors line-clamp-1">
            {pkg.title}
          </h3>

          {/* Description */}
          <p className="text-slate-600 text-sm line-clamp-2 leading-relaxed">
            {pkg.description}
          </p>

          {/* Slots Availability Badge */}
          <div className="pt-1 flex items-center gap-2">
            <div
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold ${
                isSoldOut
                  ? "bg-rose-50 text-rose-700 border border-rose-200"
                  : isLowSlots
                  ? "bg-amber-50 text-amber-700 border border-amber-200"
                  : "bg-emerald-50 text-emerald-700 border border-emerald-200"
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              {isSoldOut
                ? "Sold Out"
                : isLowSlots
                ? `Only ${pkg.availableSlots} slots left!`
                : `${pkg.availableSlots} slots available`}
            </div>
          </div>
        </div>

        {/* Footer Actions & Price */}
        <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 font-medium block">
              Price per person
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-black text-slate-900">
                ₹{Number(pkg.price).toLocaleString("en-IN")}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {onSelect && (
              <button
                onClick={() => onSelect(pkg)}
                className="px-3 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors"
              >
                Details
              </button>
            )}

            <button
              onClick={() => onBook(pkg)}
              disabled={isSoldOut}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-xs ${
                isSoldOut
                  ? "bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200"
                  : "bg-primary-600 hover:bg-primary-700 text-white hover:shadow-md hover:shadow-primary-500/20 active:scale-95"
              }`}
            >
              {isSoldOut ? "Unavailable" : "Book Now"}
              {!isSoldOut && <ArrowRight className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
