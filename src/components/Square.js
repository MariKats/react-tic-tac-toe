import React from 'react';

const Square = props => (
  <div className="square" data-square={props.number}>{props.value}</div>
);

export default Square;
