// src/App.jsx
import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';
import NavBar from './Components/NavBar';
import Home from './Pages/Home';
import Tours from './Components/Tours';
import NewTour from './Pages/NewTour';
import EditTour from './Pages/EditTour';
import TourDetails from './Pages/TourDetails';
import FourOFour from './Pages/FourOFour';

function App() {
  const [tours, setTours] = useState([]);

  const fetchTours = async () => {
    try {
      const response = await fetch('http://localhost:4001/tours');
      const data = await response.json();
      setTours(data);
    } catch (error) {
      console.error('Error fetching tours:', error);
    }
  };

  useEffect(() => {
    fetchTours();
  }, []);

  return (
    <div className='page-container'>
      <Router>
        <NavBar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/tours' element={<Tours />} />
          <Route
            path='/tours/new'
            element={<NewTour onTourAdded={fetchTours} />}
          />
          <Route path='/tours/:id/edit' element={<EditTour />} />
          <Route path='/tours/:id' element={<TourDetails />} />
          <Route path='*' element={<FourOFour />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
