import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import apiClient from "@/utilis/apiClient";
import Header from "@/components/Header";
import Cards from "@/components/Cards";
import Footer from "@/components/Footer";
import type { servicesResponse } from "@/types/services";

export default function SearchPage() {
  const [data, setData] = useState<Array<servicesResponse> | null>(null);
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const services = await apiClient.getSearchResult(query);
        const data = services as {data: {services: Array<servicesResponse>}};
        if (services) setData(data.data.services);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };
    if (query) fetchServices();
  }, [query]);

  return (
    <div className="w-full min-h-screen flex flex-col">
      <Header />
      <div className="grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mt-8">
          <h1 className="text-3xl font-bold">{query || "Services"}</h1>
          <div className="mt-10">
            {data ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.map((service, index) => (
                  <Cards key={index} service={service} />
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
