import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './App.css';
import Game from './components/Game'
// import Home from './components/Home'
import OnePlayerGame from './components/OnePlayerGame'

export default class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/two-player-game" component={Game} />
          <Route exact path="/one-player-game" component={OnePlayerGame}/>
        </div>
      </Router>
    );
  }
}
