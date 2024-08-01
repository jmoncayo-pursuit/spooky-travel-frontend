// src/App.jsx
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';
import NavBar from './Components/NavBar';
import Home from './Pages/Home';
import Tours from './Pages/Tours';
import NewTour from './Pages/NewTour';
import EditTour from './Pages/EditTour';
import TourDetails from './Pages/TourDetails';
import FourOFour from './Pages/FourOFour';

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/tours' element={<Tours />} />
        <Route path='/tours/new' element={<NewTour />} />
        <Route path='/tours/:id/edit' element={<EditTour />} />
        <Route path='/tours/:id' element={<TourDetails />} />
        <Route path='*' element={<FourOFour />} />
      </Routes>
    </Router>
  );
}

export default App;
