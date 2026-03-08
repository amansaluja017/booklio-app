import Footer from "@/components/Footer";
import ProviderCalendar from "@/components/FullCalender";
import Header from "@/components/Header";
import apiClient from "@/utilis/apiClient";
import { useEffect, useState } from "react";

type bookingProps = { bookings: []; events: [] };

export default function ProviderSchedulePage() {
  const [events, setEvents] = useState<bookingProps>({ bookings: [], events: [] });

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await apiClient.getBookings();
        const data = response as {data: { bookings: []; events: [] }};
        setEvents(data.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchEvents();
  }, []);

  return (
    <div className="w-full min-h-screen flex flex-col">
      <Header />
      <div className="grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="text-center">
          <h1 className="font-bold text-2xl">Schedule</h1>
        </div>
        <div className="mt-5">
          <ProviderCalendar events={events.events} />
        </div>
      </div>
      <Footer />
    </div>
  );
}
