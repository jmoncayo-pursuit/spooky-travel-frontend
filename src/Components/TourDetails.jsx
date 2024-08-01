// src/Components/TourDetails.jsx
import { useEffect, useState } from 'react';

const API = import.meta.env.VITE_BASE_URL;

const TourDetails = ({ tourId }) => {
  const [tour, setTour] = useState(null);

  useEffect(() => {
    const fetchTour = async () => {
      try {
        const response = await fetch(`${API}/tours/${tourId}`);
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

  return (
    <div>
      <h1>{tour.name}</h1>
      <p>{tour.description}</p>
      <p>{tour.url}</p>
      <p>Favorite: {tour.is_favorite ? 'Yes' : 'No'}</p>
    </div>
  );
};

export default TourDetails;
