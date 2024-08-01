// src/Pages/NewTour.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const API = import.meta.env.VITE_BASE_URL;

function NewTour({ onTourAdded }) {
  const navigate = useNavigate();
  const [tour, setTour] = useState({
    name: '',
    description: '',
    url: '',
    is_favorite: false,
  });

  const addTour = () => {
    fetch(`${API}/tours`, {
      method: 'POST',
      body: JSON.stringify(tour),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(() => {
        onTourAdded(); // Re-fetch tours in App.jsx
        navigate('/tours');
      })
      .catch((error) => console.error('catch', error));
  };

  const handleTextChange = (event) => {
    setTour({ ...tour, [event.target.id]: event.target.value });
  };

  const handleCheckboxChange = () => {
    setTour({ ...tour, is_favorite: !tour.is_favorite });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addTour();
  };

  return (
    <div className='page-container'>
      <form onSubmit={handleSubmit}>
        <label htmlFor='name'>Name:</label>
        <input
          id='name'
          value={tour.name}
          type='text'
          onChange={handleTextChange}
          placeholder='Name of Tour'
          required
        />
        <label htmlFor='url'>URL:</label>
        <input
          id='url'
          type='text'
          pattern='http[s]*://.+'
          required
          value={tour.url}
          placeholder='http://'
          onChange={handleTextChange}
        />
        <label htmlFor='description'>Description:</label>
        <textarea
          id='description'
          name='description'
          value={tour.description}
          onChange={handleTextChange}
          placeholder='Describe the tour'
        />
        <label htmlFor='is_favorite'>Favorite:</label>
        <input
          id='is_favorite'
          type='checkbox'
          onChange={handleCheckboxChange}
          checked={tour.is_favorite}
        />
        <br />
        <input type='submit' value='Add Tour' />
      </form>
    </div>
  );
}

export default NewTour;
