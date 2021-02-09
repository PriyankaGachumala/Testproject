import React, { useState } from 'react';
import axios from 'axios';
import history from '../history';
import NavBar from './NavBar';
function Login() {
  const [state, setState] = useState({ email: '', password: '' });

  const checkvalues = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:5000/auth', state)
      .then((res) => {
        localStorage.setItem('token', res.data.token);
        history.push('/profile');
      })
      .catch((err) => {
        window.alert('Please enter valid credentials!!');
      });
  };

  const changevalues = (e) => {
    setState((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  return (
    <div>
      <NavBar></NavBar>
      <form className='ui form' onSubmit={(e) => checkvalues(e)}>
        <div className='field'>
          <label>Username</label>
          <input
            type='text'
            name='email'
            placeholder='enter your email'
            onChange={(e) => changevalues(e)}
          />
        </div>
        <div className='field'>
          <label>Password</label>
          <input
            type='password'
            name='password'
            placeholder='enter your password'
            onChange={(e) => changevalues(e)}
          />
        </div>
        <button className='ui button' type='submit'>
          Submit
        </button>
      </form>
    </div>
  );
}

export default Login;
