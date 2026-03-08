"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
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
  _id: string;
  name: string;
  category: {
    name: string;
  };
  description: string;
  createdAt: string;
  status: boolean;
}
export function ManageServiceCard() {
  const [service, setService] = useState<Request[] | null>(null);
  const [requestPopup, setRequestPopup] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.getProviderServices();
        const data = response as { data: { services: Request[] } };
        setService(data.data.services);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchData();
  }, []);

  const handlestatusToggle = async (serviceId: string, checked: boolean) => {
    try {
      const response = await apiClient.updateServiceStatus(serviceId, checked);
    } catch (error) {
      console.error("Error updating service status:", error);
    }
  };

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {service?.length ?
        service?.map((req, index) => (
          <Card
            key={index}
            className="w-full max-w-md hover:shadow-lg transition-shadow hover:bg-primary/2">
            <CardHeader>
              <div className="flex items-start justify-between">
                <CardTitle className="text-xl">{req.category.name}</CardTitle>
              <div className="flex items-center gap-3">
                <input
                  title="status"
                  name="status"
                  type="checkbox"
                  defaultChecked
                  className="toggle toggle-success bg-gray-200 text-green-700"
                  onChange={(e) => handlestatusToggle(req._id, e.target.checked)}
                />
              </div>
              </div>
              <CardTitle>{req.name}</CardTitle>
              <CardDescription>{req.description}</CardDescription>

              <div className="flex justify-between mt-2">
                <span className="text-sm text-muted-foreground">
                  Creation date: {req.createdAt.split("T")[0]}
                </span>
              </div>
            </CardHeader>
            <CardContent></CardContent>
            {requestPopup && (
              <RequestCard request={req} setRequestPopup={setRequestPopup} />
            )}
          </Card>
        ))
      : <div className="col-span-full text-center py-10">
          <h3 className="text-2xl font-bold mb-2">No Services Found</h3>
          <p className="text-muted-foreground">
            You haven't added any services yet. Click the button below to add your first service and start attracting customers!
          </p>
        </div>
      }
    </div>
  );
}
