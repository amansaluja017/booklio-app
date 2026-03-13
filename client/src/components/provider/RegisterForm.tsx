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
import { useDispatch } from "react-redux";
import { signup } from "@/slice/authSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { providerRegister } from "../../../../server/validations/validation";

interface RegisterFormData {
  email: string;
  name: string;
  password: string;
}

export function RegisterForm() {

  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormData>({ resolver: zodResolver(providerRegister) });
  const [errorMessage, setErrorMessage] = useState<string>("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submit = async (data: RegisterFormData) => {
    try {
      const response = await apiClient.registerProvider(data);

      if (response) {
        dispatch(signup(response));
        navigate("/provider/login");
      }
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : String(error));
    }
  };

  return (
    <Card className="w-full max-w-sm outline-none shadow-2xl">
      <CardHeader>
        <CardTitle>Register</CardTitle>
        <CardDescription>Hello!</CardDescription>
        <CardAction onClick={() => navigate("/provider/login")}>
          <Button variant="link">Sign In</Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(submit)}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="company">Name</Label>
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

            <p className="text-xs text-muted-foreground text-red-500">
              {errors.email?.message ||
                errors.password?.message ||
                errorMessage}
            </p>

            <div className="cursor-pointer flex justify-between">
              <span
                onClick={() => navigate("/register")}
                className="text-sm text-blue-800 hover:underline"
              >
                Register as customer?
              </span>
              <span
                onClick={() => navigate("/admin/login")}
                className="text-green-800 hover:underline text-sm"
              >
                Admin
              </span>
            </div>
          </div>

          <CardFooter className="flex-col gap-2 mt-5">
            <Button type="submit" className="w-full cursor-pointer">
              Register
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}
