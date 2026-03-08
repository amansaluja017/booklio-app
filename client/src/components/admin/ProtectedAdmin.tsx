import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function ProtectedAdmin({children}: {children: React.ReactNode}) {
    const navigate = useNavigate();
    const user = useSelector((state: any) => state.user);

    useEffect(() => {
        if (!user.status || user.userData?.role !== "admin") {
            navigate("/admin/login");
        } else if (user.userData?.role === "customer") {
            navigate("/home");
        } else if (user.userData?.role === "provider") {
            navigate("/provider/dashboard");
        }
    })
  return (
    <>{children}</>
  )
}

export default ProtectedAdmin;