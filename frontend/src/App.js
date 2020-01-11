import React from 'react';
import './vendor/normalize-v8.0.1.css'
import './styles/index.scss'
import DontAtMe from './components/DontAtMe';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <DontAtMe />
        </Route>
        <Route path='/:id'>
          <DontAtMe />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
