// src/Components/TourShow.jsx
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Review from './Review';
import ReviewForm from './ReviewForm';
import TourEditForm from './TourEditForm';

const API = import.meta.env.VITE_BASE_URL;

const TourShow = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [tour, setTour] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchTour = async () => {
      try {
        const response = await fetch(`${API}/tours/${id}`);
        const data = await response.json();
        setTour(data);
      } catch (error) {
        console.error('Error fetching tour:', error);
      }
    };

    const fetchReviews = async () => {
      try {
        const response = await fetch(`${API}/tours/${id}/reviews`);
        const data = await response.json();
        setReviews(data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchTour();
    fetchReviews();
  }, [id]);

  const handleDelete = async (reviewId) => {
    try {
      const response = await fetch(
        `${API}/tours/${id}/reviews/${reviewId}`,
        {
          method: 'DELETE',
        }
      );

      if (response.ok) {
        setReviews(
          reviews.filter((review) => review.id !== reviewId)
        );
      } else {
        console.error('Failed to delete review');
      }
    } catch (error) {
      console.error('Error deleting review:', error);
    }
  };

  const handleSubmit = async (review, tourId) => {
    try {
      if (review.id) {
        const response = await fetch(
          `${API}/tours/${tourId}/reviews/${review.id}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(review),
          }
        );

        if (response.ok) {
          const updatedReviews = reviews.map((r) =>
            r.id === review.id ? review : r
          );
          setReviews(updatedReviews);
        } else {
          console.error('Failed to update review');
        }
      } else {
        const response = await fetch(
          `${API}/tours/${tourId}/reviews`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(review),
          }
        );

        if (response.ok) {
          const data = await response.json();
          setReviews((prevReviews) => [
            ...(Array.isArray(prevReviews) ? prevReviews : []),
            data,
          ]);
        } else {
          console.error('Failed to create review');
        }
      }
    } catch (error) {
      console.error('Error handling review submission:', error);
    }
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  if (!tour) {
    return <div>Loading...</div>;
  }

  return (
    <div className='TourShow'>
      {isEditing ? (
        <TourEditForm
          tour={tour}
          onTourUpdated={() => {
            setIsEditing(false);
            fetchTour();
          }}
        />
      ) : (
        <div className='tour-card'>
          <img
            src={tour.imageUrl}
            alt={tour.name}
            className='tour-image'
          />
          <div className='tour-content'>
            <h1 className='tour-name'>{tour.name}</h1>
            <p className='tour-rating'>Rating: {tour.rating}</p>{' '}
            <p className='tour-desc'>{tour.description}</p>
            <h2>Reviews</h2>
            <ReviewForm handleSubmit={handleSubmit} />
            <ul>
              {Array.isArray(reviews) && reviews.length > 0 ? (
                reviews.map((review) => (
                  <Review
                    key={review.id}
                    review={review}
                    handleDelete={handleDelete}
                    handleSubmit={handleSubmit}
                  />
                ))
              ) : (
                <p> No reviews available </p>
              )}
            </ul>
            <button
              className='return-button'
              onClick={() => navigate(-1)}
            >
              Go Back
            </button>
            <button onClick={toggleEdit}>Edit Tour</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TourShow;
