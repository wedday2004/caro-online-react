import React from 'react';
import { Image, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './css/sideBar.css';

const leftBarWithComputer = props => {
  const { userData, currentplayer, reset, winner } = props;
  const { gender, age, name, avatar } = userData;
  let tempPlayer = '';
  tempPlayer = currentplayer;

  let status = 'NGƯỜI CHƠI TIẾP THEO LÀ ';
  if (winner !== '') {
    status = 'NGƯỜI CHIẾN THẮNG LÀ ';
    tempPlayer = winner;
  }
  const curplayer = `curplayer ${tempPlayer}`;

  return (
    <div className="status float-right">
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
        <Col md="auto" className="align-self-center">
          <div className="infoGroupTxt">
            <p className="infoTxt">Tên: {name}</p>
            <p className="infoTxt">Tuổi: {age} tuổi</p>
            <p className="infoTxt">Giới tính: {gender}</p>
          </div>
        </Col>
      </Row>
      <div>
        <p className="nextPlayerTitle">{status}</p>
        <div className={curplayer}>{tempPlayer}</div>
        <Button
          type="button"
          className="resetBtn btn btn-success"
          onClick={() => reset()}
        >
          CHƠI LẠI
        </Button>

        <Button type="button" className="resetBtn btn btn-success">
          <Link to={`${process.env.PUBLIC_URL}/`}>TRANG CHỦ</Link>
        </Button>
      </div>
    </div>
  );
};

export default leftBarWithComputer;
