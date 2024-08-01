// src/Components/NavBar.jsx
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <nav>
      <h1>Spooky Travel</h1>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/tours'>Tours</Link>
        </li>
        <li>
          <Link to='/tours/new'>Add New Tour</Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
