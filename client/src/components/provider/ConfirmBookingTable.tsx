"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import apiClient from "@/utilis/apiClient";
import { useEffect, useState } from "react";
import ConfirmBookingPopup from "./ConfirmBookingPopup";

interface Request {
  service: {
    name: string;
    description: string;
  };
  status: "requested" | "confirmed" | "in-progress" | "completed" | "cancelled";
  date: string;
  time: string;
  provider: {
    name: string;
    email: string;
    phone: string;
    address: {
      state: string;
      city: string;
      country: string;
    };
  };
};

const getStatusColor = (status: Request["status"]) => {
  const statusColors: Record<Request["status"], string> = {
    requested: "bg-yellow-100 text-yellow-800 border border-yellow-300",
    confirmed: "bg-blue-100 text-blue-800 border border-blue-300",
    "in-progress": "bg-purple-100 text-purple-800 border border-purple-300",
    completed: "bg-green-100 text-green-800 border border-green-300",
    cancelled: "bg-red-100 text-red-800 border border-red-300",
  };
  return statusColors[status] || "bg-gray-100 text-gray-800";
};

export function ConfirmBookingTable() {
  const [request, setRequest] = useState<Request[] | null>(null);
  const [requestPopup, setRequestPopup] = useState<boolean>(false);
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await apiClient.getBookings();
        const data = response as { data: {bookings: []} };
        setRequest(data?.data.bookings || null);
      } catch (error) {
        console.error(error);
      }
    };
    fetchRequests();
  }, []);

  return (
    <div className="rounded-lg border overflow-hidden shadow-md">
      <Table className="w-full">
        <TableCaption className="pb-4">
          A list of your recent bookings.
        </TableCaption>
        <TableHeader className="bg-gray-50">
          <TableRow className="border-b">
            <TableHead className="w-12 font-semibold">Sr.</TableHead>
            <TableHead className="font-semibold">Service</TableHead>
            <TableHead className="font-semibold">Date & Time</TableHead>
            <TableHead className="font-semibold">Status</TableHead>
            <TableHead className="text-right font-semibold">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {request && request.length > 0 ?
            request.filter((req) => req.status !== "requested").map((req, key) => (
              <TableRow key={key} className="hover:bg-gray-50 border-b">
                <TableCell className="font-medium text-center">
                  {key + 1}
                </TableCell>
                <TableCell className="font-medium">
                  {req.service?.name}
                </TableCell>
                <TableCell>
                  {req.date.split("T")[0]} at{" "}
                  {req.date.split("T")[1]?.substring(0, 5)}
                </TableCell>
                <TableCell>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(req.status)}`}>
                    {req.status.charAt(0).toUpperCase() +
                      req.status.slice(1).replace("-", " ")}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <Button
                      onClick={() => {
                        setRequestPopup(true);
                        setSelectedRequest(req);
                      }}
                    className="bg-blue-600 hover:bg-blue-700 text-white text-sm cursor-pointer">
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            ))
          : <TableRow>
              <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                No booking requests found.
              </TableCell>
            </TableRow>
          }
        </TableBody>
      </Table>

      {requestPopup && request && (
        <ConfirmBookingPopup request={selectedRequest} setRequestPopup={setRequestPopup} />
      )}
    </div>
  );
};