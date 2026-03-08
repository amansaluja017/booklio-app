import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function Cards() {
  return (
    <Card className="w-full max-w-sm hover:shadow-lg transition-shadow hover:bg-primary/2 cursor-pointer">
      <CardHeader>
        <CardTitle>Total Bookings</CardTitle>
      </CardHeader>
        <CardContent>
            <div className="text-4xl font-bold">120</div>
        </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" className="w-full cursor-pointer hover:scale-105 transition-transform">
          View all bookings
        </Button>
      </CardFooter>
    </Card>
  )
}
