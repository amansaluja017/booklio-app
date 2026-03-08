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
import apiClient from "@/utilis/apiClient";
import {useForm} from "react-hook-form";

export default function MarkInProgress({request, setMarkInProgressPopup}: {request: any, setMarkInProgressPopup: (value: boolean) => void}) {
    const { register, handleSubmit } = useForm();

    const onSubmit = async (data: any) => {
      const beforeImage = data["before-image"][0];
      
      if (!beforeImage) {
        alert("Please select a before image");
        return;
      }

      const formData = new FormData();
      formData.append("beforeImage", beforeImage);
      formData.append("bookingId", request._id);

      try {
        await apiClient.inProgressBooking(formData);
        alert("Booking marked as in progress successfully!");
        setMarkInProgressPopup(false);
      } catch (error) {
        console.error(error);
        alert("Failed to mark booking as in progress. Please try again.");
      }
    };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="cursor-pointer bg-black text-white hover:bg-gray-100">
          Mark as In Progress
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Mark as In Progress</DialogTitle>
        </DialogHeader>
        <FieldGroup>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex items-center gap-2">
              <Field>
                <Label htmlFor="category">Category</Label>
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
              <Label className="mt-3" htmlFor="before-image">
                Before image
              </Label>
              <Input id="before-image" type="file" {...register("before-image", { required: true })} />
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
