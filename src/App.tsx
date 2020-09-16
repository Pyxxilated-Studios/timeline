import React, { FunctionComponent } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import LandingPage from './pages/landing';
import LoginPage from './pages/login';
import TimelinePage from './pages/timeline';
import VerifyLoginPage from './pages/verify';
import PreferencesPage from './pages/preferences';

import './App.css';

const App: FunctionComponent = () => {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Switch>
        <Route path="/" exact component={LandingPage} />
        <Route path="/timeline" component={TimelinePage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/verify" component={VerifyLoginPage} />
        <Route path="/preferences" component={PreferencesPage} />
      </Switch>
    </Router>
  );
};

export default App;
