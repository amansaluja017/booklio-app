import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function ProtectedProvider({children}: {children: React.ReactNode}) {
    const user = useSelector((state: any) => state.user);
    const navigate = useNavigate();


    useEffect(() => {
        if (!user.status || user.userData?.role !== "provider") {
            navigate("/provider/login");
        } else if (user.userData?.role === "customer") {
            navigate("/home");
        } else if (user.userData?.role === "admin") {
            navigate("/admin/dashboard");
        }
    })
  return (
    <>{children}</>
  )
}

export default ProtectedProvider;