import React from 'react';
import Welcome from './Welcome';
import Footer from './Footer';

const Home = () => (
  <div className="game">
    <Welcome message={"Welcome to TicTacToe!"}/>
    <Footer />
  </div>
)

export default Home;
