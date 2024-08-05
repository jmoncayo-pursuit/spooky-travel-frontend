// src/Components/Tours.jsx
import { useState, useEffect } from 'react';
import Tour from './Tour'; 

const API = import.meta.env.VITE_BASE_URL;

function Tours() {
  const [tours, setTours] = useState([]);

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

  return (
    <div className='Tours'>
      <section>
        <table>
          <thead>
            <tr>
              <th>Take me there</th>
              <th>Edit this tour</th>
            </tr>
          </thead>
          <tbody>
            {tours.map((tour) => (
              <Tour key={tour.id} tour={tour} />
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default Tours;
