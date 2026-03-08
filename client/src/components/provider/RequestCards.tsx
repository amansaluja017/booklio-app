"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import apiClient from "@/utilis/apiClient";
import { useEffect, useState } from "react";
import RequestCard from "./RequestCard";

interface Request {
  service: {
    name: string;
    description: string;
  };
  date: string;
  time: string;
  customer: {
    name: string;
    email: string;
    phone: string;
    address: {
      state: string;
      city: string;
      country: string;
    };
  };
  status: string;
}

export function RequestCards() {
  const [request, setRequest] = useState<Request[] | null>(null);
  const [requestPopup, setRequestPopup] = useState<boolean>(false);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await apiClient.getBookings();
        const data = response as { data: {bookings: []} };
        setRequest(data?.data.bookings || null);
      } catch (error) {
        console.error(error);
      }
    }
    fetchRequests();
  }, []);

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {request?.filter((req) => req.status === "requested").length ? request?.filter((req) => req.status === "requested").map((req, index) => (
        <Card key={index} className="w-full max-w-md hover:shadow-lg transition-shadow hover:bg-primary/2">
          <CardHeader>
            <CardTitle>{req.service.name}</CardTitle>
            <CardDescription>{req.service.description}</CardDescription>

            <div className="flex justify-between mt-2">
              <span className="text-sm text-muted-foreground">
                Request Date: {req.date.split("T")[0]}
              </span>
              <span className="ml-2 text-sm text-muted-foreground">
                Time: {req.date.split("T")[1].slice(0, 5)}
              </span>
            </div>
          </CardHeader>
          <CardContent>
            <div>
              <span className="text-lg font-bold">Customer Details</span>

              <div className="grid grid-cols-2 text-sm mt-2 gap-2">
                <p>{req.customer.name}</p>
                <p>{req.customer.email}</p>
                <p>{req.customer.phone}</p>
                <p>{req.customer.address.city}, {req.customer.address.state}, {req.customer.address.country}</p>
              </div>
            </div>
          </CardContent>
          {requestPopup && (<RequestCard request={req} setRequestPopup={setRequestPopup} />)}
          <CardFooter className="flex-col gap-2 mt-4">
            <Button
              onClick={() => setRequestPopup(true)}
              type="submit"
              className="w-full cursor-pointer transition-colors">
              View
            </Button>
          </CardFooter>
        </Card>
      )): (
        <div className="col-span-full text-center py-10">
          <h3 className="text-2xl font-bold mb-2">No Requests Found</h3>
          <p className="text-muted-foreground">You currently have no service requests.</p>
        </div>
      )}
    </div>
  );
};
