import React from "react";
import { MapPin, ArrowRight } from "lucide-react";

export default function DestinationCard({
  name,
  country,
  image,
  tagline,
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative h-72 w-full rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-left focus:outline-none focus:ring-2 focus:ring-[#21B8D5]"
    >
      <img
        src={image}
        alt={name}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0B1730]/90 via-[#0B1730]/40 to-transparent"></div>

      <div className="absolute top-3 left-3">
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-white/90 text-[#14243D] backdrop-blur-xs shadow-xs">
          <MapPin className="w-3 h-3 text-[#1261A0]" />
          {country}
        </span>
      </div>

      <div className="absolute bottom-4 left-4 right-4 text-white">
        <h4 className="text-xl font-bold tracking-tight group-hover:text-[#21B8D5] transition-colors">
          {name}
        </h4>
        <p className="text-xs text-slate-300 line-clamp-1 mt-0.5">
          {tagline}
        </p>

        <div className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-[#21B8D5] group-hover:translate-x-1 transition-transform">
          <span>Explore Trips</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </button>
  );
}
