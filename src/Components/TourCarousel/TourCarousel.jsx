// src/Components/TourCarousel/TourCarousel.jsx
import React, { useState, useEffect, useRef } from 'react';
import TourCard from '../TourCard/TourCard';
import './TourCarousel.css';

const API = import.meta.env.VITE_BASE_URL;

function TourCarousel() {
  const [tours, setTours] = useState([]);
  const [itemNumberValue, setItemNumberValue] = useState(3);
  const [centralItem, setCentralItem] = useState(1);

  // Define calculatePercentItemNumber before using it
  const calculatePercentItemNumber = (num) => {
    return num ? 100 / num : 100 / 3; // Default to 3 items
  };

  const [itemNumber, setItemNumber] = useState(
    calculatePercentItemNumber(itemNumberValue)
  );

  const listRef = useRef(null);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await fetch(`${API}/tours`);
        const data = await response.json();
        setTours(data);
      } catch (error) {
        console.error('Error fetching tours:', error);
      }
    };

    fetchTours();
  }, []);

  const handleNext = () => {
    setCentralItem((prevCentralItem) =>
      prevCentralItem === tours.length - 1 ? 0 : prevCentralItem + 1
    );
  };

  const handlePrev = () => {
    setCentralItem((prevCentralItem) =>
      prevCentralItem === 0 ? tours.length - 1 : prevCentralItem - 1
    );
  };

  useEffect(() => {
    setItemNumber(calculatePercentItemNumber(itemNumberValue));
    addActiveElement(centralItem, itemNumberValue);
  }, [itemNumberValue, centralItem]);

  const addActiveElement = (centralItem, totalVisibleItems) => {
    if (!listRef.current) return;

    const sliderItems =
      listRef.current.querySelectorAll('.slider__item');
    sliderItems.forEach((item) =>
      item
        .querySelector('.slider__content')
        .classList.remove('active')
    );

    const central = sliderItems[Math.floor(centralItem)];
    if (central) {
      central
        .querySelector('.slider__content')
        .classList.add('active');
    }

    if (totalVisibleItems % 2 === 0) {
      const central2 = sliderItems[Math.floor(centralItem) + 1];
      if (central2) {
        central2
          .querySelector('.slider__content')
          .classList.add('active');
      }

      if (totalVisibleItems === 2) {
        const central3 = sliderItems[Math.floor(centralItem) - 1];
        if (central3) {
          central3
            .querySelector('.slider__content')
            .classList.add('active');
        }
      }
    }
  };

  useEffect(() => {
    if (!listRef.current) return;

    const firstItem = listRef.current.firstElementChild;
    if (firstItem) {
      firstItem.style.marginLeft = `calc(-${itemNumber}%)`;
      setTimeout(() => {
        if (firstItem) {
          firstItem.style.marginLeft = '';
        }
      }, 1);
    }
  }, [itemNumber]);

  return (
    <div>
      <input
        type='number'
        min='1'
        max='6'
        value={itemNumberValue}
        onChange={(e) => setItemNumberValue(parseInt(e.target.value))}
      />
      <div className='slider'>
        <div className='slider__wrapper' ref={listRef}>
          {tours.map((tour, index) => (
            <TourCard
              key={tour.id}
              tour={tour}
              width={itemNumber}
              isActive={index === centralItem}
            />
          ))}
        </div>
        <div className='slider__controls'>
          <button className='slider__left' onClick={handlePrev}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 25 25'
            >
              <path
                d='M24 12.001H2.914l5.294-5.295-.707-.707L1 12.501l6.5 6.5.707-.707-5.293-5.293H24v-1z'
                data-name='Left'
              />
            </svg>
            <span className='slider__words'> Back </span>
          </button>
          <button className='slider__right' onClick={handleNext}>
            <span className='slider__words'> Next </span>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 25 25'
            >
              <path
                d='m17.5 5.999-.707.707 5.293 5.293H1v1h21.086l-5.294 5.295.707.707L24 12.499l-6.5-6.5z'
                data-name='Right'
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default TourCarousel;
