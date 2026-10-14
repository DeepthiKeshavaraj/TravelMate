import React, { useState, useEffect } from "react";
import {
  Server,
  Database,
  ArrowRight,
  ArrowLeftRight,
  ShieldCheck,
  Activity,
  RefreshCw,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Terminal,
  Cpu,
  Globe,
  Radio,
} from "lucide-react";
import { checkPackageServiceHealth } from "../../api/packageApi";
import { checkBookingServiceHealth } from "../../api/bookingApi";

export default function ArchitectureView() {
  const [healthStatus, setHealthStatus] = useState({
    packageService: { state: "checking", latency: null, raw: null },
    bookingService: { state: "checking", latency: null, raw: null },
    lastChecked: null,
  });
  const [isProbing, setIsProbing] = useState(false);

  const probeServices = async () => {
    setIsProbing(true);
    setHealthStatus((prev) => ({
      ...prev,
      packageService: { ...prev.packageService, state: "checking" },
      bookingService: { ...prev.bookingService, state: "checking" },
    }));

    // Probe Package Service
    const t0 = performance.now();
    let pkgState = "offline";
    let pkgRaw = null;
    let pkgLatency = null;
    try {
      const res = await checkPackageServiceHealth();
      pkgLatency = Math.round(performance.now() - t0);
      if (res && res.status === "ok") {
        pkgState = "online";
        pkgRaw = res;
      } else {
        pkgRaw = res;
      }
    } catch (e) {
      pkgState = "offline";
      pkgRaw = { error: e.message };
    }

    // Probe Booking Service
    const t1 = performance.now();
    let bkState = "offline";
    let bkRaw = null;
    let bkLatency = null;
    try {
      const res = await checkBookingServiceHealth();
      bkLatency = Math.round(performance.now() - t1);
      if (res && res.success === true) {
        bkState = "online";
        bkRaw = res;
      } else {
        bkRaw = res;
      }
    } catch (e) {
      bkState = "offline";
      bkRaw = { error: e.message };
    }

    setHealthStatus({
      packageService: { state: pkgState, latency: pkgLatency, raw: pkgRaw },
      bookingService: { state: bkState, latency: bkLatency, raw: bkRaw },
      lastChecked: new Date(),
    });
    setIsProbing(false);
  };

  useEffect(() => {
    probeServices();
  }, []);

  const renderBadge = (state) => {
    switch (state) {
      case "online":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            Online
          </span>
        );
      case "offline":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800 border border-rose-200">
            <XCircle className="w-3.5 h-3.5 text-rose-600" />
            Offline / Unreachable
          </span>
        );
      case "checking":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-200">
            <RefreshCw className="w-3.5 h-3.5 text-amber-600 animate-spin" />
            Probing...
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-800 border border-slate-200">
            <HelpCircle className="w-3.5 h-3.5 text-slate-600" />
            Unknown
          </span>
        );
    }
  };

  return (
    <div className="space-y-12">
      {/* Top Banner & Live Probe Action */}
      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1261A0] mb-1">
            <Activity className="w-4 h-4 text-[#21B8D5]" />
            <span>Full-Stack Microservices Architecture</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#14243D] tracking-tight">
            System Topology & Live Telemetry
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
            Real-time status checks directly queried against the backend{" "}
            <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs font-mono text-[#14243D]">/health</code>{" "}
            REST endpoints.
          </p>
        </div>

        <button
          type="button"
          onClick={probeServices}
          disabled={isProbing}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1261A0] hover:bg-[#0E4D80] text-white font-bold text-xs shadow-md shadow-[#1261A0]/20 active:scale-95 transition-all self-start md:self-auto"
        >
          <RefreshCw className={`w-4 h-4 ${isProbing ? "animate-spin" : ""}`} />
          <span>Probe Health Now</span>
        </button>
      </div>

      {/* Live Health Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Package Service Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-sky-50 text-[#1261A0] flex items-center justify-center font-bold">
                <Server className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-[#14243D]">
                  Package Microservice
                </h3>
                <span className="text-[11px] text-slate-400 font-mono">
                  http://localhost:5001
                </span>
              </div>
            </div>
            {renderBadge(healthStatus.packageService.state)}
          </div>

          <div className="bg-[#F5F8FC] rounded-xl p-4 text-xs space-y-2 border border-slate-100">
            <div className="flex justify-between">
              <span className="text-slate-500">Service Responsibility</span>
              <span className="font-semibold text-[#14243D]">
                Itinerary & Catalog Management
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Database Binding</span>
              <span className="font-mono text-slate-700">
                MongoDB (travelPackage schema)
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Health Endpoint</span>
              <span className="font-mono text-[#1261A0]">GET /health</span>
            </div>
            {healthStatus.packageService.latency !== null && (
              <div className="flex justify-between">
                <span className="text-slate-500">Probe Latency</span>
                <span className="font-mono text-emerald-600 font-bold">
                  {healthStatus.packageService.latency} ms
                </span>
              </div>
            )}
          </div>

          {healthStatus.packageService.raw && (
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400">
                Raw Health Response:
              </span>
              <pre className="bg-[#0B1730] text-[#21B8D5] p-2.5 rounded-lg text-[11px] font-mono overflow-x-auto">
                {JSON.stringify(healthStatus.packageService.raw, null, 2)}
              </pre>
            </div>
          )}
        </div>

        {/* Booking Service Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                <Server className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-[#14243D]">
                  Booking Microservice
                </h3>
                <span className="text-[11px] text-slate-400 font-mono">
                  http://localhost:5002
                </span>
              </div>
            </div>
            {renderBadge(healthStatus.bookingService.state)}
          </div>

          <div className="bg-[#F5F8FC] rounded-xl p-4 text-xs space-y-2 border border-slate-100">
            <div className="flex justify-between">
              <span className="text-slate-500">Service Responsibility</span>
              <span className="font-semibold text-[#14243D]">
                Reservation State & Capacity Sync
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Database Binding</span>
              <span className="font-mono text-slate-700">
                MongoDB (booking schema)
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Health Endpoint</span>
              <span className="font-mono text-[#1261A0]">GET /health</span>
            </div>
            {healthStatus.bookingService.latency !== null && (
              <div className="flex justify-between">
                <span className="text-slate-500">Probe Latency</span>
                <span className="font-mono text-emerald-600 font-bold">
                  {healthStatus.bookingService.latency} ms
                </span>
              </div>
            )}
          </div>

          {healthStatus.bookingService.raw && (
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400">
                Raw Health Response:
              </span>
              <pre className="bg-[#0B1730] text-[#21B8D5] p-2.5 rounded-lg text-[11px] font-mono overflow-x-auto">
                {JSON.stringify(healthStatus.bookingService.raw, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>

      {/* Visual System Architecture Diagram */}
      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-8">
        <div className="flex items-center gap-2">
          <Cpu className="w-5 h-5 text-[#1261A0]" />
          <h3 className="text-xl font-bold text-[#14243D]">
            Microservice Inter-Communication Diagram
          </h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative">
          {/* Frontend Box */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-[#0B1730] to-[#1261A0] text-white space-y-3 shadow-md">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#21B8D5]">
                Client Layer
              </span>
              <Globe className="w-4 h-4 text-[#21B8D5]" />
            </div>
            <h4 className="text-lg font-bold">React 18 + Vite SPA</h4>
            <p className="text-xs text-slate-200 leading-relaxed">
              Consumes REST endpoints on ports 5001 and 5002 via CORS. Manages
              state, client validation, review-before-submit, and visual fallbacks.
            </p>
            <div className="text-[11px] font-mono bg-black/30 p-2 rounded border border-white/10">
              Port: 5173 (Vite Server)
            </div>
          </div>

          {/* Booking Service Box */}
          <div className="p-6 rounded-2xl bg-slate-50 border-2 border-emerald-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                Microservice Layer
              </span>
              <Server className="w-4 h-4 text-emerald-600" />
            </div>
            <h4 className="text-lg font-bold text-[#14243D]">Booking Service</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Handles <code className="font-mono text-slate-800">POST /api/bookings</code>.
              Validates party size (1–20), dates, calls Package Service to verify
              price and slot capacity.
            </p>
            <div className="text-[11px] font-mono bg-white p-2 rounded border border-slate-200 text-slate-800">
              Port: 5002 | packageClient.js
            </div>
          </div>

          {/* Package Service Box */}
          <div className="p-6 rounded-2xl bg-slate-50 border-2 border-sky-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#1261A0]">
                Microservice Layer
              </span>
              <Server className="w-4 h-4 text-[#1261A0]" />
            </div>
            <h4 className="text-lg font-bold text-[#14243D]">Package Service</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Provides travel package CRUD operations with strict field
              validation. Returns active itineraries to frontend & booking service.
            </p>
            <div className="text-[11px] font-mono bg-white p-2 rounded border border-slate-200 text-slate-800">
              Port: 5001 | Express + Mongoose
            </div>
          </div>
        </div>

        {/* Database Layer explanation */}
        <div className="p-6 rounded-2xl bg-[#F5F8FC] border border-slate-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center flex-shrink-0">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-[#14243D]">
                MongoDB Atlas Cloud Database Cluster
              </h4>
              <p className="text-xs text-slate-500">
                Independent schemas (<code className="font-mono">TravelPackage</code> and{" "}
                <code className="font-mono">Booking</code>) persisted across collections with strict ObjectId references.
              </p>
            </div>
          </div>
          <span className="text-xs font-semibold px-3 py-1 bg-white rounded-lg border border-slate-200 text-slate-700">
            Mongoose ODM v9
          </span>
        </div>
      </div>

      {/* Comprehensive Endpoint Directory */}
      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6">
        <h3 className="text-xl font-bold text-[#14243D]">
          Microservices REST API Directory
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 uppercase tracking-wider font-semibold">
                <th className="pb-3">Service</th>
                <th className="pb-3">Method</th>
                <th className="pb-3">Endpoint</th>
                <th className="pb-3">Payload / Params</th>
                <th className="pb-3">Purpose</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono text-slate-700">
              <tr>
                <td className="py-2.5 font-bold text-[#1261A0]">Package</td>
                <td className="py-2.5"><span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">GET</span></td>
                <td className="py-2.5 text-[#14243D]">/health</td>
                <td className="py-2.5 text-slate-400">None</td>
                <td className="py-2.5 font-sans">Service liveness health check</td>
              </tr>
              <tr>
                <td className="py-2.5 font-bold text-[#1261A0]">Package</td>
                <td className="py-2.5"><span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">GET</span></td>
                <td className="py-2.5 text-[#14243D]">/api/packages</td>
                <td className="py-2.5 text-slate-400">None</td>
                <td className="py-2.5 font-sans">Retrieve all travel packages</td>
              </tr>
              <tr>
                <td className="py-2.5 font-bold text-[#1261A0]">Package</td>
                <td className="py-2.5"><span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">GET</span></td>
                <td className="py-2.5 text-[#14243D]">/api/packages/:id</td>
                <td className="py-2.5 text-slate-400">Package ObjectId</td>
                <td className="py-2.5 font-sans">Retrieve single package itinerary</td>
              </tr>
              <tr>
                <td className="py-2.5 font-bold text-emerald-700">Booking</td>
                <td className="py-2.5"><span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">GET</span></td>
                <td className="py-2.5 text-[#14243D]">/health</td>
                <td className="py-2.5 text-slate-400">None</td>
                <td className="py-2.5 font-sans">Service liveness health check</td>
              </tr>
              <tr>
                <td className="py-2.5 font-bold text-emerald-700">Booking</td>
                <td className="py-2.5"><span className="px-2 py-0.5 rounded bg-sky-100 text-[#1261A0] text-[10px] font-bold">POST</span></td>
                <td className="py-2.5 text-[#14243D]">/api/bookings</td>
                <td className="py-2.5 text-slate-500">{`{packageId, customerName, email, numberOfPeople, travelDate}`}</td>
                <td className="py-2.5 font-sans">Validate capacity & persist reservation</td>
              </tr>
              <tr>
                <td className="py-2.5 font-bold text-emerald-700">Booking</td>
                <td className="py-2.5"><span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">GET</span></td>
                <td className="py-2.5 text-[#14243D]">/api/bookings</td>
                <td className="py-2.5 text-slate-500">?email=customer@domain.com</td>
                <td className="py-2.5 font-sans">List customer bookings</td>
              </tr>
              <tr>
                <td className="py-2.5 font-bold text-emerald-700">Booking</td>
                <td className="py-2.5"><span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 text-[10px] font-bold">PATCH</span></td>
                <td className="py-2.5 text-[#14243D]">/api/bookings/:id/cancel</td>
                <td className="py-2.5 text-slate-400">Booking ObjectId</td>
                <td className="py-2.5 font-sans">Cancel confirmed reservation</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
