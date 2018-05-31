import React from 'react';
import Square from './Square';

const Board = props =>
  <div id="centered">
    <div id="board" onClick={props.clicked}>
    <Square number={'0'} value={props.board[0]}/>
    <Square number={'1'} value={props.board[1]}/>
    <Square number={'2'} value={props.board[2]}/>
    <Square number={'3'} value={props.board[3]}/>
    <Square number={'4'} value={props.board[4]}/>
    <Square number={'5'} value={props.board[5]}/>
    <Square number={'6'} value={props.board[6]}/>
    <Square number={'7'} value={props.board[7]}/>
    <Square number={'8'} value={props.board[8]}/>
    </div>
  </div>

export default Board;
