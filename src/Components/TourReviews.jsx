// src/Components/TourReviews.jsx
import { useEffect, useState } from 'react';

const API = import.meta.env.VITE_BASE_URL;

const TourReviews = ({ tourId }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(
          `${API}/tours/${tourId}/reviews`
        );
        const data = await response.json();

        // Check if data is an array or an object
        if (Array.isArray(data)) {
          setReviews(data);
        } else if (data.reviews && Array.isArray(data.reviews)) {
          setReviews(data.reviews);
        } else {
          console.error('Unexpected data format:', data);
          setReviews([]);
        }
      } catch (error) {
        console.error('Error fetching reviews:', error);
        setReviews([]);
      }
    };

    fetchReviews();
  }, [tourId]);

  if (!Array.isArray(reviews)) {
    return <div>Loading...</div>;
  }

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
          <p>No reviews available</p>
        )}
      </ul>
    </div>
  );
};

export default TourReviews;
