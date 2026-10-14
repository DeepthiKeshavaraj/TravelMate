import React from "react";

export default function PackageCardSkeleton({ count = 3 }) {
  return (
    <>
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs animate-pulse flex flex-col h-[460px]"
        >
          {/* Image skeleton */}
          <div className="h-56 bg-slate-200 relative">
            <div className="absolute top-3 left-3 w-24 h-6 bg-slate-300 rounded-full"></div>
            <div className="absolute bottom-3 right-3 w-20 h-5 bg-slate-300 rounded-lg"></div>
          </div>

          {/* Body skeleton */}
          <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              {/* Title */}
              <div className="h-6 bg-slate-200 rounded-md w-3/4"></div>
              {/* Description lines */}
              <div className="space-y-2 pt-1">
                <div className="h-4 bg-slate-100 rounded-md w-full"></div>
                <div className="h-4 bg-slate-100 rounded-md w-5/6"></div>
              </div>
              {/* Slot pill */}
              <div className="w-28 h-6 bg-slate-100 rounded-lg mt-2"></div>
            </div>

            {/* Bottom action row */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <div className="space-y-1">
                <div className="h-3 bg-slate-200 rounded w-16"></div>
                <div className="h-6 bg-slate-200 rounded w-20"></div>
              </div>
              <div className="h-9 bg-slate-200 rounded-xl w-24"></div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
