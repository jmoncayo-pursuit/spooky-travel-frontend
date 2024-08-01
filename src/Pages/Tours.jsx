// src/Pages/Tours.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Tours() {
  const [tours, setTours] = useState([]);

  useEffect(() => {
    fetch('/tours')
      .then((response) => response.json())
      .then((data) => setTours(data))
      .catch((error) =>
        console.error('Error fetching tours:', error)
      );
  }, []);

  return (
    <div>
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
