import React from 'react';
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";

import { Dashboard } from "./component";

const App = () => {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Route path="/" component={Dashboard} />
        </header>
      </div>
    </Router>
  );
}

export default App;
