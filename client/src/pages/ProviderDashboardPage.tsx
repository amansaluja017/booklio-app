import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Cards } from "@/components/provider/DashboardCards";
import { RequestCards } from "@/components/provider/RequestCards";
import { Button } from "@/components/ui/button";
import { ManageServiceCard } from "@/components/provider/ManageServiceCard";
import AddServiceForm from "@/components/provider/AddServiceForm";
import { useNavigate } from "react-router-dom";
import { ConfirmBookingTable } from "@/components/provider/ConfirmBookingTable";
import { useSelector } from "react-redux";
import { useState } from "react";
import SetupStoreForm from "@/components/provider/SetupStore";
import Notification from "@/components/Notification";

export default function ProviderDashboardPage() {
  const navigate = useNavigate();
  const user = useSelector((state: any) => state.user);
  const [isSetupCompletePanel, setIsSetupCompletePanel] = useState(false);

  return (
    <div className="w-full min-h-screen flex flex-col">
      <Header />
      {!user?.userData?.store && (<Notification text="Update store details for creating services" />)}
      {!user?.userData?.isAprooved && (<Notification text="Wait for approval. Once approved, you can create services. Please re-login for updates." />)}
      {isSetupCompletePanel && (
        <SetupStoreForm setIsSetupCompletePanel={setIsSetupCompletePanel} />
      )}
      <div className="grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <h3 className="text-3xl font-black">Provider Dashboard</h3>
        <div className="flex items-center justify-between mt-6">
          <div className="mt-10 flex items-start gap-4">
            <div className="bg-blue-500 h-[100px] w-[100px] rounded-full"></div>
            <div className="">
              <h4 className="text-2xl font-bold">{user.userData.name}</h4>
              <h5>{user.userData.email}</h5>
              <span className="italic text-sm">
                {user.userData.isAprooved ? "verified" : "not verified"}
              </span>
            </div>
            <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm">
              Active
            </span>
          </div>
          {user?.userData?.role === "provider" && !user?.userData?.store && (
            <Button
              onClick={() => setIsSetupCompletePanel(true)}
              className="cursor-pointer">
              Create Store
            </Button>
          )}

          {user?.userData?.role === "provider" && user?.userData?.store && (
            <Button
              onClick={() => navigate("/provider/dashboard/schedule")}
              className="cursor-pointer">
              View Schedule
            </Button>
          )}
        </div>
        <div>
          <div className="flex items-center justify-between mt-10">
            <h3 className="text-2xl font-bold">Booking Requests</h3>
            {/* <Button className="cursor-pointer">View All</Button> */}
          </div>
          <div className="w-full border-2 rounded-2xl mt-5">
            <div className="p-3">
              <RequestCards />
            </div>
          </div>
        </div>
        <div>
          <div className="mt-10">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold">Confirm Bookings</h3>
            </div>
            <div className="mt-5">
              <ConfirmBookingTable />
            </div>
          </div>
        </div>
        <div>
          {user?.userData?.isAprooved && (
            <div className="mt-10">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold">Manage Services</h3>
                <AddServiceForm />
              </div>
              <div className="mt-5">
                <ManageServiceCard />
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
