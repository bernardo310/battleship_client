import React from 'react';
import { Router, Link } from "@reach/router"
import './App.css';

import Jugar from './Views/Jugar'
import Home from './Views/Home'

function App() {
  return (
    <div className="App">
      <Router>
        <Jugar path="jugar" />
        <Home path="/" />
      </Router>    </div>
  );
}

export default App;
