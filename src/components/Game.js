import React, {Component} from 'react';
import Board from './Board';
import Footer from './Footer';

export default class Game extends Component {
  handleClick = (event) => {
    var num = event.target.dataset.square
    var { board, totalMoves, gameEnded } = this.props.state

    if(board[num] === '' && !gameEnded) {
      ++totalMoves
      board[num] = totalMoves % 2 === 0 ? 'O' : 'X'
    }
    this.props.setStateOnClick(board,totalMoves,()=>(null))
  }

  message = () => {
    if (this.props.state.gameEnded) {
      this.props.turnComboRed()
      return this.props.state.gameDraw ? "It's a draw." : "Well done player " + this.props.state.winner + "!"
    } else {
      return "2-Player Game"
    }
  }

  render() {
    return (
      <div className="game">
        <div className="navbar">{this.message()}</div>
        <Board clicked={this.handleClick} board={this.props.state.board}/>
        <Footer reset={this.props.reset}/>
      </div>
    );
  }
}
