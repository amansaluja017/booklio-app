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

export default function CategoryCard({service}: {service: any}) {
    const [popupOpen, setPopupOpen] = useState<boolean>(false);

  return (
    <div className="w-full">
        {popupOpen && <PopupCard open={popupOpen} setOpen={setPopupOpen} service={service} />}

      <div className="">
          <Card
            className="mx-auto w-full max-w-sm cursor-pointer hover:scale-110 transform transition duration-300"
          >
            <CardHeader>
              <CardTitle className="text-xl">{service.name}</CardTitle>
              <CardDescription>{service.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-muted-foreground flex items-center justify-between">
                <span className="flex items-center justify-between gap-1">
                  <MapPin className="size-4 text-muted-foreground" />
                  {service.location.city}, {service.location.state}
                </span>

                <span className="text-sm flex items-center">
                  <Star className="size-4 text-yellow-500 fill-amber-400 inline mr-1" />
                  {service.rating}
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
