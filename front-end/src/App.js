import Login from './Components/Login';
import Profile from './Components/Profile';
import { Route, Router } from 'react-router-dom';
import history from './history';
import Register from './Components/Register';
function App() {
  return (
    <div>
      <Router history={history}>
        <div>
          <Route path='/login' component={Login} exact />
          <Route path='/profile' component={Profile} />
          <Route path='/register' component={Register} />
        </div>
      </Router>
    </div>
  );
}

export default App;
