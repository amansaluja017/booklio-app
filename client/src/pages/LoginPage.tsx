import { LoginForm } from "@/components/customer/LoginForm";

export default function LoginPage() {
  return (
    <div className="w-screen h-screen">
      <div className="h-full w-full flex flex-col items-center justify-center">
        <LoginForm />
      </div>
    </div>
  );
}
