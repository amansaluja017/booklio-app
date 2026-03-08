import AddCategoryForm from "@/components/admin/AddCategoryForm";
import { CategoryTable } from "@/components/admin/CategoryTable";
import { ProviderApprovalTable } from "@/components/admin/ProviderApprovalTable";
import { ReviewModerationTable } from "@/components/admin/ReviewModerationTable";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useSelector } from "react-redux";
import { useState } from "react";

export default function AdminDashboardPage() {
  const user = useSelector((state: any) => state.user);
  const [activeTab, setActiveTab] = useState("categories");

  const tabs = [
    { id: "categories", label: "Manage Categories", icon: "📁" },
    { id: "providers", label: "Approve Providers", icon: "👤" },
    { id: "reviews", label: "Moderate Reviews", icon: "⭐" },
  ];

  return (
    <div className="w-full min-h-screen flex flex-col">
      <Header />
      <div className="grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <h3 className="text-3xl font-black">Admin Dashboard</h3>
        
        {/* Admin Info Card */}
        <div className="flex items-center justify-between mt-6">
          <div className="mt-10 flex items-center gap-4">
            <div className="bg-blue-500 h-[100px] w-[100px] rounded-full flex items-center justify-center text-white text-3xl font-bold">
              {user.userData?.name?.charAt(0).toUpperCase()}
            </div>
            <div className="">
              <h4 className="text-2xl font-bold">{user.userData?.name}</h4>
              <h5 className="text-gray-600">{user.userData?.email}</h5>
            </div>
          </div>
          <div>
            <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">Active</span>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="mt-12">
          <div className="flex gap-4 border-b border-gray-200 mb-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 font-semibold text-lg transition-all ${
                  activeTab === tab.id
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            {/* Categories Tab */}
            {activeTab === "categories" && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold">Manage Categories</h3>
                  <AddCategoryForm />
                </div>
                <CategoryTable />
              </div>
            )}

            {/* Providers Tab */}
            {activeTab === "providers" && (
              <div>
                <h3 className="text-2xl font-bold mb-6">Approve Providers</h3>
                <ProviderApprovalTable />
              </div>
            )}

            {/* Reviews Tab */}
            {activeTab === "reviews" && (
              <div>
                <h3 className="text-2xl font-bold mb-6">Moderate Reviews</h3>
                <ReviewModerationTable />
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
