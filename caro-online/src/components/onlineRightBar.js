import React from 'react';
import { Image, Row, Col, Spinner } from 'react-bootstrap';
import ChatBox from '../containers/chatBoxContainer';
import NuocDi from './onlineHistory';
import './css/sideBar.css';

const onlineRightBar = props => {
  const { userData, findPlayer, danhsachnuocdi, currentposition } = props;
  const { gender, age, name, avatar } = userData;
  let isFinding = true;
  if (userData === '') {
    findPlayer();
    isFinding = true;
  } else {
    isFinding = false;
  }

  const renderNuocDi = i => {
    let cl = '';
    if (i === currentposition) {
      cl = 'currentposition';
    }
    let tempPlayer = '';
    let turn = 0;
    for (let j = 0; j < danhsachnuocdi.length; j += 1) {
      if (danhsachnuocdi[j] === i) {
        turn = j;
        if (turn % 2 === 0) tempPlayer = 'X';
        else tempPlayer = 'O';
      }
    }
    return (
      <NuocDi
        key={i}
        currentposition={cl}
        player={tempPlayer}
        value={i}
        turn={turn}
      />
    );
  };

  const btnDsnd = [];

  for (let i = danhsachnuocdi.length - 1; i >= 0; i -= 1) {
    btnDsnd.push(renderNuocDi(danhsachnuocdi[i]));
  }

  return (
    <div className="status float-left">
      {isFinding ? (
        <div>
          <p className="findingTxt">Đang tìm kiếm đối thủ...</p>
          <Spinner animation="grow" variant="primary" />
          <Spinner animation="grow" variant="secondary" />
          <Spinner animation="grow" variant="success" />
          <Spinner animation="grow" variant="danger" />
          <Spinner animation="grow" variant="warning" />
          <Spinner animation="grow" variant="info" />
          <Spinner animation="grow" variant="light" />
          <Spinner animation="grow" variant="dark" />
        </div>
      ) : (
        <div style={{ height: '100%' }}>
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
            <hr />
          </Row>

          <p className="nextPlayerTitle">DANH SÁCH NƯỚC ĐI</p>
          <div className="onlineHistory">
            <div className="btnDanhSachNuocDi"> {btnDsnd}</div>
          </div>

          <ChatBox />
        </div>
      )}
    </div>
  );
};

export default onlineRightBar;
