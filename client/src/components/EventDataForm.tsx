import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { X } from "lucide-react";

export function EventDataForm({ event, setEventDataFormOpen }: { event: any; setEventDataFormOpen: (open: boolean) => void }) {

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 text-center">
      <Card className="w-full max-w-sm border-0 shadow-lg">
        <CardHeader className="rounded-t-lg">
          <CardTitle className="text-xl">{event.title}</CardTitle>
          <CardDescription className="">
            <div>
              <div>
                <p className="text-sm text-gray-500">
                  Date: {new Date(event.start).toLocaleString()}
                </p>
                <p className="text-sm text-gray-500">
                  Location: {event.location}
                </p>
              </div>
              <div className="mt-4">
                <p className="text-sm text-gray-500">Status: {event.status}</p>
              </div>
            </div>
          </CardDescription>
        </CardHeader>

        <CardFooter className="rounded-b-lg text-center flex justify-center">
          <Button onClick={() => setEventDataFormOpen(false)} className="w-full cursor-pointer">Done</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
