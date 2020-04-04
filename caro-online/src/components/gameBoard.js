import { Row, Col } from 'react-bootstrap';
import React from 'react';
import Square from './square';
import GameMessage from '../containers/gameMessageContainer';
import RightBarWithComputer from '../containers/rightBarWithComputerContainer';
import LeftBarWithComputer from '../containers/leftBarWithComputerContainer';
import './css/gameBoard.css';

const gameBoard = props => {
  const {
    handleClick,
    winline,
    currentposition,
    squares,
    currentplayer,
    winner
  } = props;

  const renderSquare = i => {
    let cl = '';
    if (i === currentposition) {
      cl = 'currentsquare';
    }
    return (
      <Square
        key={i}
        currentposition={cl}
        value={squares[i]}
        onClick={() => handleClick(i, currentplayer)}
        onWinLine={winline.includes(i)}
      />
    );
  };

  const table = [];
  for (let i = 0; i < 20; i += 1) {
    const row = [];
    for (let j = 0; j < 20; j += 1) {
      row.push(renderSquare(20 * i + j));
    }
    table.push(
      <div key={i} className="board-row">
        {row}
      </div>
    );
  }

  return (
    <Row>
      <GameMessage mess={winner === 'X' ? 'BẠN THẮNG !' : 'MÁY THẮNG'} />
      <Col className="align-self-center  ">
        <LeftBarWithComputer />
      </Col>
      <Col md="auto" className="align-self-center">
        <div className="game-board">
          <div>{table}</div>
        </div>
      </Col>
      <Col className="align-self-center ">
        <RightBarWithComputer />
      </Col>
    </Row>
  );
};

export default gameBoard;
