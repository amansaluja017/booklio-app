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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import apiClient from "@/utilis/apiClient";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Update } from "@/slice/authSlice";

type LoginFormTypes = {
  city: string;
  state: string;
  country: string;
  zipCode: string;
  phone?: string;
};

export default function AddressForm({
  setAddressFormOpen,
}: {
  setAddressFormOpen: (open: boolean) => void;
}) {
  const { register, handleSubmit, watch, setValue } = useForm<LoginFormTypes>();
  const [states, setStates] = useState<{ name: string; iso2: string }[]>([]);
  const [cities, setCities] = useState<{ name: string; iso2: string }[]>([]);
  const user = useSelector((state: any) => state.user);

  const selectedState = watch("state");
  const selectedCity = watch("city");
  const dispatch = useDispatch();

  const submit = async (data: LoginFormTypes) => {
    try {
      const response = await apiClient.updateAddress(data);

      if (response) {
        dispatch(Update({ ...user.userData, address: data }));
        setAddressFormOpen(false);
      }
    } catch (error) {
      console.error(error);
      throw new Error("Failed to update address");
    }
  };

  useEffect(() => {
    const getStatesByCountry = async (countryCode: string) => {
      const response = await fetch(
        `https://api.countrystatecity.in/v1/countries/${countryCode}/states`,
        {
          headers: { "X-CSCAPI-KEY": import.meta.env.VITE_ADDRESSAPIKEY! },
        },
      );

      if (response.ok) {
        const states = await response.json();
        setStates(states);
      } else {
        console.error("Country not found or no states available");
      }
    };

    getStatesByCountry("IN");
  }, []);

  const getCitiesByState = async (countryCode: string, state: string) => {
    const stateCode = states.find((s) => s.name === state)?.iso2;
    if (!stateCode) {
      console.error("State not found");
      return;
    }
    const response = await fetch(
      `https://api.countrystatecity.in/v1/countries/${countryCode}/states/${stateCode}/cities`,
      {
        headers: { "X-CSCAPI-KEY": import.meta.env.VITE_ADDRESSAPIKEY! },
      },
    );

    if (response.ok) {
      const cities = await response.json();
      setCities(cities);
    } else {
      console.error("State not found or no cities available");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 bg-black/50 z-50 animate-fade-in">
      <Card className="w-full max-w-sm outline-none">
        <CardHeader>
          <CardTitle>Add address</CardTitle>
          <CardDescription>
            Enter your address details below to find nearby service providers.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(submit)}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="city">State</Label>
                </div>
                <Select
                  value={selectedState}
                  onValueChange={(value) => {
                    setValue("state", value);
                    getCitiesByState("IN", value);
                  }}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a state" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>State</SelectLabel>
                      {states && states.length > 0 ?
                        states.map((state, i) => (
                          <SelectItem key={i} value={state.name}>
                            {state.name}
                          </SelectItem>
                        ))
                      : <SelectItem value="no-states" disabled>
                          No states available
                        </SelectItem>
                      }
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="city">City</Label>
                </div>
                <Select
                  value={selectedCity}
                  onValueChange={(value) => setValue("city", value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a city" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>City</SelectLabel>
                      {cities && cities.length > 0 ?
                        cities.map((city, i) => (
                          <SelectItem key={i} value={city.name}>
                            {city.name}
                          </SelectItem>
                        ))
                      : <SelectItem value="no-cities" disabled>
                          No cities available
                        </SelectItem>
                      }
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="country">Country</Label>
                </div>
                <Input
                  id="country"
                  type="text"
                  value="India"
                  readOnly
                  {...register("country", { required: true })}
                />
              </div>

              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="zipCode">Zip Code</Label>
                </div>
                <Input
                  id="zipCode"
                  type="text"
                  placeholder="Enter your zip code"
                  required
                  {...register("zipCode", { required: true })}
                />
              </div>

              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="phone">Phone</Label>
                </div>
                <Input
                  id="phone"
                  type="text"
                  placeholder="Enter your phone number"
                  required
                  {...register("phone")}
                />
              </div>
            </div>

            <CardFooter className="flex-col gap-2">
              <Button
                type="submit"
                className="w-full bg-black text-white mt-5 cursor-pointer">
                Add
              </Button>

              <Button
                onClick={() => setAddressFormOpen(false)}
                type="submit"
                className="w-full text-black cursor-pointer" variant="outline">
                Cancel
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
