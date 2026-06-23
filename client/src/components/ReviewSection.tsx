"use client";

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
      await fetch( `${process.env.NEXT_PUBLIC_API_URL}/api/medicines/review`, {
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
    <div
      className="
mt-16
bg-white


p-8
"
    >
      <div
        className="
bg-blue-50
rounded-2xl
p-6
mb-8
"
      >
        <h3
          className="
text-4xl
font-bold
"
        >
          ⭐ {averageRating}/5
        </h3>

        <p className="text-gray-500">{reviews.length} reviews</p>
      </div>
      <h2
        className="
text-3xl
font-bold
mb-8
"
      >
        ⭐ User Reviews
      </h2>

      <p
        className="
text-gray-500
mb-4
"
      >
        Rate this medicine
      </p>

      <div className="flex gap-2 mb-6">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            onClick={() => setRating(star)}
            className="
cursor-pointer
text-4xl
hover:scale-125
transition
"
          >
            {star <= rating ? "⭐" : "☆"}
          </span>
        ))}
      </div>

      <textarea
        value={review}
        onChange={(e) => setReview(e.target.value)}
        placeholder="
Write your experience...
"
        className="
w-full
border
rounded-2xl
p-5
h-32
mb-5
outline-none
focus:ring-2
focus:ring-blue-400
"
      />

      <button
        onClick={submitReview}
        className="
bg-blue-600
text-white
px-8
py-3
rounded-xl
hover:bg-blue-700
transition
"
      >
        Submit Review
      </button>

      <hr className="my-10" />

      <h3
        className="
font-bold
text-2xl
mb-6
"
      >
        Recent Reviews
      </h3>

      <div className="space-y-4">
        {(showAll ? reviews : reviews.slice(0, 3)).map((item) => (
          <div
            key={item.id}
            className="
bg-gray-50
rounded-xl
p-5
"
          >
            <div
              className="
mb-2
text-lg
"
            >
              {"⭐".repeat(item.rating)}
            </div>

            <p>{item.review}</p>
          </div>
        ))}

        {reviews.length > 3 && (
          <div className="text-center mt-6">
            <button
              onClick={() => setShowAll(!showAll)}
              className="
text-blue-600
font-semibold
hover:underline
"
            >
              {showAll ? "Show Less" : "Show More Reviews"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
