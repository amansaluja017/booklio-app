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
import apiClient from "@/utilis/apiClient";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import AddressForm from "../AddressForm";
import { useDispatch } from "react-redux";
import { signup } from "@/slice/authSlice";

export function RegisterForm() {
  const { register, handleSubmit } = useForm();
  const [email, setEmail] = useState<string>("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submit = async (data: object) => {
    try {
      const response = await apiClient.registerCustomer(data);

      if (response) {
        setEmail((data as any).email);
        dispatch(signup(response));
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
        <Card className="w-full max-w-sm outline-none shadow-2xl">
          <CardHeader>
            <CardTitle>Register</CardTitle>
            <CardDescription>Hello!</CardDescription>
            <CardAction onClick={() => navigate("/login")}>
              <Button variant="link">Sign In</Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(submit)}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your name"
                    required
                    {...register("name", { required: true })}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    {...register("email", { required: true })}
                  />
                </div>

                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    required
                    {...register("password", { required: true })}
                  />
                </div>

                <div className="cursor-pointer flex justify-between">
                  <span onClick={() => navigate("/provider/register")} className="text-sm text-blue-800 hover:underline">Register as provider?</span>
                  <span onClick={() => navigate("/admin/login")} className="text-green-800 hover:underline text-sm">Admin</span>
                </div>
              </div>

              <CardFooter className="flex-col gap-2 mt-5">
                <Button
                  type="submit"
                  className="w-full cursor-pointer hover:opacity-90">
                  Register
                </Button>
              </CardFooter>
            </form>
          </CardContent>
        </Card>
    </>
  );
}
