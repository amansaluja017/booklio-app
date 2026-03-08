import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import apiClient from "@/utilis/apiClient";
import { Trash2, Loader, Star } from "lucide-react";

export function ReviewModerationTable() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const response = await apiClient.getAllReviews();
      const data = response as {data: { reviews: any[] }};
      setReviews(data.data.reviews || []);
    } catch (error) {
      console.error("Failed to fetch reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (reviewId: string) => {
    if (!window.confirm("Are you sure you want to delete this review?")) {
      return;
    }

    try {
      setDeleting(reviewId);
      await apiClient.deleteReview(reviewId);
      setReviews(reviews.filter(r => r._id !== reviewId));
      alert("Review deleted successfully");
    } catch (error) {
      console.error("Failed to delete review:", error);
      alert("Failed to delete review");
    } finally {
      setDeleting(null);
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${
              i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  if (loading) {
    return <div className="p-4 text-center">Loading reviews...</div>;
  }

  return (
    <Table>
      <TableCaption>Moderate user reviews.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-20">Sr.</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead>Service</TableHead>
          <TableHead>Rating</TableHead>
          <TableHead>Comment</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {reviews && reviews.length > 0 ? (
          reviews.map((review, index) => (
            <TableRow key={review._id}>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell className="font-semibold">
                {review.customer?.name || "Unknown"}
              </TableCell>
              <TableCell>{review.service?.name || "Unknown Service"}</TableCell>
              <TableCell>{renderStars(review.rating)}</TableCell>
              <TableCell className="max-w-xs truncate text-sm">
                {review.comment}
              </TableCell>
              <TableCell className="text-right">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(review._id)}
                  disabled={deleting === review._id}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  {deleting === review._id ? (
                    <Loader className="h-4 w-4 animate-spin" />
                  ) : (
                    <Trash2 className="h-4 w-4" />
                  )}
                </Button>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={6} className="text-center py-8 text-gray-500">
              No reviews to moderate
            </TableCell>
          </TableRow>
        )}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={6} className="text-right">
            Total Reviews: {reviews.length}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}
