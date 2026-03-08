import { RegisterForm } from "@/components/customer/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="w-screen h-screen">
      <div className="h-full w-full flex flex-col items-center justify-center">
        <RegisterForm />
      </div>
    </div>
  );
}
