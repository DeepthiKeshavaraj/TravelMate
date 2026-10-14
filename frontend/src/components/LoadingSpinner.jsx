import React from "react";
import { Loader2 } from "lucide-react";

export default function LoadingSpinner({
  message = "Loading...",
  size = "md",
  className = "",
}) {
  const sizeMap = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  return (
    <div
      className={`flex flex-col items-center justify-center p-8 text-slate-500 space-y-3 ${className}`}
      role="status"
      aria-live="polite"
    >
      <Loader2
        className={`${sizeMap[size] || sizeMap.md} animate-spin text-primary-600`}
      />
      {message && (
        <p className="text-sm font-medium text-slate-600 tracking-wide">
          {message}
        </p>
      )}
      <span className="sr-only">Loading</span>
    </div>
  );
}
