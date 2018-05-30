import React, { Component } from 'react';
import './App.css';
import Game from './components/Game'
import Welcome from './components/Welcome'

export default class App extends Component {
  render() {
    return (
      <div>
        <Game/>
      </div>
    );
  }
}
