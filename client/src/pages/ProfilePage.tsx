import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { RequestCards } from "@/components/customer/RequestCards";
import { Edit } from "lucide-react";
import EditDetailsForm from "@/components/customer/EditDetailsForm";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import AddressForm from "@/components/AddressForm";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const user = useSelector((state: any) => state.user);
  const [isAddingAddress, setIsAddingAddress] = useState(false);

  return (
    <div className="w-full min-h-screen flex flex-col">
      <Header />
      <div className="grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {isEditing && <EditDetailsForm setIsEditing={setIsEditing} />}
        {isAddingAddress && <AddressForm setAddressFormOpen={setIsAddingAddress} />}
        <h1 className="text-3xl font-bold text-center mt-10">Profile Page</h1>
        <div className="flex items-center justify-between mt-6">
          <div className="mt-10 flex items-center gap-4">
            <div className="bg-blue-500 h-[100px] w-[100px] rounded-full"></div>
            <div className="relative">
              <div onClick={() => setIsEditing(true)} className="absolute right-0">
                <Edit className="text-blue-500" />
              </div>
              <h4 className="text-2xl font-bold">{user?.userData.name}</h4>
              <h5>{user?.userData.email}</h5>
            </div>
          </div>

          {(user?.userData.role === "customer" && !user?.userData.address ) && (
            <Button onClick={() => setIsAddingAddress(true)}>
              Add Address
            </Button>
          )}

          {(user?.userData.role === "customer" && user?.userData.address ) && (
            <Button onClick={() => setIsAddingAddress(true)}>
              update Address
            </Button>
          )}
        </div>
        <div>
          <div className="flex items-center justify-between mt-10">
            <h3 className="text-2xl font-bold">Booking Requests</h3>
          </div>
          <div className="w-full border-2 rounded-2xl mt-5">
            <div className="p-3">
              <RequestCards />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
