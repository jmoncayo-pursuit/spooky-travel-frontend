// src/Components/TourDetails.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const API = import.meta.env.VITE_BASE_URL;

const TourDetails = ({ tourId }) => {
  const [tour, setTour] = useState(null);
  const [showReview, setShowReview] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTour = async () => {
      try {
        const response = await fetch(`${API}/tours/${tourId}`, {
          headers: {
            'Cache-Control': 'no-cache', // Prevent cached response
            Pragma: 'no-cache',
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch tour');
        }
        const data = await response.json();
        setTour(data);
      } catch (error) {
        console.error('Error fetching tour:', error);
      }
    };

    fetchTour();
  }, [tourId]);

  if (!tour) {
    return <div>Loading...</div>;
  }

  const toggleReview = () => {
    setShowReview(!showReview);
  };

  return (
    <div className='tour-card'>
      <img
        src={tour.imageUrl}
        alt={tour.name}
        className='tour-image'
      />
      <div className='tour-content'>
        <h1 className='tour-name'>{tour.name}</h1>
        <p className='tour-desc'>{tour.description}</p>
        <p className='tour-rating'>Rating: {tour.rating}</p>
        <button
          className='toggle-review-button'
          onClick={toggleReview}
        >
          {showReview ? 'Hide Review' : 'Show Review'}
        </button>
        {showReview && <p className='tour-review'>{tour.review}</p>}
        <button
          className='return-button'
          onClick={() => navigate(-1)}
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default TourDetails;
