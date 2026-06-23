"use client";

import { cn } from "@/lib/utils";
import { Star } from "lucide-react";
import { useEffect, useState } from "react";

export default function ReviewSection({ medicineId }: { medicineId: string }) {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [reviews, setReviews] = useState<any[]>([]);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      console.log("Medicine ID:", medicineId);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/medicines/${medicineId}/reviews`,
      );

      const data = await response.json();
      setReviews(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const submitReview = async () => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/medicines/review`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          medicine_id: medicineId,
          rating,
          review,
        }),
      });

      setRating(0);
      setReview("");
      fetchReviews();
    } catch (error) {
      console.log(error);
    }
  };

  const averageRating = reviews.length
    ? (
        reviews.reduce((acc, item) => acc + item.rating, 0) / reviews.length
      ).toFixed(1)
    : 0;

  return (
    <div className="pt-4">
      <div className="mb-8 flex flex-col gap-4 rounded-2xl border border-health-100 bg-health-50/50 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div>
          <h3 className="text-3xl font-bold text-health-900 sm:text-4xl">
            {averageRating}
            <span className="text-lg font-medium text-slate-400">/5</span>
          </h3>
          <p className="mt-1 text-sm text-slate-500">
            {reviews.length} review{reviews.length !== 1 ? "s" : ""}
          </p>
        </div>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={cn(
                "size-5",
                star <= Math.round(Number(averageRating))
                  ? "fill-amber-400 text-amber-400"
                  : "text-slate-200",
              )}
            />
          ))}
        </div>
      </div>

      <h2 className="mb-6 text-2xl font-bold text-health-900 sm:text-3xl">
        User Reviews
      </h2>

      <p className="mb-3 text-sm font-medium text-slate-500">
        Rate this medicine
      </p>

      <div className="mb-6 flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setRating(star)}
            className="rounded-lg p-1 transition-transform hover:scale-110"
            aria-label={`Rate ${star} stars`}
          >
            <Star
              className={cn(
                "size-8 sm:size-9",
                star <= rating
                  ? "fill-amber-400 text-amber-400"
                  : "text-slate-300 hover:text-amber-300",
              )}
            />
          </button>
        ))}
      </div>

      <textarea
        value={review}
        onChange={(e) => setReview(e.target.value)}
        placeholder="Write your experience..."
        className="mb-5 h-32 w-full rounded-2xl border border-health-100 bg-white p-4 text-sm outline-none transition-shadow focus:ring-4 focus:ring-health-100 sm:p-5 sm:text-base"
      />

      <button
        onClick={submitReview}
        className="rounded-xl bg-health-600 px-8 py-3 text-sm font-semibold text-white shadow-md shadow-health-600/20 transition-all hover:bg-health-700 hover:shadow-lg sm:text-base"
      >
        Submit Review
      </button>

      <hr className="my-10 border-health-100" />

      <h3 className="mb-5 text-xl font-bold text-health-900 sm:text-2xl">
        Recent Reviews
      </h3>

      <div className="space-y-3 sm:space-y-4">
        {(showAll ? reviews : reviews.slice(0, 3)).map((item) => (
          <div
            key={item.id}
            className="rounded-xl border border-slate-100 bg-slate-50/80 p-4 transition-colors hover:border-health-100 sm:p-5"
          >
            <div className="mb-2 flex gap-0.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={cn(
                    "size-4",
                    star <= item.rating
                      ? "fill-amber-400 text-amber-400"
                      : "text-slate-200",
                  )}
                />
              ))}
            </div>
            <p className="text-sm leading-relaxed text-slate-700 sm:text-base">
              {item.review}
            </p>
          </div>
        ))}

        {reviews.length > 3 && (
          <div className="pt-2 text-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className="text-sm font-semibold text-health-600 transition-colors hover:text-health-800 hover:underline"
            >
              {showAll ? "Show Less" : "Show More Reviews"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
