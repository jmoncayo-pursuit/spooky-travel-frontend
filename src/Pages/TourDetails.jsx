// src/Pages/TourDetails.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function TourDetails() {
  const { id } = useParams();
  const [tour, setTour] = useState(null);

  useEffect(() => {
    fetch(`/tours/${id}`)
      .then((response) => response.json())
      .then((data) => setTour(data))
      .catch((error) => console.error('Error fetching tour:', error));
  }, [id]);

  if (!tour) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>{tour.name}</h2>
      <p>{tour.description}</p>
      <p>
        <a href={tour.url} target='_blank' rel='noopener noreferrer'>
          Visit Website
        </a>
      </p>
      <p>Favorite: {tour.is_favorite ? 'Yes' : 'No'}</p>
    </div>
  );
}

export default TourDetails;
