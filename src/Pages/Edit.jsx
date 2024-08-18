// src/Pages/Edit.jsx
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import TourDetails from '../Components/TourDetails';

const Edit = () => {
  const { id } = useParams();
  const [tour, setTour] = useState(null);

  useEffect(() => {
    // Fetch the tour data
    const fetchTour = async () => {
      try {
        const response = await fetch(`${API}/tours/${id}`);
        const data = await response.json();
        setTour(data);
      } catch (error) {
        console.error('Error fetching tour:', error);
      }
    };

    fetchTour();
  }, [id]);

  if (!tour) {
    return <div> Loading... </div>;
  }

  return (
    <div>
      <h1> Edit Tour: {tour.name} </h1>
      <TourDetails tourId={id} />
    </div>
  );
};

export default Edit;
