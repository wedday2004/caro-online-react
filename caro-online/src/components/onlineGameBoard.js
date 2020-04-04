import { Row, Col } from 'react-bootstrap';
import React from 'react';
import Square from './square';
import GameMessage from '../containers/onlineGameMessageContainer';
import OnlineLeftBar from '../containers/onlineLeftBarContainer';
import OnlineRightBar from '../containers/onlineRightBarContainer';
import './css/gameBoard.css';
import { userPlay } from '../socket/socketio';

const gameBoard = props => {
  const {
    handleClick,
    winline,
    currentposition,
    squares,
    currentplayer,
    userCharacter,
    enemyInfo,
    winner,
    isPlayAgain
  } = props;

  let isMyTurn = true;
  if (
    userCharacter === currentplayer &&
    enemyInfo !== '' &&
    isPlayAgain === true
  ) {
    isMyTurn = true;
  } else {
    isMyTurn = false;
  }

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
        onClick={() => {
          if (isMyTurn) {
            handleClick(i, currentplayer);
            userPlay(i, currentplayer);
          }
        }}
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
      <GameMessage
        mess={winner === userCharacter ? 'BẠN THẮNG !' : 'BẠN THUA'}
      />
      <Col className="align-self-center  ">
        <OnlineLeftBar />
      </Col>
      <Col md="auto" className="align-self-center">
        <div className="game-board">
          <div>{table}</div>
        </div>
      </Col>
      <Col className="align-self-center ">
        <OnlineRightBar />
      </Col>
    </Row>
  );
};

export default gameBoard;
