// src/Components/Tour.jsx
import { Link } from 'react-router-dom';

function Tour({ tour }) {
  return (
    <tr>
      <td style={{ cursor: 'alias' }}>
        <a href={tour.url} target='_blank' rel='noreferrer'>
          {tour.name}
        </a>
      </td>
      <td>
        <Link to={`/tours/${tour.id}`}>✏️</Link>
      </td>
    </tr>
  );
}

export default Tour;
