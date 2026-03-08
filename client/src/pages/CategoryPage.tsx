import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CategoryCard from "@/components/CategoryCard";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import apiClient from "@/utilis/apiClient";

type SearchResult = {
  data: {
      searchedServices: {
    name: string;
    services: Array<{
      _id: string;
      name: string;
      category: { name: string };
      description: string;
      location: { state: string; city: string; zipCode: string; country: string };
      price: number;
      status: string;
      provider: {
        name: string;
        email: string;
        phone: string;
        address: { state: string; city: string; zipCode: string; country: string };
      };
    }>;
  };
  }
};

export default function CategoryPage() {
  const [service, setService] = useState<SearchResult | null>(null);
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const results = await apiClient.searchServices(query);
        if (results) setService(results as  SearchResult);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };
    if (query) fetchSearchResults();
  }, [query]);

  return (
    <div className="w-full min-h-screen flex flex-col">
      <Header />
      <div className="grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mt-8">
          <h1 className="text-3xl font-bold">{searchParams.get("name") || "Services"}</h1>
          <div className="mt-10">
            {service ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {service.data.searchedServices.services.map((s) => (
                  <CategoryCard key={s._id} service={s} />
                ))}
              </div>
            ) : (
              <div>
                <h1>No service found</h1>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
