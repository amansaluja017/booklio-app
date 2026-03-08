import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/lib/auth";
import IndexPage from "@/pages/IndexPage";
import HomePage from "@/pages/HomePage";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";
import SearchPage from "@/pages/SearchPage";
import CategoryPage from "@/pages/CategoryPage";
import ProfilePage from "@/pages/ProfilePage";
import ProviderDashboardPage from "@/pages/ProviderDashboardPage";
import ProviderSchedulePage from "@/pages/ProviderSchedulePage";
import ProviderLoginPage from "@/pages/ProviderLoginPage";
import ProviderRegisterPage from "@/pages/ProviderRegisterPage";
import AdminLoginPage from "@/pages/AdminLoginPage";
import AdminDashboardPage from "@/pages/AdminDashboardPage";
import ProtectedCustomer from "./components/customer/ProtectedCustomer";
import ProtectedProvider from "./components/provider/ProtectedProvider";
import ProtectedAdmin from "./components/admin/ProtectedAdmin";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";

function App() {
  return (
    <AuthProvider refetchInterval={5 * 60}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<IndexPage />} />
          <Route
            path="/home"
            element={
              <ProtectedCustomer>
                <HomePage />
              </ProtectedCustomer>
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/category" element={<CategoryPage />} />
          <Route
            path="/profile"
            element={
              <ProtectedCustomer>
                <ProfilePage />
              </ProtectedCustomer>
            }
          />
          <Route path="/provider/login" element={<ProviderLoginPage />} />
          <Route path="/provider/register" element={<ProviderRegisterPage />} />
          <Route
            path="/provider/dashboard"
            element={
              <ProtectedProvider>
                <ProviderDashboardPage />
              </ProtectedProvider>
            }
          />
          <Route
            path="/provider/dashboard/schedule"
            element={
              <ProtectedProvider>
                <ProviderSchedulePage />
              </ProtectedProvider>
            }
          />
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedAdmin>
                <AdminDashboardPage />
              </ProtectedAdmin>
            }
          />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
          
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
