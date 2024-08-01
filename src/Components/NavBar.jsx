// src/Components/NavBar.jsx
import { Link } from 'react-router-dom';

export default function NavBar() {
  return (
    <nav className='navbar'>
      <h1>
        <Link to='/tours'> Spooky Travel</Link>
      </h1>
      <button>
        <Link to='/tours/new'> Add New Tour </Link>
      </button>
    </nav>
  );
}
