// src/Pages/Show.jsx
import { useParams } from 'react-router-dom';
import TourDetails from '../Components/TourDetails';
import TourReviews from '../Components/TourReviews';

function Show() {
  const { id } = useParams();

  return (
    <div className='Show'>
      <h2> Tour Details </h2>
      <TourDetails tourId={id} />
      <TourReviews tourId={id} />
    </div>
  );
}

export default Show;
