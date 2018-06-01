import React,{Component} from 'react';
import Board from './Board'
import Footer from './Footer'

export default class OnePlayerGame extends Component {
  handleClick = (event) => {
    let num = event.target.dataset.square
    let {board, totalMoves, gameEnded} = this.props.state

    if (board[num] === '' && !gameEnded && totalMoves % 2 === 0) {
      board[num] = "X"
      ++totalMoves
      this.props.setStateOnClick(board, totalMoves, this.programMove)
    }
  }

  message = () => {
    if (this.props.state.gameEnded) {
      this.props.turnComboRed()
      if (this.props.state.gameDraw) {
        return "Good job. It's a draw."
      } else {
        if (this.props.state.winner === "X") {
          return "Well done player X!"
        } else {
          return "Better luck next time."
        }
      }
    } else {
      return "1-Player Game"
    }
  }

  standardPlay = () => {
    let board = this.props.state.board
    for(let move of this.props.moves()){
      if(board[move[0]] === "O" && board[move[1]] === "O" && board[move[2]] === "") {return move[2]}
      else if (board[move[0]] === "O" && board[move[2]] === "O" && board[move[1]] === "") {return move[1]}
      else if (board[move[1]] === "O" && board[move[2]] === "O" && board[move[0]] === "") {return move[0]}
      else if (board[move[0]] === "X" && board[move[1]] === "X" && board[move[2]] === "") {return move[2]}
      else if (board[move[0]] === "X" && board[move[2]] === "X" && board[move[1]] === "") {return move[1]}
      else if (board[move[1]] === "X" && board[move[2]] === "X" && board[move[0]] === "") {return move[0]}
    }
  }

  firstAvailable = () => {
    let board = this.props.state.board
    return board.findIndex(el => el === "")
  }

  findIndex = () => {
    let index = this.standardPlay() ? this.standardPlay() : this.firstAvailable()
    return index
  }

  programMove = () => {
    let corners = [0, 2, 6, 8], center = 4, middle = [1, 3, 5, 7]
    let {board, totalMoves} = this.props.state

    if (totalMoves === 1) {
      if (board[center] === "") {board[center] = "O"}
      else {board[corners[0]] = "O"}
    }

    else if (totalMoves === 3) {
      if (board[center] === "O") {
        let oppositesA = board[corners[0]] === "X" && board[corners[3]] === "X",
            oppositesB = board[corners[1]] === "X" && board[corners[2]] === "X"
        if (oppositesA||oppositesB) {board[middle[0]] = "O"}
        else if (board[corners[0]] === "X" && board[middle[3]] === "X") {board[corners[2]]= "O"}
        else if (board[corners[1]] === "X" && board[middle[3]] === "X") {board[corners[3]]= "O"}
        else if (board[corners[2]] === "X" && board[middle[2]] === "X") {board[corners[3]]= "O"}
        else if (board[corners[0]] === "X" && board[middle[2]] === "X") {board[corners[1]]= "O"}
        else {board[this.findIndex()]="O"}
      } else {board[this.findIndex()]="O"}
    }

    else {board[this.findIndex()]="O"}
    ++totalMoves
    this.props.setStateOnClick(board, totalMoves, ()=>null)
  }

  render() {
    return (
      <div className="game">
        <div className="navbar">{this.message()}</div>
        <Board board={this.props.state.board} clicked={this.handleClick}/>
        <Footer reset={this.props.reset}/>
      </div>
    );
  }
}
