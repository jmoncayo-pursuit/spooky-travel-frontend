// src/Components/TourReviews.jsx
import { useEffect, useState } from 'react';

const API = import.meta.env.VITE_BASE_URL;

const TourReviews = ({ tourId }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(
          `${API}/tours/${tourId}/reviews`,
          {
            method: 'GET',
            headers: {
              'Cache-Control': 'no-store', // Prevent caching
              'Content-Type': 'application/json',
            },
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch reviews');
        }

        const data = await response.json();
        setReviews(data.reviews); // Ensure reviews array is being set
      } catch (error) {
        console.error('Error fetching reviews:', error);
        setReviews([]);
      }
    };

    fetchReviews();
  }, [tourId]);

  return (
    <div>
      <h1>Reviews</h1>
      <ul>
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <li key={review.id}>
              <h2>{review.title}</h2>
              <p>{review.content}</p>
              <p>Rating: {review.rating}</p>
            </li>
          ))
        ) : (
          <p>No reviews available.</p>
        )}
      </ul>
    </div>
  );
};

export default TourReviews;
