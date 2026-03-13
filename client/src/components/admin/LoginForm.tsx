import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import apiClient from "@/utilis/apiClient";
import { useDispatch } from "react-redux";
import { login } from "@/slice/authSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginAdminValidations } from "../../../../validations/validation";
import { useState } from "react";

type LoginFormTypes = {
  email: string;
  password: string;
};

export function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormTypes>({ resolver: zodResolver(loginAdminValidations) });
  const [errorMessage, setErrorMessage] = useState<string>("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submit = async (data: LoginFormTypes) => {
    const { email, password } = data;
    try {
      const res = await apiClient.adminLogin({ email, password });

      if (res) {
        const data = res as {data: {user: LoginFormTypes, token: string}};
        dispatch(login(data.data.user));
        navigate("/admin/dashboard");
      }
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Failed to login admin")
      throw new Error("Failed to login admin");
    }
  };

  return (
    <Card className="w-full max-w-sm outline-none shadow-2xl">
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(submit)}>
          <div className="flex flex-col gap-6">
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
              {errors.email?.message || errors.password?.message || errorMessage}
            </p>

            <div className="flex justify-between">
              <span onClick={() => navigate("/login")} className="text-sm text-blue-800 hover:underline cursor-pointer">Login as customer?</span>
              <span onClick={() => navigate("/provider/login")} className="text-sm text-green-800 hover:underline cursor-pointer">Login as provider?</span>
            </div>
          </div>

          <CardFooter className="flex-col gap-2 mt-5">
            <Button
              type="submit"
              className="w-full cursor-pointer">
              Login
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}
