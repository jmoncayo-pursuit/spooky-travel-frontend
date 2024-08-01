// src/Pages/EditTour.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function EditTour() {
  const { id } = useParams();
  const [tour, setTour] = useState({
    name: '',
    description: '',
    url: '',
    is_favorite: false,
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`/tours/${id}`)
      .then((response) => response.json())
      .then((data) => setTour(data))
      .catch((error) => console.error('Error fetching tour:', error));
  }, [id]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setTour({
      ...tour,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(`/tours/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tour),
    })
      .then(() => navigate(`/tours/${id}`))
      .catch((error) => console.error('Error updating tour:', error));
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
      <button type='submit'>Update Tour</button>
    </form>
  );
}

export default EditTour;
