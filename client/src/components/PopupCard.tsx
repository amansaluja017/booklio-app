"use client";

import { Mail, MapPin, Phone, Star, User, X } from "lucide-react";
import { ReviewCard } from "./ReviewCard";
import BookingForm from "./BookingForm";

interface PopupCardProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  service?: any;
}

export function PopupCard({ open, setOpen, service }: PopupCardProps) {

  const ratingArr = Array.from({ length: Math.round(service.rating) }, (_, i) => i);

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 bg-black/50 z-50 animate-fade-in">

      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 lg:p-10 transform transition-all duration-300 ease-out scale-100 animate-slide-up">
        <button
          onClick={() => setOpen(false)}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition"
          aria-label="Close popup">
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-2xl sm:text-3xl font-bold">
          {service?.category?.name || "Service Category"}
        </h2>
        <h3 className="font-bold text-xl sm:text-2xl mt-4 sm:mt-5">
          {service?.name}
        </h3>
        <p className="text-sm sm:text-base text-gray-700 mt-3 leading-relaxed">
          {service?.description ||
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."}
        </p>

        <div className="flex items-center gap-2 font-medium mt-4 text-gray-600">
          <div className="flex gap-2 items-center justify-between w-full">
            <div className="flex">
              {ratingArr.map((_, idx) => (
                <Star key={idx} className="size-4 text-amber-500 fill-amber-500" />
              ))}
              <span className="text-sm text-gray-500 ml-2">
                ({service.reviews?.length || 0} reviews)
              </span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 shrink-0" />
            <span className="text-sm sm:text-base">
              {service?.location?.city}, {service?.location?.state},{" "}
              {service?.location?.country}
            </span>
            </div>
          </div>
        </div>

        <div className="mt-8 space-y-3 sm:space-y-4">
          <div className="flex items-center gap-3 text-gray-700">
            <User className="w-4 h-4 shrink-0" />
            <span className="text-sm sm:text-base">
              {service?.provider?.name || "Provider Name"}
            </span>
          </div>
          <div className="flex items-center gap-3 text-gray-700">
            <Phone className="w-4 h-4 shrink-0" />
            <span className="text-sm sm:text-base">
              {service?.provider?.phone || "+91 1234567890"}
            </span>
          </div>
          <div className="flex items-center gap-3 text-gray-700">
            <Mail className="w-4 h-4 shrink-0" />
            <span className="text-sm sm:text-base">
              {service?.provider?.email || "provider@example.com"}
            </span>
          </div>
        </div>

        <div className="mt-10">
          <h4 className="font-bold text-xl">Reviews</h4>

          <div className="mt-5 flex gap-3 overflow-auto">
            {service?.reviews?.length > 0 ? (
              service.reviews.map((review: any, idx: number) => (
                <ReviewCard key={idx} review={review} />
              ))
            ) : (
              <p className="text-gray-500">No reviews yet.</p>
            )}
          </div>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row gap-3 sm:justify-end">
          <BookingForm service={service} />
        </div>
      </div>
    </div>
  );
}
