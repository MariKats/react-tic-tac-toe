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
      totalMoves: 0,
      winningCombo: null
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

    for (let square of squares){
      square.innerText = "";
      square.style.color = "white";
    }

  }

  clicked = (event) => {
    if (this.state.board[event.target.dataset.square] === '' && !this.state.gameEnded) {
      event.target.innerText = this.state.turn;
      this.state.board[event.target.dataset.square] = this.state.turn
      this.setState({
        turn: this.state.turn === 'X' ? 'O' : 'X',
        board: this.state.board,
        totalMoves: ++this.state.totalMoves
      })
    }

    let result = this.checkWinner();
    if (result === 'X') {
      this.setState({
        winner: 'X',
        gameEnded: true
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
      if(board[moves[i][0]] !== '' && board[moves[i][0]] === board[moves[i][1]] && board[moves[i][1]] === board[moves[i][2]]){
        this.setState({winningCombo: moves[i]})
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
      let combo = this.state.winningCombo
      let squares = document.getElementsByClassName("square")
      let elems = []
      for(let num of combo){elems.push(squares[num])}
      elems.forEach(el => el.style.color = "red")

      return this.state.gameDraw ? "It's a draw." : "Well done player " + this.state.winner + "!"
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
        <div className="btn-group">
          <button className="button" onClick={this.reset}>Play again</button>
          <button className="button">Exit game</button>
        </div>
      </div>
    );
  }
}

export default App;
