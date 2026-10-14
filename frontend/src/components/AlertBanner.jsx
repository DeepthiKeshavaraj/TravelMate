import React from "react";
import { AlertCircle, CheckCircle2, Info, AlertTriangle, X } from "lucide-react";

export default function AlertBanner({
  type = "info",
  title,
  message,
  onClose,
  actionButton,
  className = "",
}) {
  const styles = {
    info: {
      bg: "bg-sky-50 border-sky-200 text-sky-900",
      icon: <Info className="w-5 h-5 text-sky-600 flex-shrink-0" />,
    },
    success: {
      bg: "bg-emerald-50 border-emerald-200 text-emerald-900",
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />,
    },
    warning: {
      bg: "bg-amber-50 border-amber-200 text-amber-900",
      icon: <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0" />,
    },
    error: {
      bg: "bg-rose-50 border-rose-200 text-rose-900",
      icon: <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />,
    },
  };

  const current = styles[type] || styles.info;

  return (
    <div
      className={`border rounded-xl p-4 flex items-start gap-3 shadow-sm transition-all ${current.bg} ${className}`}
      role="alert"
    >
      <div className="pt-0.5">{current.icon}</div>
      <div className="flex-1 text-sm">
        {title && <h4 className="font-semibold mb-0.5">{title}</h4>}
        {message && <p className="text-slate-700 leading-relaxed">{message}</p>}
        {actionButton && <div className="mt-2">{actionButton}</div>}
      </div>
      {onClose && (
        <button
          onClick={onClose}
          type="button"
          aria-label="Close notification"
          className="text-slate-400 hover:text-slate-600 rounded-lg p-1 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
