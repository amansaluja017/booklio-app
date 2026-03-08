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
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSession } from "@/lib/auth";
import { useSelector } from "react-redux";

type categoryResponse = {
data: {
  categories: [{ name: string; services_name: string[] }];
}
};

type address = {
  state: string;
  city: string;
  zipCode: string;
  country: string;
};

export default function AddServiceForm() {
  const [categories, setCategories] =
    useState<categoryResponse["data"]["categories"]>();
  const [service, setService] = useState<string[]>([]);
  const [categoryValue, setCategoryValue] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [status, setStatus] = useState<boolean>(true);
  const [serviceValue, setServiceValue] = useState<string>("");

  const session = useSession();
  const address = session.data?.user.address as address;

  const user = useSelector((state: any) => state.user);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await apiClient.addService({
        name: serviceValue,
        category: categoryValue,
        description,
        price,
        status,
      });

      if (response) {
        e.preventDefault();
        setCategoryValue("");
        setServiceValue("");
        setDescription("");
        setPrice("");
        setStatus(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchServices = (value: string) => {
    const category = categories?.find((cat) => cat.name === value);

    if (category) {
      setService(category.services_name);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await apiClient.getCategories();

      if (response) {
        const data = response as categoryResponse;
        setCategories(data.data.categories);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          onClick={() => fetchCategories()}
          className="cursor-pointer">
          Add service
        </Button>
      </DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>Add new service</DialogTitle>
        </DialogHeader>
        <FieldGroup>
          <form onSubmit={(e) => submit(e)}>
            <div className="w-full flex items-center gap-3 justify-end mb-5">
              <label htmlFor="status" className="font-semibold">
                Status
              </label>
              <input
                id="status"
                type="checkbox"
                defaultChecked={status}
                className="toggle toggle-success w-10 rounded-full shadow-2xl cursor-pointer bg-gray-200"
                onChange={() => setStatus(!status)}
              />
            </div>

            <div className="flex items-center gap-2">
              <Field>
                <Label htmlFor="category">Choose Category</Label>
                <Select
                  onValueChange={(value) => {
                    setCategoryValue(value);
                    fetchServices(value);
                  }}
                  value={categoryValue}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Category</SelectLabel>
                      {categories &&
                        categories.map((category, index) => (
                          <SelectItem key={index} value={category.name}>
                            {category.name}
                          </SelectItem>
                        ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Field>

              <Field>
                <Label htmlFor="service">Services</Label>
                <Select onValueChange={(val) => setServiceValue(val)} value={serviceValue}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Services</SelectLabel>
                      {service &&
                        service.map((service, index) => (
                          <SelectItem key={index} value={service}>
                            {service}
                          </SelectItem>
                        ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Field>
            </div>

            <Field>
              <Label className="mt-3" htmlFor="description">
                Description
              </Label>
              <Textarea id="description" name="description" value={description} onChange={(e) => setDescription(e.target.value)} />
            </Field>

            <Field>
              <Label className="mt-3" htmlFor="price">
                Base Price
              </Label>
              <Input id="price" name="price" type="text" onChange={(e) => setPrice(e.target.value)} value={price} />
            </Field>

            <Button className="cursor-pointer w-full mt-5" type="submit">
              Create
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
