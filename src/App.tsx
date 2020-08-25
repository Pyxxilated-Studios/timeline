import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import LandingPage from "./pages/landing";
import LoginPage from "./pages/login";
import TimelinePage from "./pages/timeline";

import "./App.css";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={LandingPage} />
        <Route path="/timeline" component={TimelinePage} />
        <Route path="/login" component={LoginPage} />
      </Switch>
    </Router>
  );
};

export default App;
