// src/Pages/Show.jsx
import { useParams } from 'react-router-dom';
import TourShow from '../Components/TourShow'; 

function Show() {
  const { id } = useParams();

  return (
    <div className='Show'>
      <h2> Tour Details </h2>
      <TourShow id={id}/>
    </div>
  );
}

export default Show;
