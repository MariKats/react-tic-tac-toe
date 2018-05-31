import React, {Component} from 'react';
import Board from './Board';
import Footer from './Footer';

export default class Game extends Component {
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

  handleClick = (event) => {
    var num = event.target.dataset.square
    var { board, totalMoves, gameEnded } = this.state

    if(board[num] === '' && !gameEnded) {
      ++totalMoves
      board[num] = totalMoves % 2 === 0 ? 'O' : 'X'
      this.setState({totalMoves,board}, () => this.checkDraw())
    }
    this.checkWinner()
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

    for(let move of moves){
      if(board[move[0]] !== '' && board[move[0]] === board[move[1]] && board[move[1]] === board[move[2]]){
        this.setState({
          gameEnded: true,
          winningCombo: move,
          winner: board[move[0]]
        })
      }
    }
  }

  checkDraw = () => {
    if (this.state.totalMoves === 9 && this.state.winner === '') {
      this.setState({
        gameEnded: true,
        gameDraw: true
      })
    }
  }

  message = () => {
    if (this.state.gameEnded) {
      this.turnComboRed()
      return this.state.gameDraw ? "It's a draw." : "Well done player " + this.state.winner + "!"
    } else {
      return "2-Player Game"
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
    return (
      <div className="game">
        <div className="navbar">{this.message()}</div>
        <Board clicked={this.handleClick} board={this.state.board}/>
        <Footer reset={this.reset}/>
      </div>
    );
  }
}
