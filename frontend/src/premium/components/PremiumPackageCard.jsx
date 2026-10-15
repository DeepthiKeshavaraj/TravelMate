import React from "react";
import { MapPin, Clock, Users, ArrowRight, Sparkles } from "lucide-react";
import { getPackageImageUrl, handleImageError } from "../../utils/imageFallback";

export default function PremiumPackageCard({
  pkg,
  onSelect,
  onBook,
  featured = false,
}) {
  const imageUrl = getPackageImageUrl(pkg);
  const slots = Number(pkg.availableSlots) || 0;
  const isSoldOut = slots <= 0;
  const isLowSlots = slots > 0 && slots <= 5;

  return (
    <div
      className={`group flex flex-col bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-xl hover:border-[#1261A0]/30 hover:-translate-y-1 transition-all duration-300 h-full ${
        featured ? "ring-2 ring-[#21B8D5]/50 shadow-md" : ""
      }`}
    >
      {/* Visual Header */}
      <div className="relative h-56 w-full overflow-hidden bg-slate-100 flex-shrink-0">
        <img
          src={imageUrl}
          alt={pkg.title || "Travel Package"}
          onError={handleImageError}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1730]/80 via-transparent to-transparent"></div>

        {/* Destination Chip */}
        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/95 text-[#14243D] shadow-sm backdrop-blur-xs">
            <MapPin className="w-3.5 h-3.5 text-[#1261A0]" />
            {pkg.destination}
          </span>
        </div>

        {/* Featured Tag (if applicable) */}
        {featured && (
          <div className="absolute top-3 right-3">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-[#21B8D5] text-[#0B1730] shadow-sm">
              <Sparkles className="w-3 h-3" /> Featured
            </span>
          </div>
        )}

        {/* Duration Chip */}
        <div className="absolute bottom-3 right-3">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium bg-[#0B1730]/80 text-white backdrop-blur-xs border border-white/10">
            <Clock className="w-3.5 h-3.5 text-[#21B8D5]" />
            {pkg.duration}
          </span>
        </div>
      </div>

      {/* Content Body */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div className="space-y-3">
          {/* Title */}
          <h3 className="text-lg font-bold text-[#14243D] group-hover:text-[#1261A0] transition-colors line-clamp-1">
            {pkg.title}
          </h3>

          {/* Description */}
          <p className="text-slate-600 text-xs sm:text-sm line-clamp-2 leading-relaxed">
            {pkg.description}
          </p>

          {/* Slots Availability Badge */}
          <div className="pt-1">
            <span
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
                ? `Only ${slots} slots remaining`
                : `${slots} slots available`}
            </span>
          </div>
        </div>

        {/* Footer Actions & Price */}
        <div className="pt-5 mt-5 border-t border-slate-100 flex items-center justify-between">
          <div>
            <span className="text-[11px] text-slate-400 font-medium block">
              Price / person
            </span>
            <div className="text-xl font-black text-[#14243D]">
              ₹{Number(pkg.price).toLocaleString("en-IN")}
            </div>
          </div>

          <div className="flex items-center gap-2">
            {onSelect && (
              <button
                type="button"
                onClick={() => onSelect(pkg)}
                className="px-3 py-2 text-xs font-semibold text-[#1261A0] hover:bg-slate-100 rounded-xl transition-colors"
              >
                Details
              </button>
            )}

            <button
              type="button"
              onClick={() => onBook(pkg)}
              disabled={isSoldOut}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-xs ${
                isSoldOut
                  ? "bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200"
                  : "bg-[#1261A0] hover:bg-[#0E4D80] text-white hover:shadow-md hover:shadow-[#1261A0]/25 active:scale-95"
              }`}
            >
              {isSoldOut ? "Full" : "Book Now"}
              {!isSoldOut && <ArrowRight className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
