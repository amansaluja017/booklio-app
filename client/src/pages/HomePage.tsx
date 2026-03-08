import Header from "@/components/Header";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Cards from "@/components/Cards";
import Footer from "@/components/Footer";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import apiClient from "@/utilis/apiClient";
import SuggestionPanel from "@/components/SuggestionPanel";
import CategoryArea from "@/components/CategoryArea";
import type { servicesResponse } from "@/types/services";
import { useSelector } from "react-redux";
import Notification from "@/components/Notification";

export default function HomePage() {
  const [data, setData] = useState<Array<unknown>>([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  const user = useSelector((state: any) => state.user);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const services = await apiClient.getServices();
        const data = services as servicesResponse;
        if (services) setData(data.data.services.filter((service) => service.status));
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };
    fetchServices();
  }, []);

  const handleEnterkey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      params.set("query", search);
      navigate(`/search/?${params.toString()}`);
    }
  };

  return (
    <div className="relative w-full min-h-screen flex flex-col">
      <Header />
      {!user?.userData?.address && (<Notification text="Please update your address in your profile to access all features." />)}
      <main className="grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative mt-10 max-w-3xl mx-auto w-full">
          <Field orientation="horizontal" className="w-full">
            <Input
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              onKeyDown={handleEnterkey}
              type="search"
              placeholder="Search services, city, state..."
              className="w-full hover:scale-105 transform transition duration-300 placeholder:italic"
            />
          </Field>
          {search && <SuggestionPanel search={search} setSearch={setSearch} />}
        </div>
        <div>
          <CategoryArea />
        </div>
        <div className="mt-20 grid w-full grid-cols-3 gap-5">
          {data?.map((service, idx) => (
            <section key={idx} className="mt-5">
              <Cards service={service} />
            </section>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
