import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Login from './Pages/Login/Login';
import Turnip from './Pages/Turnip/Turnip';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route path="/turnip">
          <Turnip />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
