"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import apiClient from "@/utilis/apiClient";
import { X } from "lucide-react";
import React, { useState } from "react";

export default function AddCategoryForm() {
  const [service, setService] = useState<string>("");
  const [services, setServices] = useState<string[]>([]);
  const [name, setName] = useState<string>("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await apiClient.addCategory({ name, services });

      if (response) {
        services.length = 0;
        setService("");
        setName("");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="cursor-pointer">
          Add category
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Add new category</DialogTitle>
          <DialogDescription>
            Add a new category and its services. Click Create when you&apos;re
            done.
          </DialogDescription>
        </DialogHeader>
        <FieldGroup>
          <form onSubmit={(e) => submit(e)}>
            <Field>
              <Label htmlFor="name-1">Name</Label>
              <Input
                id="name-1"
                placeholder="Enter a category"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Field>
            <Field>
              <Label className="mt-3" htmlFor="service">
                Services
              </Label>
              <div className="grid grid-cols-3 gap-2 text-sm relative">
                {services &&
                  services.map((service, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 p-2 rounded-md flex items-center justify-between">
                      {service}{" "}
                      <X
                        onClick={() =>
                          setServices(services.filter((_, i) => i !== index))
                        }
                        className="size-3 cursor-pointer"
                      />
                    </span>
                  ))}
              </div>
              <div className="relative">
                <Input
                onChange={(val) => setService(val.target.value)}
                value={service}
                id="service"
                name="service"
              />
              <div className="absolute right-0 top-0 flex items-center justify-end">
                <div
                  onClick={() =>
                  (!services.includes(service) &&
                    setServices([...services, service])
                  )
                  }
                  className="cursor-pointer p-1.5 px-4 bg-[#171717] hover:opacity-90 text-white rounded-md w-max text-center">
                  Add
                </div>
              </div>
              </div>
              <Button className="cursor-pointer" type="submit">Create</Button>
            </Field>
          </form>
        </FieldGroup>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" className="w-full cursor-pointer">Cancel</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
