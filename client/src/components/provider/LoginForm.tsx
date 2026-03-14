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
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import apiClient from "@/utilis/apiClient";
import { useDispatch } from "react-redux";
import { login } from "@/slice/authSlice";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginProviderValidation } from "@/validations/validation";

type LoginFormTypes = {
  email: string;
  password: string;
};

interface LoginFormProps {

  data: {
    user: {
      email: string;
      _id: string;
      address: {
        city: string;
        state: string;
        country: string;
        zipCode: string;
      };
      role: string;
      isAprooved: boolean;
    }
  }
}

export function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<{ email: string, password: string }>({ resolver: zodResolver(loginProviderValidation) });
  const [errorMessage, setErrorMessage] = useState<string>("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submit = async (data: LoginFormTypes) => {
    const { email, password } = data;
    try {
      const response = await apiClient.loginProvider({ email, password });
      const data = response as LoginFormProps;

      if (data) {
        dispatch(login(data.data.user))
        navigate("/provider/dashboard");
      }
      
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Failed to login provider")
    }
  };

  return (
    <Card className="w-full max-w-sm outline-none shadow-2xl">
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
        <CardAction onClick={() => navigate("/provider/register")}>
          <Button variant="link">Sign Up</Button>
        </CardAction>
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
              <span onClick={() => navigate("/register")} className="text-sm text-blue-800 hover:underline cursor-pointer">Login as customer?</span>
              <span onClick={() => navigate("/admin/login")} className="text-sm text-green-800 hover:underline cursor-pointer ml-4">Login as admin?</span>
            </div>
          </div>

          <CardFooter className="flex-col gap-2 mt-5">
            <Button
              type="submit"
              className="w-full hover:opacity-90 cursor-pointer"
            >
              Login
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}
