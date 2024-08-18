// src/Components/TourEditForm.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const API = import.meta.env.VITE_BASE_URL;

function TourEditForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [tour, setTour] = useState({
    name: '',
    url: '',
    description: '',
  });

  const handleTextChange = (event) => {
    setTour({ ...tour, [event.target.id]: event.target.value });
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

  const deleteTour = async () => {
    try {
      const response = await fetch(`${API}/tours/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        navigate('/tours'); // Redirect to the tours list after deletion
      } else {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error deleting tour:', error);
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

  const handleGoBack = () => {
    console.log('Go Back button clicked - start');
    navigate(-1);
    console.log('Go Back button clicked - end');
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
          required
          value={tour.url}
          placeholder='SpookySite.com'
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
        <br />
        <input type='submit' value='Update Tour' />
      </form>
      <button onClick={handleGoBack}>Go Back</button>
      <button onClick={deleteTour}>Delete Tour</button>
    </div>
  );
}

export default TourEditForm;
