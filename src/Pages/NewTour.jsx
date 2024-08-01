// src/Pages/NewTour.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function NewTour() {
  const [tour, setTour] = useState({
    name: '',
    description: '',
    url: '',
    is_favorite: false,
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setTour({
      ...tour,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch('/tours', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tour),
    })
      .then(() => navigate('/tours'))
      .catch((error) => console.error('Error creating tour:', error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type='text'
          name='name'
          value={tour.name}
          onChange={handleChange}
        />
      </label>
      <label>
        Description:
        <input
          type='text'
          name='description'
          value={tour.description}
          onChange={handleChange}
        />
      </label>
      <label>
        URL:
        <input
          type='text'
          name='url'
          value={tour.url}
          onChange={handleChange}
        />
      </label>
      <label>
        Favorite:
        <input
          type='checkbox'
          name='is_favorite'
          checked={tour.is_favorite}
          onChange={handleChange}
        />
      </label>
      <button type='submit'>Add Tour</button>
    </form>
  );
}

export default NewTour;
