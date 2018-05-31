import React,{Component} from 'react';
import Welcome from './Welcome'
import Board from './Board'
import Footer from './Footer'

const moves = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
]

export default class OnePlayerGame extends Component {
  constructor(props){
  	super(props);
  	this.state = {
      board: Array(9).fill(''),
      totalMoves: 0,
      gameEnded: false,
      winner: '',
      winningCombo: null,
      gameDraw: false
    };
  }

  handleClick = (event) => {
    let num = event.target.dataset.square
    let {board, totalMoves, gameEnded} = this.state

    if (board[num] === '' && !gameEnded && totalMoves % 2 === 0) {
      ++totalMoves
      board[num] = "X"
      this.setState({board, totalMoves}, () => this.programMove())
    }
  }

  checkWinner = () => {
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
      if (this.state.gameDraw) {
        return "It's a draw."
      } else {
        if (this.state.winner === "X") {
          return "Well done player X!"
        } else {
          return "Better luck next time."
        }
      }
    } else {
      return "1-Player Game"
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

  standardPlay = () => {
    let board = this.state.board
    for(let move of moves){
      //offensive
      if(board[move[0]] === "O" && board[move[1]] === "O" && board[move[2]] === "") {return move[2]}
      else if (board[move[0]] === "O" && board[move[2]] === "O" && board[move[1]] === "") {return move[1]}
      else if (board[move[1]] === "O" && board[move[2]] === "O" && board[move[0]] === "") {return move[0]}
      //defensive
      else if (board[move[0]] === "X" && board[move[1]] === "X" && board[move[2]] === "") {return move[2]}
      else if (board[move[0]] === "X" && board[move[2]] === "X" && board[move[1]] === "") {return move[1]}
      else if (board[move[1]] === "X" && board[move[2]] === "X" && board[move[0]] === "") {return move[0]}
    }
  }

  firstAvailable = () => {
    //first available that is free
    let board = this.state.board
    return board.findIndex(el => el === "")
  }

  findIndex = () => {
    let index = this.standardPlay() ? this.standardPlay() : this.firstAvailable()
    return index
  }

  programMove = () => {
    let corners = [0, 2, 6, 8], center = 4, middle = [1, 3, 5, 7]
    let {board, totalMoves} = this.state

    //program plays second and has O.
    if (totalMoves === 1) {
      // if totalMoves == 1, and the center square is empty, take center square.
      if (board[center] === "") {board[center] = "O"}
      // if center is taken take the first corner
      else {board[corners[0]] = "O"}
    }

    else if (totalMoves === 3) {
      // if totalMoves === 3, if you have center and X takes opposite corner, then take middle.
      if (board[center] === "O") {
        let oppositesA = board[corners[0]] === "X" && board[corners[3]] === "X",
            oppositesB = board[corners[1]] === "X" && board[corners[2]] === "X"

        if (oppositesA||oppositesB) {board[middle[0]] = "O"}
        else {board[this.findIndex()]="O"}
      } else {board[this.findIndex()]="O"}
    }

    else {board[this.findIndex()]="O"}

    ++totalMoves
    this.setState({board, totalMoves}, () => this.checkWinner())
    this.checkDraw()
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
        <Welcome message={this.message()}/>
        <Board board={this.state.board} clicked={this.handleClick}/>
        <Footer reset={this.reset}/>
      </div>
    );
  }
}
