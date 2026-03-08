"use client"

import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import timeGridPlugin from "@fullcalendar/timegrid"
import interactionPlugin from "@fullcalendar/interaction"
import { Card } from "@/components/ui/card"
import { useRef, useState } from "react"
import { EventDataForm } from "./EventDataForm"

export default function ProviderCalendar({ events }: { events: any[] }) {
  const calendarRef = useRef<FullCalendar | null>(null);
  const [eventData, setEventData] = useState<object>({});
  const [eventDataFormOpen, setEventDataFormOpen] = useState<boolean>(false);

  const handleViewChange = (viewType: "dayGridMonth" | "timeGridWeek" | "timeGridDay") => {
    if (calendarRef.current) {
      calendarRef.current.getApi().changeView(viewType)
    }
  }

   const handleEventClick = (info: any) => {
    setEventData({
      title: info.event.title,
      start: info.event.start,
      location: info.event.location,
      ...info.event.extendedProps
    });
    setEventDataFormOpen(true);
  };

  return (
    <Card className="w-full bg-white border-gray-200 shadow-lg relative">
      {eventDataFormOpen && (
        <EventDataForm event={eventData} setEventDataFormOpen={setEventDataFormOpen} />
      )}
      <div className="p-6">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Schedule</h2>
            <p className="text-sm text-gray-500">Manage your bookings and availability</p>
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={() => handleViewChange("dayGridMonth")}
              className="px-4 py-2 rounded-lg font-medium transition-all bg-gray-100 text-gray-700 hover:bg-blue-600 hover:text-white cursor-pointer"
            >
              Month
            </button>
            <button
              onClick={() => handleViewChange("timeGridWeek")}
              className="px-4 py-2 rounded-lg font-medium transition-all bg-blue-600 cursor-pointer text-white shadow-md hover:bg-blue-700"
            >
              Week
            </button>
            <button
              onClick={() => handleViewChange("timeGridDay")}
              className="px-4 py-2 rounded-lg font-medium transition-all cursor-pointer bg-gray-100 text-gray-700 hover:bg-blue-600 hover:text-white"
            >
              Day
            </button>
          </div>
        </div>

        <div className="fc-custom rounded-xl border border-gray-200 bg-linear-to-br from-white to-gray-50 p-4 shadow-sm">
          <FullCalendar
            ref={calendarRef}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="timeGridWeek"
            selectable={true}
            editable={true}
            events={events}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: ""
            }}
            height="auto"
            contentHeight="auto"
            eventClick={handleEventClick}
          />
        </div>
      </div>

      <style>{`
        .fc-custom {
          font-family: inherit;
        }

        .fc-custom .fc-button-primary {
          background-color: #3b82f6;
          border-color: #3b82f6;
          color: white;
          text-transform: capitalize;
          font-weight: 500;
          border-radius: 0.5rem;
          padding: 0.5rem 1rem;
        }

        .fc-custom .fc-button-primary:hover {
          background-color: #2563eb;
          border-color: #2563eb;
        }

        .fc-custom .fc-button-primary.fc-button-active {
          background-color: #1d4ed8;
          border-color: #1d4ed8;
        }

        .fc-custom .fc-button-primary:disabled {
          background-color: #e5e7eb;
          border-color: #e5e7eb;
          color: #9ca3af;
        }

        .fc-custom .fc-col-header-cell {
          background-color: #f3f4f6;
          color: #374151;
          font-weight: 600;
          padding: 1rem 0.5rem;
          border-color: #e5e7eb;
        }

        .fc-custom .fc-daygrid-day {
          border-color: #e5e7eb;
        }

        .fc-custom .fc-daygrid-day:hover {
          background-color: #f9fafb;
        }

        .fc-custom .fc-daygrid-day.fc-day-today {
          background-color: #dbeafe !important;
        }

        .fc-custom .fc-daygrid-day-number) {
          padding: 0.5rem;
          color: #374151;
          font-weight: 500;
        }

        .fc-custom .fc-daygrid-day-frame {
          min-height: 6rem;
        }

        .fc-custom .fc-event {
          background-color: #3b82f6;
          border-color: #3b82f6;
          border-radius: 0.5rem;
          padding: 0.25rem 0.5rem;
        }

        .fc-custom .fc-event:hover {
          background-color: #2563eb;
          border-color: #2563eb;
        }

        .fc-custom .fc-event-title {
          font-weight: 600;
          font-size: 0.875rem;
          color: white;
        }

        .fc-custom .fc-timegrid-slot {
          height: 3rem;
        }

        .fc-custom .fc-col-time-cell {
          width: 5rem;
          color: #6b7280;
          font-size: 0.875rem;
        }

        .fc-custom .fc-timegrid-body {
          border-top: 1px solid #e5e7eb;
        }

        .fc-custom .fc-highlight {
          background-color: #dbeafe;
          opacity: 0.5;
        }

        .fc-custom .fc-daygrid-day-other .fc-daygrid-day-number) {
          color: #d1d5db;
        }
      `}</style>
    </Card>
  )
}