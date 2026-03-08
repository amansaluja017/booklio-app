"use client";

import { Mail, MapPin, Phone, User, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import ReviewForm from "../ReviewForm";

interface PopupCardProps {
  request?: any;
  setRequestPopup: (value: boolean) => void;
}

export default function RequestCard({
  request,
  setRequestPopup,
}: PopupCardProps) {

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 bg-black/50 z-50 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 lg:p-10 transform transition-all duration-300 ease-out scale-100 animate-slide-up">
        <button
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition"
          aria-label="Close popup">
          <X className="w-5 h-5" onClick={() => setRequestPopup(false)} />
        </button>

        <h2 className="text-2xl sm:text-3xl font-bold">
          {request?.category || "Service Category"}
        </h2>
        <h3 className="font-bold text-xl sm:text-2xl mt-4 sm:mt-5">
          {request?.service?.name}
        </h3>
        <p className="text-sm sm:text-base text-gray-700 mt-3 leading-relaxed">
          {request?.service.description ||
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."}
        </p>

        <div className="flex items-center gap-2 font-medium mt-4 text-gray-600">
          <div className="flex gap-2 items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 shrink-0" />
              <span className="text-sm sm:text-base">
                {request?.location?.city},{" "}
                {request?.location?.state},{" "}
                {request?.location?.country}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-8 space-y-3 sm:space-y-4">
          <div className="flex items-center gap-3 text-gray-700">
            <User className="w-4 h-4 shrink-0" />
            <span className="text-sm sm:text-base">
              {request?.provider?.name || "Provider Name"}
            </span>
          </div>
          <div className="flex items-center gap-3 text-gray-700">
            <Phone className="w-4 h-4 shrink-0" />
            <span className="text-sm sm:text-base">
              {request?.provider?.phone || "+91 1234567890"}
            </span>
          </div>
          <div className="flex items-center gap-3 text-gray-700">
            <Mail className="w-4 h-4 shrink-0" />
            <span className="text-sm sm:text-base">
              {request?.provider?.email || "provider@example.com"}
            </span>
          </div>
        </div>

        <div>
          <div className="mt-10">
            <h3 className="text-2xl font-bold">Notes</h3>
            <p className="p-2">{request?.notes || "No notes provided."}</p>
          </div>
        </div>

        {request?.image && (
          <div className="mt-10">
            <img src={request?.image} alt="customer provided image" />
          </div>
        )}

        {request?.status !== "cancelled" && (
          <div className="flex items-center gap-3 mt-10 justify-end">
            {request?.status === "completed" && (
              <ReviewForm requestId={request.service._id} />
            )}
            {request?.status === "confirmed" && (
              <Button
                className="cursor-pointer"
                onClick={() =>
                  alert("Accept request functionality coming soon!")
                }>
                Reschedule
              </Button>
            )}

            {(request?.status === "requested" ||
              request?.status === "confirmed") && (
              <Button
                variant="outline"
                className="cursor-pointer"
                onClick={() => setRequestPopup(false)}>
                Cancel Request
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
