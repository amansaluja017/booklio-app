import { LoginForm } from "@/components/provider/LoginForm";

export default function ProviderLoginPage() {
  return (
    <div className="w-screen h-screen">
      <div className="h-full w-full flex flex-col items-center justify-center">
        <LoginForm />
      </div>
    </div>
  );
}
