import React, { useState } from 'react';
import axios from 'axios';
import history from '../history';
import '../Components/Styles.css';
import NavBar from './NavBar';

function Register() {
  const [state, setState] = useState({
    email: '',
    password: '',
    image: '',
  });

  const [display, setDisplay] = useState(false);

  const checkvalues = (e) => {
    e.preventDefault();
    console.log(state);
    if (state.image === '') {
      setDisplay(true);
    } else {
      axios
        .post('/users', state)
        .then((res) => {
          history.push('/login');
          console.log(res);
        })
        .catch((err) => {
          window.alert(
            'User already exists. Password should contain minimum 6 characters, This can be the reason'
          );
        });
    }
  };

  const changevalues = (e) => {
    setState((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  const openWidget = () => {
    window.cloudinary
      .createUploadWidget(
        {
          cloudName: 'drmnzhbfl',
          uploadPreset: 'plqpwrsu',
        },
        (err, result) => {
          if (result.event === 'success') {
            setState((prevState) => {
              return {
                ...prevState,
                image: result.info.secure_url,
              };
            });
          }
        }
      )
      .open();
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
            required
          />
        </div>
        <div className='field'>
          <label>Password</label>
          <input
            type='password'
            name='password'
            placeholder='enter your password'
            onChange={(e) => changevalues(e)}
            required
          />
        </div>
        <button
          type='button'
          className='ui button primary'
          onClick={openWidget}
        >
          Upload Image
        </button>
        <div className={display ? 'vis' : 'hid'}>Please select an Image</div>
        <button className='ui button' type='submit'>
          Submit
        </button>
      </form>
    </div>
  );
}

export default Register;
