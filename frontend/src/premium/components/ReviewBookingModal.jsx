import React, { useState, useEffect } from "react";
import {
  X,
  Calendar,
  Users,
  User,
  Mail,
  CheckCircle2,
  AlertCircle,
  Clock,
  MapPin,
  Loader2,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  CreditCard,
  Hotel,
} from "lucide-react";
import { createBooking } from "../../api/bookingApi";
import { getPackageItinerary } from "../../data/packageItineraries";

export default function ReviewBookingModal({
  pkg,
  isOpen,
  onClose,
  onBookingSuccess,
  onNavigateToBookings,
}) {
  const [step, setStep] = useState(1); // 1 = input, 2 = review, 3 = confirmation
  const [formData, setFormData] = useState({
    customerName: "",
    email: "",
    numberOfPeople: 1,
    travelDate: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState(null);
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  // Set minimum date to tomorrow
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDateString = tomorrow.toISOString().split("T")[0];

  useEffect(() => {
    if (pkg) {
      setStep(1);
      setFormData({
        customerName: "",
        email: "",
        numberOfPeople: 1,
        travelDate: minDateString,
      });
      setFormErrors({});
      setServerError(null);
      setConfirmedBooking(null);
    }
  }, [pkg]);

  if (!isOpen || !pkg) return null;

  const maxSlots = Math.min(20, Math.max(1, Number(pkg.availableSlots) || 1));
  const unitPrice = Number(pkg.price) || 0;
  const guestCount = Number(formData.numberOfPeople) || 1;
  const totalPrice = unitPrice * guestCount;

  // Retrieve authentic itinerary and accommodation details
  const itinerary = getPackageItinerary(pkg);
  const accommodation = itinerary?.accommodation;

  // Real backend field validations
  const validateStepOne = () => {
    const errors = {};

    const name = formData.customerName.trim();
    if (!name) {
      errors.customerName = "Full name is required";
    } else if (name.length < 2) {
      errors.customerName = "Full name must be at least 2 characters";
    } else if (name.length > 100) {
      errors.customerName = "Full name cannot exceed 100 characters";
    }

    const email = formData.email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      errors.email = "Email address is required";
    } else if (!emailRegex.test(email)) {
      errors.email = "Please enter a valid email address (e.g. name@domain.com)";
    }

    const people = Number(formData.numberOfPeople);
    if (!formData.numberOfPeople || isNaN(people)) {
      errors.numberOfPeople = "Number of guests is required";
    } else if (!Number.isInteger(people) || people < 1) {
      errors.numberOfPeople = "Must be at least 1 guest";
    } else if (people > 20) {
      errors.numberOfPeople = "Maximum 20 guests allowed per booking";
    } else if (people > maxSlots) {
      errors.numberOfPeople = `Only ${maxSlots} slots available for this package`;
    }

    if (!formData.travelDate) {
      errors.travelDate = "Travel date is required";
    } else {
      const selected = new Date(formData.travelDate);
      const now = new Date();
      if (isNaN(selected.getTime()) || selected <= now) {
        errors.travelDate = "Travel date must be strictly in the future";
      }
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: null }));
    }
    if (serverError) setServerError(null);
  };

  const handleProceedToReview = (e) => {
    e.preventDefault();
    if (validateStepOne()) {
      setStep(2);
    }
  };

  const handleFinalSubmit = async () => {
    setIsSubmitting(true);
    setServerError(null);

    try {
      const payload = {
        packageId: pkg._id,
        customerName: formData.customerName.trim(),
        email: formData.email.trim().toLowerCase(),
        numberOfPeople: Number(formData.numberOfPeople),
        travelDate: new Date(formData.travelDate).toISOString(),
      };

      const response = await createBooking(payload);

      if (response && response.success && response.data) {
        setConfirmedBooking(response.data);
        setStep(3);
        if (onBookingSuccess) onBookingSuccess(response.data);
      } else {
        throw new Error(
          response?.message ||
            "Booking submission was not confirmed by the service."
        );
      }
    } catch (err) {
      console.error("Booking error:", err);
      setServerError(
        err.message ||
          "Failed to process booking with the Booking Service. Check that both microservices are running."
      );
      setStep(2); // Stay on review to retry
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#0B1730]/75 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative bg-white w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0B1730] via-[#0E2246] to-[#1261A0] px-6 py-5 text-white flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold tracking-wider uppercase text-[#21B8D5]">
                {step === 1 && "Step 1 of 2: Guest & Accommodation Details"}
                {step === 2 && "Step 2 of 2: Review Reservation"}
                {step === 3 && "Booking Confirmed"}
              </span>
            </div>
            <h2 className="text-xl font-bold tracking-tight text-white mt-0.5">
              {pkg.title}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-slate-300 hover:text-white rounded-full hover:bg-white/10 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {/* STEP 1: Details Input */}
          {step === 1 && (
            <form onSubmit={handleProceedToReview} className="space-y-4">
              {/* Package Summary snippet */}
              <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs">
                <div className="flex items-center gap-2 text-[#14243D] font-semibold">
                  <MapPin className="w-4 h-4 text-[#1261A0]" />
                  <span>{pkg.destination}</span>
                  <span className="text-slate-300">•</span>
                  <Clock className="w-4 h-4 text-[#1261A0]" />
                  <span>{pkg.duration}</span>
                </div>
                <span className="font-bold text-[#1261A0]">
                  ₹{unitPrice.toLocaleString("en-IN")} / person
                </span>
              </div>

              {/* Verified Accommodation Info Box */}
              {accommodation ? (
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-start gap-3 text-xs">
                  <div className="w-12 h-12 rounded-lg overflow-hidden bg-slate-200 flex-shrink-0 border border-slate-200">
                    <img
                      src={accommodation.image || accommodation.photoUrl}
                      alt={accommodation.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#14243D] truncate">
                        {accommodation.name}
                      </span>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                        {accommodation.type || accommodation.starRating || "Verified Stay"}
                      </span>
                    </div>
                    <p className="text-slate-500 text-[11px] truncate">
                      {accommodation.roomType || "Deluxe Room"} • Check-in: {accommodation.checkIn || accommodation.checkInTime || "14:00"}
                    </p>
                    <p className="text-slate-400 text-[10px] truncate">
                      {accommodation.address}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-500 flex items-center gap-2">
                  <Hotel className="w-4 h-4 text-slate-400 flex-shrink-0" />
                  <span>Accommodation details have not been provided for this package.</span>
                </div>
              )}

              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold text-[#14243D] uppercase tracking-wider mb-1.5">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    name="customerName"
                    value={formData.customerName}
                    onChange={handleInputChange}
                    placeholder="Enter your legal full name"
                    className={`w-full pl-10 pr-4 py-2.5 bg-white rounded-xl border text-sm text-[#14243D] transition-all focus:outline-none focus:ring-2 ${
                      formErrors.customerName
                        ? "border-rose-400 focus:ring-rose-200"
                        : "border-slate-300 focus:border-[#1261A0] focus:ring-[#1261A0]/10"
                    }`}
                  />
                </div>
                {formErrors.customerName && (
                  <p className="text-xs text-rose-600 mt-1 font-medium">
                    {formErrors.customerName}
                  </p>
                )}
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-xs font-bold text-[#14243D] uppercase tracking-wider mb-1.5">
                  Email Address <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="e.g. traveller@example.com"
                    className={`w-full pl-10 pr-4 py-2.5 bg-white rounded-xl border text-sm text-[#14243D] transition-all focus:outline-none focus:ring-2 ${
                      formErrors.email
                        ? "border-rose-400 focus:ring-rose-200"
                        : "border-slate-300 focus:border-[#1261A0] focus:ring-[#1261A0]/10"
                    }`}
                  />
                </div>
                {formErrors.email && (
                  <p className="text-xs text-rose-600 mt-1 font-medium">
                    {formErrors.email}
                  </p>
                )}
              </div>

              {/* Number of People and Travel Date Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Number of People */}
                <div>
                  <label className="block text-xs font-bold text-[#14243D] uppercase tracking-wider mb-1.5">
                    Guests <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Users className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="number"
                      name="numberOfPeople"
                      min={1}
                      max={maxSlots}
                      value={formData.numberOfPeople}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-4 py-2.5 bg-white rounded-xl border text-sm text-[#14243D] transition-all focus:outline-none focus:ring-2 ${
                        formErrors.numberOfPeople
                          ? "border-rose-400 focus:ring-rose-200"
                          : "border-slate-300 focus:border-[#1261A0] focus:ring-[#1261A0]/10"
                      }`}
                    />
                  </div>
                  <span className="text-[11px] text-slate-500 mt-1 block">
                    {maxSlots} spots available
                  </span>
                  {formErrors.numberOfPeople && (
                    <p className="text-xs text-rose-600 mt-1 font-medium">
                      {formErrors.numberOfPeople}
                    </p>
                  )}
                </div>

                {/* Travel Date */}
                <div>
                  <label className="block text-xs font-bold text-[#14243D] uppercase tracking-wider mb-1.5">
                    Start Date <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      name="travelDate"
                      min={minDateString}
                      value={formData.travelDate}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2.5 bg-white rounded-xl border text-sm text-[#14243D] transition-all focus:outline-none focus:ring-2 ${
                        formErrors.travelDate
                          ? "border-rose-400 focus:ring-rose-200"
                          : "border-slate-300 focus:border-[#1261A0] focus:ring-[#1261A0]/10"
                      }`}
                    />
                  </div>
                  {formErrors.travelDate && (
                    <p className="text-xs text-rose-600 mt-1 font-medium">
                      {formErrors.travelDate}
                    </p>
                  )}
                </div>
              </div>

              {/* Total Price Banner */}
              <div className="p-4 bg-[#F5F8FC] border border-slate-200 rounded-2xl flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-500 font-medium block">
                    Calculated Total
                  </span>
                  <span className="text-xs text-slate-400">
                    ₹{unitPrice.toLocaleString("en-IN")} × {guestCount}{" "}
                    {guestCount === 1 ? "guest" : "guests"}
                  </span>
                </div>
                <div className="text-2xl font-black text-[#14243D]">
                  ₹{totalPrice.toLocaleString("en-IN")}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-semibold text-sm hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#1261A0] hover:bg-[#0E4D80] text-white font-bold text-sm shadow-md shadow-[#1261A0]/20 active:scale-98 transition-all"
                >
                  <span>Review Booking</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 2: Review Before Submit */}
          {step === 2 && (
            <div className="space-y-5">
              <div className="border border-slate-200 bg-slate-50 rounded-2xl p-5 space-y-3 text-xs text-slate-700">
                <h4 className="text-sm font-bold text-[#14243D] border-b border-slate-200 pb-2">
                  Reservation Summary
                </h4>

                <div className="flex justify-between">
                  <span className="text-slate-500">Destination & Trip</span>
                  <span className="font-bold text-[#14243D] text-right">
                    {pkg.destination} — {pkg.title}
                  </span>
                </div>

                {/* Accommodation line */}
                <div className="flex justify-between">
                  <span className="text-slate-500">Included Stay</span>
                  <span className="font-semibold text-[#14243D] text-right max-w-[260px] truncate">
                    {accommodation
                      ? `${accommodation.name} (${accommodation.roomType})`
                      : "Accommodation details have not been provided for this package."}
                  </span>
                </div>

                {accommodation && (
                  <div className="flex justify-between">
                    <span className="text-slate-500">Check-in / Check-out</span>
                    <span className="font-medium text-[#14243D]">
                      {accommodation.checkIn || accommodation.checkInTime || "14:00"} / {accommodation.checkOut || accommodation.checkOutTime || "12:00"}
                    </span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span className="text-slate-500">Guest Name</span>
                  <span className="font-semibold text-[#14243D]">
                    {formData.customerName}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-500">Confirmation Email</span>
                  <span className="font-semibold text-[#14243D]">
                    {formData.email}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-500">Travel Date</span>
                  <span className="font-semibold text-[#14243D]">
                    {new Date(formData.travelDate).toLocaleDateString("en-US", {
                      weekday: "short",
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-500">Party Size</span>
                  <span className="font-semibold text-[#14243D]">
                    {guestCount} {guestCount === 1 ? "Person" : "People"}
                  </span>
                </div>

                {/* Itemized Fare */}
                <div className="pt-2 border-t border-slate-200 space-y-1">
                  <div className="flex justify-between text-slate-500">
                    <span>Base Package Fare</span>
                    <span>
                      ₹{unitPrice.toLocaleString("en-IN")} × {guestCount}
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>Taxes & Hotel Surcharges</span>
                    <span className="text-emerald-700 font-medium">Included (Free)</span>
                  </div>
                </div>

                <div className="flex justify-between pt-2 border-t border-slate-200 text-sm font-black text-[#14243D]">
                  <span>Total Amount</span>
                  <span className="text-[#1261A0]">
                    ₹{totalPrice.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              {serverError && (
                <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl flex items-start gap-3 text-xs text-rose-800">
                  <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block mb-0.5">
                      Service Error
                    </span>
                    <span>{serverError}</span>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-2 text-xs text-slate-500">
                <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>
                  Booking Service will verify package capacity and persist your
                  reservation in MongoDB.
                </span>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-semibold text-xs hover:bg-slate-50 transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  Edit Details
                </button>

                <button
                  type="button"
                  onClick={handleFinalSubmit}
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#1261A0] hover:bg-[#0E4D80] disabled:bg-slate-300 text-white font-bold text-sm shadow-md shadow-[#1261A0]/20 active:scale-98 transition-all"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Persisting with Booking Service...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-[#21B8D5]" />
                      Confirm & Submit
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Receipt Confirmation */}
          {step === 3 && confirmedBooking && (
            <div className="text-center py-4 space-y-6">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <h3 className="text-2xl font-black text-[#14243D]">
                  Booking Confirmed!
                </h3>
                <p className="text-slate-600 text-xs mt-1">
                  Your reservation was saved in MongoDB by the Booking Service.
                </p>
              </div>

              {/* Receipt Summary Card */}
              <div className="bg-[#F5F8FC] border border-slate-200 rounded-2xl p-5 text-left space-y-3 text-xs">
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500">Booking Reference</span>
                  <span className="font-mono font-bold text-[#14243D]">
                    {confirmedBooking._id}
                  </span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500">Status</span>
                  <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 uppercase tracking-wider text-[10px]">
                    {confirmedBooking.status}
                  </span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500">Guest Name</span>
                  <span className="font-semibold text-[#14243D]">
                    {confirmedBooking.customerName}
                  </span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500">Travel Date</span>
                  <span className="font-medium text-[#14243D]">
                    {new Date(confirmedBooking.travelDate).toLocaleDateString(
                      "en-US",
                      {
                        weekday: "short",
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      }
                    )}
                  </span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500">Party</span>
                  <span className="font-medium text-[#14243D]">
                    {confirmedBooking.numberOfPeople}{" "}
                    {confirmedBooking.numberOfPeople === 1 ? "Person" : "People"}
                  </span>
                </div>

                {/* Accommodation check-in info */}
                {accommodation && (
                  <div className="flex justify-between border-b border-slate-200 pb-2">
                    <span className="text-slate-500">Hotel Check-in</span>
                    <span className="font-medium text-[#14243D] text-right truncate max-w-[250px]">
                      {accommodation.name} ({accommodation.checkIn || accommodation.checkInTime || "14:00"})
                    </span>
                  </div>
                )}

                <div className="flex justify-between pt-1 text-sm font-bold text-[#14243D]">
                  <span>Total Amount Paid</span>
                  <span className="text-[#1261A0]">
                    ₹{Number(confirmedBooking.totalPrice).toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    if (onNavigateToBookings) onNavigateToBookings();
                  }}
                  className="flex-1 py-3 px-4 rounded-xl bg-[#1261A0] hover:bg-[#0E4D80] text-white font-semibold text-sm transition-all shadow-md shadow-[#1261A0]/20"
                >
                  View in My Bookings
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm transition-all"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
