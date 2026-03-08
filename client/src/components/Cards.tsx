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
import { IndianRupee, MapPin, Star } from "lucide-react";
import { PopupCard } from "./PopupCard";
import { useState } from "react";

export default function Cards({service}: {service: any}) {
    const [popupOpen, setPopupOpen] = useState<boolean>(false);

    const ratingArr = Array.from({ length: Math.round(service.rating) }, (_, i) => i);

  return (
    <div className="w-full">
        {popupOpen && <PopupCard open={popupOpen} setOpen={setPopupOpen} service={service} />}

      <div className="">
          <Card
            className="mx-auto w-full max-w-sm cursor-pointer hover:scale-110 transform transition duration-300"
          >
            <CardHeader>
              <CardTitle className="text-2xl">{service?.category?.name || service.name}</CardTitle>
              <hr />
              <CardTitle className="text-xl">{service.name}</CardTitle>
              <CardDescription>{service.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-muted-foreground flex items-center justify-between">
                <span className="flex items-center justify-between gap-1">
                  <MapPin className="size-4 text-muted-foreground" />
                  {service.location.city}, {service.location.state}
                </span>

                <span className="text-md flex items-center gap-1">
                  {ratingArr.map((_, idx) => (
                    <Star key={idx} className="size-4 text-amber-500 fill-amber-500" />
                  ))}
                 ({service.reviews?.length || 0} reviews)
                </span>
              </div>

              <div className="mt-4 flex items-center text-lg font-bold gap-2">
                <span>Base Price:</span>
                <span className="flex items-center">
                  <IndianRupee className="size-4" />
                  {service.price}
                </span>
              </div>
            </CardContent>
            <CardFooter className="flex-col gap-2">
              <Button onClick={() => setPopupOpen(true)} size="sm" className="w-full cursor-pointer">
                Book
              </Button>
            </CardFooter>
          </Card>
      </div>
    </div>
  );
}
