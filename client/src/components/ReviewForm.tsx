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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import apiClient from "@/utilis/apiClient";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function ReviewForm(requestId: any) {
  const { register, handleSubmit } = useForm<{ comment: string }>();
  const [rating, setRating] = useState<number>(0);

  const submit = async (data: { comment: string}) => {
    try {
        const response = await apiClient.postReview({ rating, comment: data.comment, serviceId: requestId.requestId }); 
    } catch (error) {
        console.error("Error submitting review:", error);
    }
  }

  const ratingArray = Array.from({length: 5});

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="cursor-pointer bg-black text-white hover:bg-gray-100">
          Rate this service
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Review</DialogTitle>
        </DialogHeader>
        <FieldGroup>
          <form onSubmit={handleSubmit(submit)}>
            <div className="text-center">
              <div className="rating">
                {ratingArray.map((_, index) => (
                  <input
                    key={index}
                    type="radio"
                    className="mask mask-star-2 bg-orange-400"
                    aria-label={`${index + 1} star`}
                    onClick={() => setRating(index + 1)}
                  />
                ))}

                {/* <input
                  type="radio"
                  name="rating-2"
                  className="mask mask-star-2 bg-orange-400"
                  aria-label="1 star"
                />
                <input
                  type="radio"
                  name="rating-2"
                  className="mask mask-star-2 bg-orange-400"
                  aria-label="2 star"
                />
                <input
                  type="radio"
                  name="rating-2"
                  className="mask mask-star-2 bg-orange-400"
                  aria-label="3 star"
                />
                <input
                  type="radio"
                  name="rating-2"
                  className="mask mask-star-2 bg-orange-400"
                  aria-label="4 star"
                />
                <input
                  type="radio"
                  name="rating-2"
                  className="mask mask-star-2 bg-orange-400"
                  aria-label="5 star"
                /> */}
              </div>
            </div>

            <Field>
              <Label className="mt-3" htmlFor="notes">
                Feedback
              </Label>
              <Textarea
                id="notes"
                minLength={10}
                maxLength={100}
                {...register("comment", { required: true })}
              />
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
