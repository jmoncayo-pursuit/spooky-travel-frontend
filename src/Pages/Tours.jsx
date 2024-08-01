// src/Pages/Tours.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const API = import.meta.env.VITE_BASE_URL;

function Tours() {
  const [tours, setTours] = useState([]);

  // Function to fetch tours from the API
  const fetchTours = async () => {
    try {
      const response = await fetch(`${API}/tours`);
      const data = await response.json();
      setTours(data);
    } catch (error) {
      console.error('Error fetching tours:', error);
    }
  };

  // Fetch tours when the component mounts and after a new tour is added
  useEffect(() => {
    fetchTours();
  }, []);

  return (
    <div className='page-container'>
      <h2>All Tours</h2>
      <ul>
        {tours.map((tour) => (
          <li key={tour.id}>
            <Link to={`/tours/${tour.id}`}>{tour.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Tours;
