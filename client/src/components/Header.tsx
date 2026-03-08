import { useState } from "react";
import { LogOut, Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useDispatch, useSelector } from "react-redux";
import apiClient from "@/utilis/apiClient";
import { logout } from "@/slice/authSlice";

function Header() {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const user = useSelector((state: any) => state.user);
  const dispatch = useDispatch();

  const headerLinks = { Home: "/home", About: "/about", Contact: "/contact" };

  const handleLogout = async () => {
    try {
      const response = await apiClient.logoutCustomer();

      if (response) {
        dispatch(logout());
        navigate("/login");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const handleProviderLogout = async () => {
    try {
      const response = await apiClient.logoutProvider();

      if (response) {
        dispatch(logout());
        navigate("/provider/login");
      }
    } catch (error) {
      console.error("Error during provider logout:", error);
    }
  };

  const handleAdminLogout = async () => {
    try {
      const response = await apiClient.adminLogout();

      if (response) {
        dispatch(logout());
        navigate("/admin/login");
      }
    } catch (error) {
      console.error("Error during admin logout:", error);
    }
  };

  return (
    <header className="w-full bg-background shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <h1 className="font-bold text-2xl">Booklio</h1>
          </div>

          {user?.status && user?.userData?.role === "customer" && (
            <ul className="hidden md:flex space-x-8">
              {Object.entries(headerLinks).map(([label, path]) => (
                <li
                  onClick={() => navigate(path)}
                  key={label}
                  className="cursor-pointer hover:text-primary transition-colors">
                  {label}
                </li>
              ))}
            </ul>
          )}

          <div className="hidden md:block">
            {user.status ?
              <Popover>
                <PopoverTrigger>
                  <div className="bg-blue-700 rounded-full w-10 h-10 cursor-pointer"></div>
                </PopoverTrigger>

                <PopoverContent align="start">
                  <PopoverHeader>
                    <div className="relative flex gap-2">
                      <div className="bg-blue-700 rounded-full w-10 h-10" />
                      <div>
                        <h5 className="font-medium text-lg">
                          {user?.userData?.name}
                        </h5>
                        <h6 className="text-xs">{user?.userData?.email}</h6>

                        {user?.userData?.role === "customer" && (
                          <div className="flex items-center justify-between">
                            <span
                              onClick={() => navigate("/profile")}
                              className="cursor-pointer hover:underline text-md font-medium text-blue-500">
                              view profile
                            </span>
                          </div>
                        )}
                      </div>
                      <span
                        onClick={() => {
                          if (user?.userData?.role === "customer") {
                            handleLogout();
                          } else if (user?.userData?.role === "provider") {
                            handleProviderLogout();
                          } else if (user?.userData?.role === "admin") {
                            handleAdminLogout();
                          }
                        }}
                        className="absolute top-2 right-2 p-2 cursor-pointer text-red-500 rounded-md hover:bg-red-100 transition text-xs">
                        <LogOut className="w-4" />
                      </span>
                    </div>
                  </PopoverHeader>
                </PopoverContent>
              </Popover>
            : <button
                onClick={() => navigate("/login")}
                className="px-4 py-2 bg-primary cursor-pointer text-white rounded-md hover:bg-primary/90 transition">
                Login
              </button>
            }
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              aria-label="Toggle menu">
              {mobileOpen ?
                <X className="w-6 h-6" />
              : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="md:hidden pb-4 space-y-2 animate-fade-in">
            <ul className="flex flex-col space-y-2">
              {["Home", "About", "Contact"].map((label) => (
                <li
                  key={label}
                  className="cursor-pointer px-2 py-1 hover:bg-gray-200 rounded transition">
                  {label}
                </li>
              ))}
            </ul>
            <div>
              {user.status ?
                <button className="w-full px-4 py-2 bg-primary cursor-pointer text-white rounded-md hover:bg-primary/90 transition">
                  Logout
                </button>
              : <button className="w-full px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition">
                  Login
                </button>
              }
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Header;
