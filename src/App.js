import React, { Component } from 'react';
import './App.css';
// import Board from './components/Board'

class App extends Component {
  constructor(props){
  	super(props);
  	this.state = {
      turn: 'X',
      gameEnded: false,
      winner: '',
      gameDraw: false,
      board: Array(9).fill(''),
      totalMoves: 0
    }
  }

  reset = (event) => {
    let squares = event.target.parentElement.previousElementSibling.children
    this.setState({
      turn: 'X',
      gameEnded: false,
      winner: '',
      gameDraw: false,
      board: Array(9).fill(''),
      totalMoves: 0
    })
    for (let i=0; i<squares.length; i++) {
      squares[i].innerText = ""
    }
  }

  clicked = (event) => {
    if (this.state.board[event.target.dataset.square] === '' && !this.state.gameEnded) {
      this.setState({ board: [...this.state.board, this.state.board[event.target.dataset.square] = this.state.turn]}, console.log(this.state.board))
      event.target.innerText = this.state.turn;
      this.setState({
        turn: this.state.turn === 'X' ? 'O' : 'X',
        board: this.state.board,
        totalMoves: ++this.state.totalMoves
      })
    }
    let result = this.checkWinner();
    if (result === 'X') {
      this.setState({
        gameEnded: true,
        winner: 'X'
      })
    } else if (result === 'O') {
      this.setState({
        gameEnded: true,
        winner: 'O'
      })
    }
  }

  checkWinner = () => {
    let moves = [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6]
    ]
    let board = this.state.board
    for(let i=0; i<moves.length; i++){
      if(board[moves[i][0]] === board[moves[i][1]] && board[moves[i][1]] === board[moves[i][2]]){
        return board[moves[i][0]]
      }
    }

    if (this.state.totalMoves === 9 && !this.state.gameEnded){
      this.setState({
        gameEnded: true,
        gameDraw: true
      })
    }
  }

  winnerLine = () => {
    if (this.state.gameEnded) {
      return this.state.gameDraw ? "It's a draw!" : "Player " + this.state.winner + " won!"
    }
  }

  render() {
    return (
      <div id="game">
        <div id="head">Tic Tac Toe</div>
        <div id="status">{this.winnerLine()}</div>
        <div id="board" onClick={this.clicked}>
          <div className="square" data-square='0'></div>
          <div className="square" data-square='1'></div>
          <div className="square" data-square='2'></div>
          <div className="square" data-square='3'></div>
          <div className="square" data-square='4'></div>
          <div className="square" data-square='5'></div>
          <div className="square" data-square='6'></div>
          <div className="square" data-square='7'></div>
          <div className="square" data-square='8'></div>
        </div>
        <div id="foot">
          <button className="button" onClick={this.reset}>Play again</button>
          <button className="button" onClick={this.reset}>Exit game</button>
        </div>
      </div>
    );
  }
}

export default App;
