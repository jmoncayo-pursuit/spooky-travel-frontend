// src/Components/TourNewForm.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const API = import.meta.env.VITE_BASE_URL;

function TourNewForm({ onTourAdded }) {
  const navigate = useNavigate();
  const [tour, setTour] = useState({
    name: '',
    url: '',
    description: '',
  });

  const addTour = async () => {
    try {
      const response = await fetch(`${API}/tours`, {
        method: 'POST',
        body: JSON.stringify(tour),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      onTourAdded();
      navigate('/tours');
    } catch (error) {
      console.error('Error adding tour:', error);
    }
  };

  const handleTextChange = (event) => {
    setTour({ ...tour, [event.target.id]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addTour();
  };

  return (
    <div className='New'>
      <form onSubmit={handleSubmit}>
        <label htmlFor='name'> Name: </label>
        <input
          id='name'
          value={tour.name}
          type='text'
          onChange={handleTextChange}
          placeholder='Name of Tour'
          required
        />
        <label htmlFor='url'> URL: </label>
        <input
          id='url'
          type='text'
          pattern='[^ ]+\.[^ ]+'
          required
          value={tour.url}
          placeholder='SpookySite.com'
          onChange={handleTextChange}
        />

        <label htmlFor='description'> Description: </label>
        <textarea
          id='description'
          name='description'
          value={tour.description}
          onChange={handleTextChange}
          placeholder='Describe the tour'
        />

        <br />
        <input className= 'button' type='submit' value='Add Tour' />
      </form>
    </div>
  );
}

export default TourNewForm;