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
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import apiClient from "@/utilis/apiClient";
import {useForm} from "react-hook-form";

export default function MarkCompleted({request, setMarkCompletedPopup}: {request: any, setMarkCompletedPopup: (value: boolean) => void}) {
    const { register, handleSubmit } = useForm();

    const onSubmit = async (data: any) => {
      const afterImage = data["after-image"][0];
      const formData = new FormData();
      formData.append("afterImage", afterImage);
      formData.append("notes", data.notes);
      formData.append("price", data.price);
      formData.append("otp", data.otp);
      formData.append("bookingId", request._id);

      try {
        await apiClient.completeBooking(formData);
        alert("Booking marked as completed successfully!");
        setMarkCompletedPopup(false);
      } catch (error) {
        alert("Failed to mark booking as completed. Please try again.");
      }
    };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="cursor-pointer bg-black text-white hover:bg-gray-100">
          Mark as Completed
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Mark as Completed</DialogTitle>
        </DialogHeader>
        <FieldGroup>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex items-center gap-2">
              <Field>
                <Label htmlFor="category">Choose Category</Label>
                <Input
                  id="category"
                  type="text"
                  readOnly
                  value={request?.category}
                />
              </Field>

              <Field>
                <Label htmlFor="service">Services</Label>
                <Input
                  id="service"
                  type="text"
                  readOnly
                  value={request?.service?.name}
                />
              </Field>
            </div>

            <Field>
              <Label className="mt-3" htmlFor="after-image">
                After image
              </Label>
              <Input id="after-image" type="file" {...register("after-image", { required: true })} />
            </Field>

            <Field>
              <Label className="mt-3" htmlFor="notes">
                Notes
              </Label>
              <Textarea id="notes" minLength={10} maxLength={50} {...register("notes", { required: true })} />
            </Field>

            <Field>
              <Label className="mt-3" htmlFor="price">
                Final Price
              </Label>
              <Input id="price" type="text" {...register("price", { required: true })} />
            </Field>

            <Field>
              <Label className="mt-3" htmlFor="otp">
                OTP
              </Label>
              <Input id="otp" type="text" {...register("otp", { required: true })} />
            </Field>

            <Button className="cursor-pointer w-full mt-5" type="submit">
              Submit
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
