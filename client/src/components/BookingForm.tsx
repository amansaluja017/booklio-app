"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import apiClient from "@/utilis/apiClient";
import { useForm } from "react-hook-form";

export default function BookingForm({ service }: { service: any }) {

  const { register, handleSubmit } = useForm();

  const submit = async (data: any) => {
    const file = data.image[0];
    
    const formData = new FormData();
    formData.append("category", data.category);
    formData.append("service", service._id);
    formData.append("notes", data.notes);
    formData.append("date", data.date);
    formData.append("status", "requested");
    formData.append("provider", service.provider._id);
    if (file) {
      formData.append("image", file);
    }
    
    try {
      const response = await apiClient.createBooking(formData);
      if (response) {
        alert("Booking request sent successfully!");
      }
    } catch (error) {
      console.error("Failed to create booking:", error);
      alert("Failed to create booking. Please try again.");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="cursor-pointer">
          book
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Booking Request</DialogTitle>
        </DialogHeader>
        <FieldGroup>
          <form className="mt-10" onSubmit={handleSubmit(submit)}>
            <div className="flex items-center gap-2">
              <Field>
                <Label htmlFor="category">Category</Label>
                <Input
                  value={service?.category?.name || ""}
                  readOnly
                  {...register("category")}
                />
              </Field>

              <Field>
                <Label htmlFor="service">Services</Label>
                <Input
                  value={service?.name || ""}
                  readOnly
                  {...register("service")}
                />
              </Field>
            </div>

            <Field>
              <Label className="mt-3" htmlFor="notes">
                Notes
              </Label>
              <Textarea id="notes" {...register("notes")} />
            </Field>

            <Field className="flex items-center gap-2 mt-2">
              <Label htmlFor="date" className="mt-3">
                Preferred Date & Time
              </Label>
              <Input
                id="date"
                type="datetime-local"
                className="input bg-gray-200"
                {...register("date")}
              />
            </Field>

            <Field className="mt-5">
              <FieldLabel htmlFor="picture">Image</FieldLabel>
              <Input id="picture" type="file" {...register("image")} />
            </Field>

            <Button className="cursor-pointer w-full mt-5" type="submit">
              Request
            </Button>
          </form>
        </FieldGroup>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" className="w-full cursor-pointer">
              Cancel
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
