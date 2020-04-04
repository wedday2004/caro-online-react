import React from 'react';

const Square = props => {
  const { value, currentposition, onWinLine, onClick } = props;
  const cl = `square ${value} ${currentposition}`;
  return (
    <button
      type="button"
      className={`${cl} ${onWinLine ? 'winLine' : ''}`}
      onClick={() => onClick()}
    >
      {value}
    </button>
  );
};

export default Square;
