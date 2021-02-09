import axios from 'axios';
import React, { useEffect, useState } from 'react';
import history from '../history';
import NavBar from './NavBar';
import '../Components/Styles.css';
function Profile() {
  const [state, setState] = useState({ imageUrl: '', email: '' });
  useEffect(() => {
    if (localStorage.getItem('token')) {
      console.log('success');
      axios
        .get('/auth', {
          headers: {
            'x-auth-token': localStorage.getItem('token'),
          },
        })
        .then((res) => {
          setState((prevState) => {
            return {
              ...prevState,
              email: res.data.email,
              imageUrl: res.data.image,
            };
          });
        });
    } else {
      history.push('/login');
    }
  }, []);

  return (
    <div>
      <NavBar></NavBar>
      <img
        className='ui large bordered image'
        src={state.imageUrl}
        alt=''
      ></img>
      <h2 className='ui header'>{state.email}</h2>
    </div>
  );
}

export default Profile;
