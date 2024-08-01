// src/Pages/New.jsx
import TourNewForm from '../Components/TourNewForm';

function New() {
  const handleTourAdded = () => {
    
    console.log('A new tour has been added!');
  };

  return (
    <div className='New'>
      <h2> Add a New Spooky Tour </h2>
      <TourNewForm onTourAdded={handleTourAdded} />
    </div>
  );
}

export default New;
