// src/Pages/Tours.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Tours() {
  const [tours, setTours] = useState([]);

  useEffect(() => {
    axios
      .get('/tours')
      .then((response) => setTours(response.data))
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
