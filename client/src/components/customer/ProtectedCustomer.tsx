import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function ProtectedCustomer({ children }: { children: React.ReactNode }) {
  const user = useSelector((state: any) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.status || user.userData?.role !== "customer") {
      navigate("/login");
    } else if (user.userData?.role === "provider") {
      navigate("/provider/dashboard");
    } else if (user.userData?.role === "admin") {
      navigate("/admin/dashboard");
    }
  }, [user, navigate]);

  return <>{children}</>;
}

export default ProtectedCustomer;
