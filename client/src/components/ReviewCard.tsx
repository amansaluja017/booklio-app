import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function ReviewCard(review: any) {

    const ratingArr = Array.from({ length: Math.round(review.review.rating) }, (_, i) => i);

  return (
    <Card className="mx-auto w-full max-w-sm shrink-0">
      <CardHeader>
        <CardTitle className="font-bold text-xl">{review.review.customer?.name || "Anonymous"}</CardTitle>
        <CardDescription className="text-2xl">
          {ratingArr.map((_, idx) => (
            <span key={idx} className="size-4 text-amber-500 fill-amber-500">
              ★
            </span>
          ))}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>
          {review.review.comment || "No comment provided."}
        </p>
      </CardContent>
    </Card>
  )
}
