import React, { useState, useEffect } from "react";
import {
  X,
  Calendar,
  Users,
  User,
  Mail,
  CreditCard,
  CheckCircle2,
  AlertCircle,
  Clock,
  MapPin,
  Loader2,
  ArrowRight,
} from "lucide-react";
import { createBooking } from "../api/bookingApi";

export default function BookingModal({
  pkg,
  isOpen,
  onClose,
  onBookingSuccess,
  onNavigateToBookings,
}) {
  const [formData, setFormData] = useState({
    customerName: "",
    email: "",
    numberOfPeople: 1,
    travelDate: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState(null);
  const [createdBooking, setCreatedBooking] = useState(null);

  // Set minimum selectable date to tomorrow
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDateString = tomorrow.toISOString().split("T")[0];

  useEffect(() => {
    if (pkg) {
      setFormData({
        customerName: "",
        email: "",
        numberOfPeople: 1,
        travelDate: minDateString,
      });
      setFormErrors({});
      setServerError(null);
      setCreatedBooking(null);
    }
  }, [pkg]);

  if (!isOpen || !pkg) return null;

  const maxSlots = Math.min(20, Math.max(1, Number(pkg.availableSlots) || 1));
  const unitPrice = Number(pkg.price) || 0;
  const totalPrice = unitPrice * (Number(formData.numberOfPeople) || 1);

  // Client-side validation matching backend constraints
  const validateForm = () => {
    const errors = {};

    if (!formData.customerName.trim()) {
      errors.customerName = "Full name is required";
    } else if (formData.customerName.trim().length < 2) {
      errors.customerName = "Name must be at least 2 characters";
    } else if (formData.customerName.trim().length > 100) {
      errors.customerName = "Name cannot exceed 100 characters";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errors.email = "Email address is required";
    } else if (!emailRegex.test(formData.email.trim())) {
      errors.email = "Please enter a valid email address";
    }

    const people = Number(formData.numberOfPeople);
    if (!formData.numberOfPeople || isNaN(people)) {
      errors.numberOfPeople = "Number of guests is required";
    } else if (!Number.isInteger(people) || people < 1) {
      errors.numberOfPeople = "Must be at least 1 guest";
    } else if (people > 20) {
      errors.numberOfPeople = "A maximum of 20 guests is allowed";
    } else if (people > maxSlots) {
      errors.numberOfPeople = `Only ${maxSlots} slots available for this package`;
    }

    if (!formData.travelDate) {
      errors.travelDate = "Travel date is required";
    } else {
      const selectedDate = new Date(formData.travelDate);
      const now = new Date();
      if (isNaN(selectedDate.getTime()) || selectedDate <= now) {
        errors.travelDate = "Travel date must be in the future";
      }
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: null }));
    }
    if (serverError) setServerError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setServerError(null);

    try {
      const payload = {
        packageId: pkg._id,
        customerName: formData.customerName,
        email: formData.email,
        numberOfPeople: Number(formData.numberOfPeople),
        travelDate: new Date(formData.travelDate).toISOString(),
      };

      const response = await createBooking(payload);
      if (response && response.success && response.data) {
        setCreatedBooking(response.data);
        if (onBookingSuccess) {
          onBookingSuccess(response.data);
        }
      } else {
        throw new Error(response?.message || "Booking failed to confirm.");
      }
    } catch (err) {
      console.error("Booking error:", err);
      setServerError(
        err.message ||
          "Could not process booking. Ensure both backend services are running."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative bg-white w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-900 via-primary-800 to-slate-900 px-6 py-5 text-white flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold tracking-wider uppercase text-sky-400">
              Reserve Your Journey
            </span>
            <h2 className="text-xl font-bold tracking-tight">{pkg.title}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-300 hover:text-white rounded-full hover:bg-white/10 transition-colors"
            aria-label="Close booking modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {createdBooking ? (
            /* Success Receipt View */
            <div className="text-center py-6 space-y-6">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <h3 className="text-2xl font-black text-slate-900">
                  Booking Confirmed!
                </h3>
                <p className="text-slate-600 text-sm mt-1">
                  Your reservation has been recorded in the TravelMate database.
                </p>
              </div>

              {/* Receipt Summary Card */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 text-left space-y-3 text-sm">
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500">Booking Reference</span>
                  <span className="font-mono font-bold text-slate-800 text-xs">
                    {createdBooking._id}
                  </span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500">Guest Name</span>
                  <span className="font-semibold text-slate-900">
                    {createdBooking.customerName}
                  </span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500">Email Confirmation</span>
                  <span className="font-medium text-slate-800">
                    {createdBooking.email}
                  </span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500">Travel Date</span>
                  <span className="font-medium text-slate-800">
                    {new Date(createdBooking.travelDate).toLocaleDateString(
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
                  <span className="text-slate-500">Guests</span>
                  <span className="font-medium text-slate-800">
                    {createdBooking.numberOfPeople}{" "}
                    {createdBooking.numberOfPeople === 1 ? "Person" : "People"}
                  </span>
                </div>
                <div className="flex justify-between pt-1 text-base font-bold text-slate-900">
                  <span>Total Amount Paid</span>
                  <span className="text-primary-700">
                    ${Number(createdBooking.totalPrice).toLocaleString()}
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
                  className="flex-1 py-3 px-4 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-semibold text-sm transition-all shadow-md shadow-primary-500/20"
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
          ) : (
            /* Booking Form */
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Package Summary snippet */}
              <div className="flex items-center justify-between p-3.5 bg-sky-50/70 border border-sky-100 rounded-xl text-xs">
                <div className="flex items-center gap-2 text-slate-700 font-medium">
                  <MapPin className="w-4 h-4 text-primary-600" />
                  <span>{pkg.destination}</span>
                  <span className="text-slate-300">•</span>
                  <Clock className="w-4 h-4 text-primary-600" />
                  <span>{pkg.duration}</span>
                </div>
                <span className="font-bold text-primary-800">
                  ${unitPrice.toLocaleString()} / person
                </span>
              </div>

              {serverError && (
                <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl flex items-start gap-3 text-xs text-rose-800">
                  <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block mb-0.5">
                      Booking Failed
                    </span>
                    <span>{serverError}</span>
                  </div>
                </div>
              )}

              {/* Customer Name */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    name="customerName"
                    value={formData.customerName}
                    onChange={handleChange}
                    placeholder="e.g. John Doe"
                    disabled={isSubmitting}
                    className={`w-full pl-10 pr-4 py-2.5 bg-white rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 ${
                      formErrors.customerName
                        ? "border-rose-400 focus:ring-rose-200"
                        : "border-slate-300 focus:border-primary-500 focus:ring-primary-100"
                    }`}
                  />
                </div>
                {formErrors.customerName && (
                  <p className="text-xs text-rose-600 mt-1 font-medium">
                    {formErrors.customerName}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Email Address <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    disabled={isSubmitting}
                    className={`w-full pl-10 pr-4 py-2.5 bg-white rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 ${
                      formErrors.email
                        ? "border-rose-400 focus:ring-rose-200"
                        : "border-slate-300 focus:border-primary-500 focus:ring-primary-100"
                    }`}
                  />
                </div>
                {formErrors.email && (
                  <p className="text-xs text-rose-600 mt-1 font-medium">
                    {formErrors.email}
                  </p>
                )}
              </div>

              {/* Guests & Date Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Number of Guests */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Guests (Max {maxSlots}) <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Users className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="number"
                      name="numberOfPeople"
                      min={1}
                      max={maxSlots}
                      value={formData.numberOfPeople}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className={`w-full pl-10 pr-4 py-2.5 bg-white rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 ${
                        formErrors.numberOfPeople
                          ? "border-rose-400 focus:ring-rose-200"
                          : "border-slate-300 focus:border-primary-500 focus:ring-primary-100"
                      }`}
                    />
                  </div>
                  {formErrors.numberOfPeople && (
                    <p className="text-xs text-rose-600 mt-1 font-medium">
                      {formErrors.numberOfPeople}
                    </p>
                  )}
                </div>

                {/* Travel Date */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Travel Date <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      name="travelDate"
                      min={minDateString}
                      value={formData.travelDate}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className={`w-full px-3 py-2.5 bg-white rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 ${
                        formErrors.travelDate
                          ? "border-rose-400 focus:ring-rose-200"
                          : "border-slate-300 focus:border-primary-500 focus:ring-primary-100"
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

              {/* Total Calculation Banner */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-500 font-medium block">
                    Calculated Total
                  </span>
                  <span className="text-xs text-slate-400">
                    ${unitPrice.toLocaleString()} × {formData.numberOfPeople || 1}{" "}
                    {formData.numberOfPeople == 1 ? "guest" : "guests"}
                  </span>
                </div>
                <div className="text-2xl font-black text-slate-900">
                  ${totalPrice.toLocaleString()}
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={isSubmitting}
                  className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-semibold text-sm hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary-600 hover:bg-primary-700 disabled:bg-slate-300 text-white font-bold text-sm shadow-md shadow-primary-500/20 active:scale-98 transition-all"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Confirming with Booking Service...
                    </>
                  ) : (
                    <>
                      Confirm Booking
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
