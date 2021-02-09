import React from 'react';
import { Link } from 'react-router-dom';
import '../Components/Styles.css';
import history from '../history';
function NavBar() {
  return (
    <div className='ui secondary  menu'>
      <Link
        to='/register'
        className={`${
          !localStorage.getItem('token') ? 'display item' : 'hidden'
        }`}
      >
        Register
      </Link>
      <Link
        to='/login'
        className={`${
          !localStorage.getItem('token') ? 'display item' : 'hidden'
        }`}
      >
        Login
      </Link>
      <div className='right menu'>
        <button
          className={`${
            localStorage.getItem('token') ? 'display item' : 'hidden'
          }`}
          onClick={() => {
            localStorage.removeItem('token');
            history.push('/login');
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default NavBar;
