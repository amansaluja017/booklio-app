import { LoginForm } from "@/components/admin/LoginForm";

export default function AdminLoginPage() {
  return (
    <div className="w-screen h-screen">
      <div className="h-full w-full flex flex-col items-center justify-center">
        <LoginForm />
      </div>
    </div>
  );
}
