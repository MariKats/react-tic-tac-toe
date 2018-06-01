import React, { Component } from 'react';
import Game from './components/Game';
import OnePlayerGame from './components/OnePlayerGame';

export default class App extends Component {
  constructor(props){
  	super(props);
    this.state = {
      winner: '',
      winningCombo: null,
      gameDraw: false,
      board: Array(9).fill(""),
      totalMoves: 0,
      gameEnded: false
    }
  }

  moves = () => (
    [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6]
    ]
  )

  checkWinner = () => {
    let board = this.state.board
    let winner = null
    for(let move of this.moves()){
      if(board[move[0]] !== '' && board[move[0]] === board[move[1]] && board[move[1]] === board[move[2]]){
        this.setState({
          gameEnded: true,
          winningCombo: move,
          winner: board[move[0]]
        });
        winner = board[move[0]]
      }
    }
    return winner
  }

  handleClick = (board, totalMoves, callback) => {
    this.setState({board,totalMoves}, ()=>callback())
  }

  componentDidUpdate(nextProps, nextState) {
    if (nextState.gameEnded === false) {
      this.checkWinner();
      this.checkDraw();
    }
  }

  checkDraw = () => {
    if (this.state.totalMoves === 9 && !this.checkWinner()) {
      this.setState({
        gameEnded: true,
        gameDraw: true
      })
    }
  }

  turnComboRed = () => {
    let combo = this.state.winningCombo
    if (combo) {
      let squares = document.getElementsByClassName("square")
      let elems = []
      for(let num of combo){elems.push(squares[num])}
      elems.forEach(el => el.style.color = "red")
    }
  }

  reset = () => {
    let squares = document.getElementsByClassName('square');
    this.setState({
      winner: '',
      winningCombo: null,
      gameDraw: false,
      board: Array(9).fill(""),
      totalMoves: 0,
      gameEnded: false
    })

    for (let square of squares){
      square.innerText = "";
      square.style.color = "white";
    }
      }

  render() {
    if (this.props.match.path === "/two-player-game") {
      return (
        <Game
          state={this.state}
          reset={this.reset}
          turnComboRed={this.turnComboRed}
          moves={this.moves}
          setStateOnClick={this.handleClick}/>
      );
    } else {
      return (
        <OnePlayerGame
          state={this.state}
          reset={this.reset}
          turnComboRed={this.turnComboRed}
          moves={this.moves}
          setStateOnClick={this.handleClick}/>
      );
    }
  }
}
