import React, { Component } from "react";
import Board from "./Board";
import Footer from "./Footer";

export default class OnePlayerGame extends Component {
  handleClick = event => {
    let num = event.target.dataset.square;
    let { board, totalMoves, gameEnded } = this.props.state;

    if (board[num] === "" && !gameEnded && totalMoves % 2 === 0) {
      board[num] = "X";
      ++totalMoves;
      this.props.setStateOnClick(board, totalMoves, this.programMove);
    }
  };

  message = () => {
    if (this.props.state.gameEnded) {
      this.props.turnComboRed();
      if (this.props.state.gameDraw) {
        return "Good job. It's a draw.";
      } else {
        if (this.props.state.winner === "X") {
          return "Well done player X!";
        } else {
          return "Better luck next time.";
        }
      }
    } else {
      return "1-Player Game";
    }
  };

  playToWin = () => {
    for (let move of this.props.moves()) {
      let board = this.props.state.board;
      console.log("playing to win");
      console.log(move, board[move[0]], board[move[1]], board[move[2]]);
      if (
        board[move[0]] === "O" &&
        board[move[1]] === "O" &&
        board[move[2]] === ""
      ) {
        console.log("offense 1");
        return move[2];
      } else if (
        board[move[0]] === "O" &&
        board[move[2]] === "O" &&
        board[move[1]] === ""
      ) {
        console.log("offense 2");
        return move[1];
      } else if (
        board[move[1]] === "O" &&
        board[move[2]] === "O" &&
        board[move[0]] === ""
      ) {
        console.log("offense 3");
        return move[0];
      }
    }
  };

  playToDefend = () => {
    for (let move of this.props.moves()) {
      let board = this.props.state.board;
      console.log("playing to defend");
      console.log(move, board[move[0]], board[move[1]], board[move[2]]);
      if (
        board[move[0]] === "X" &&
        board[move[1]] === "X" &&
        board[move[2]] === ""
      ) {
        console.log("defense 1");
        return move[2];
      } else if (
        board[move[0]] === "X" &&
        board[move[2]] === "X" &&
        board[move[1]] === ""
      ) {
        console.log("defense 2");
        return move[1];
      } else if (
        board[move[1]] === "X" &&
        board[move[2]] === "X" &&
        board[move[0]] === ""
      ) {
        console.log("defense 3");
        return move[0];
      }
    }
  };

  standardPlay = () => {
    let bestChoice = this.playToWin() ? this.playToWin() : this.playToDefend();
    let index = this.firstCornerAvailable()
      ? this.firstCornerAvailable()
      : this.firstAvailable();
    return bestChoice ? bestChoice : index;
  };

  firstCornerAvailable = () => {
    let board = this.props.state.board;
    let corners = [0, 2, 6, 8];
    let index = corners.find(el => board[el] === "");
    console.log("firstCornerAvailable", index);
    return index;
  };

  firstAvailable = () => {
    let board = this.props.state.board;
    let index = board.findIndex(el => el === "");
    console.log("firstAvailable", index);
    return index;
  };

  programMove = () => {
    let corners = [0, 2, 6, 8],
      center = 4,
      middle = [1, 3, 5, 7];
    let { board, totalMoves } = this.props.state;

    console.log(totalMoves);

    if (totalMoves === 1) {
      //if player 1 takes a corner or side, computer must take the center
      if (board[center] === "") {
        board[center] = "O";
      } else {
        // if player 1 takes the center, computer should take a corner
        board[corners[0]] = "O";
      }
    } else if (totalMoves === 3) {
      let oppositesOneNine =
          board[corners[0]] === "X" && board[corners[3]] === "X",
        oppositesThreeSeven =
          board[corners[1]] === "X" && board[corners[2]] === "X",
        opposites = oppositesOneNine || oppositesThreeSeven;

      // Player 1 has opposite corners and Player 2 has center
      if (opposites && board[center] === "O") {
        //computer should take a side in order not to lose
        console.log("middle taken");
        board[middle[0]] = "O";
      } else {
        //otherwise the computer should take a corner
        board[this.standardPlay()] = "O";
      }
    } else if (totalMoves > 3) {
      board[this.standardPlay()] = "O";
    }

    ++totalMoves;
    this.props.setStateOnClick(board, totalMoves, () => null);
  };

  render() {
    return (
      <div className="game">
        <div className="navbar">
          <div className="message">{this.message()}</div>
        </div>
        <Board board={this.props.state.board} clicked={this.handleClick} />
        <Footer reset={this.props.reset} />
      </div>
    );
  }
}
