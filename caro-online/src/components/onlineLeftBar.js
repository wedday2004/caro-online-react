import React from 'react';
import { Image, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import EnemyMessage from '../containers/enemyMessageContainer';
import UndoMessage from '../containers/undoMessageContainer';
import './css/sideBar.css';

const onlineLeftBar = props => {
  const {
    userData,
    winner,
    userLeft,
    userCharacter,
    askTie,
    surrender,
    askUndo,
    isPlayAgain
  } = props;
  let { currentplayer } = props;
  const { gender, age, name, avatar } = userData;
  let tempPlayer = '';
  tempPlayer = currentplayer;
  const curplayer = `curplayer ${tempPlayer}`;

  let status = 'ĐẾN LƯỢT';
  if (winner !== '') {
    status = 'NGƯỜI CHIẾN THẮNG LÀ ';
    tempPlayer = winner;
    currentplayer = winner;
  }

  return (
    <div className="status float-right">
      <EnemyMessage />
      <UndoMessage />
      <Row className="userInfo">
        <Col md="auto" className="align-self-center">
          <div className="frameAvatar">
            <Image
              className="avatarImgBar"
              src={
                avatar.indexOf('http') !== 0
                  ? `data:image/jpeg;base64,${avatar}`
                  : avatar
              }
              roundedCircle
            />
          </div>
        </Col>
        <Col className="align-self-center">
          <div className="infoGroupTxt">
            <p className="infoTxt">Tên: {name}</p>
            <p className="infoTxt">Tuổi: {age} tuổi</p>
            <p className="infoTxt">Giới tính: {gender}</p>
          </div>
        </Col>
      </Row>
      <hr />
      <div>
        {isPlayAgain ? (
          <p className="nextPlayerTitle">{status}</p>
        ) : (
          <p className="nextPlayerTitle">ĐỢI ĐỐI THỦ</p>
        )}

        <div className={curplayer}>
          {userCharacter === currentplayer
            ? `BẠN - ${currentplayer}`
            : `ĐỐI THỦ - ${currentplayer}`}
        </div>
        <Button
          type="button"
          className="resetBtn btn btn-success"
          onClick={() => askTie()}
        >
          CẦU HOÀ
        </Button>
        <Button
          type="button"
          className="resetBtn btn btn-success"
          onClick={() => surrender(userCharacter)}
        >
          XIN THUA
        </Button>
        <Button
          type="button"
          className="resetBtn btn btn-success"
          onClick={() => askUndo()}
        >
          UNDO
        </Button>

        <Button type="button" className="resetBtn btn btn-success">
          <Link to={`${process.env.PUBLIC_URL}/`} onClick={() => userLeft()}>
            TRANG CHỦ
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default onlineLeftBar;
