import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Login from './Pages/Login/Login';
import Turnip1 from './Pages/Turnip1/Turnip1';
import Turnip2 from './Pages/Turnip2/Turnip2';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route path="/turnip1">
          <Turnip1 />
        </Route>
        <Route path="/turnip2">
          <Turnip2 />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
