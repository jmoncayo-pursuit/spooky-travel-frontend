// src/Components/TourEditForm.jsx
import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

const API = import.meta.env.VITE_BASE_URL;

function TourEditForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [tour, setTour] = useState({
    name: '',
    url: '',
    description: '',
    is_favorite: false,
  });

  const handleTextChange = (event) => {
    setTour({ ...tour, [event.target.id]: event.target.value });
  };

  const handleCheckboxChange = () => {
    setTour({ ...tour, is_favorite: !tour.is_favorite });
  };

  const updateTour = async () => {
    try {
      const response = await fetch(`${API}/tours/${id}`, {
        method: 'PUT',
        body: JSON.stringify(tour),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      navigate(`/tours/${id}`);
    } catch (error) {
      console.error('Error updating tour:', error);
    }
  };

  useEffect(() => {
    const fetchTour = async () => {
      try {
        const response = await fetch(`${API}/tours/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setTour(data);
      } catch (error) {
        console.error('Error fetching tour:', error);
      }
    };

    fetchTour();
  }, [id, API]);

  const handleSubmit = (event) => {
    event.preventDefault();
    updateTour();
  };

  return (
    <div className='Edit'>
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
        <input type='submit' value='Update Tour' />
      </form>
      <Link to={`/tours/${id}`}>
        <button>Nevermind!</button>
      </Link>
    </div>
  );
}

export default TourEditForm;
