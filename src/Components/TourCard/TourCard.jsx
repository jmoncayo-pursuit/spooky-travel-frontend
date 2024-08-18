// src/Components/TourCard/TourCard.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './TourCard.css';

function TourCard({ tour, width, isActive, tourId }) {
  const [imageUrl, setImageUrl] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const accessKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
        const query = 'spooky';
        const url = `https://api.unsplash.com/search/photos?query=${query}&client_id=${accessKey}`;

        const response = await fetch(url);
        const data = await response.json();
        const images = data.results;

        if (images && images.length > 0) {
          const randomImage =
            images[Math.floor(Math.random() * images.length)];
          setImageUrl(randomImage.urls.regular);
        }
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImage();
  }, []);

  const handleClick = () => {
    navigate(`/tours/${tourId}`);
  };

  return (
    <div
      className='slider__item'
      style={{ width: `${width}%` }}
      onClick={handleClick}
    >
      <div className={`slider__content ${isActive ? 'active' : ''}`}>
        <div className='slider__image'>
          <img
            src={imageUrl || tour.imageUrl}
            alt={tour.name}
            className='tour-card__image'
          />
        </div>
        <div className='slider__over'>
          <div className='slider__text'>
            <h2 className='tour-card__title'> {tour.name} </h2>
            <p className='tour-card__description'>
              {' '}
              {tour.description}{' '}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TourCard;