import { RegisterForm } from "@/components/provider/RegisterForm";

export default function ProviderRegisterPage() {
  return (
    <div className="w-screen h-screen">
      <div className="h-full w-full flex flex-col items-center justify-center">
        <RegisterForm />
      </div>
    </div>
  );
}
