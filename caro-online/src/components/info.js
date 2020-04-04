import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Button, Image, FormControl, Form } from 'react-bootstrap';
import $ from 'jquery';
import './css/info.css';
import AccountMessage from '../containers/accountMessageContainer';

const TrangChu = props => {
  const {
    userData,
    logOut,
    changeInfo,
    isBusy,
    fetchUserData,
    changeAvatar,
    findPlayer,
    reset
  } = props;

  const { username, gender, age, name, avatar, avatarURL } = userData;

  const userToUpdate = {
    gender: '',
    age: '',
    name: '',
    avatar: avatarURL
  };

  let isEdit = false;

  const handleAvatarChange = e => {
    const newAvt = e.target.files[0];
    changeAvatar(username, newAvt);
  };
  const handleInfoClick = () => {
    isEdit = !isEdit;
    if (!isEdit) {
      $('.infoGroupInput').show();
      $('.infoGroupTxt').hide();
    } else {
      $('.infoGroupInput').hide();
      $('.infoGroupTxt').show();
    }
  };
  const handleSaveClick = () => {
    userToUpdate.username = username;
    if (!isBusy) {
      changeInfo(userToUpdate).then(() => {
        $('.infoGroupInput').hide();
        $('.infoGroupTxt').show();
        fetchUserData(localStorage.getItem('token'));
        isEdit = !isEdit;
      });
    }
  };

  const handleChangeAvatarClick = () => {
    $('.avatarBtn').trigger('click');
  };

  const handleSubmitChange = e => {
    e.preventDefault();
    const formVal = $('.infoForm').serializeArray();
    userToUpdate.name = formVal[0].value;
    userToUpdate.age = formVal[1].value;
    userToUpdate.gender = formVal[2].value;
    handleSaveClick();
  };
  return (
    <Row>
      <AccountMessage />
      <Col> </Col>
      <Col className="align-self-center">
        <div className="loginForm">
          <p className="infoTitle">TRANG CHỦ</p>
          <hr />
          <Row className="userInfo">
            <Col className="avatar align-self-center">
              <Form.Label>
                <div className="bigAvatarFrame">
                  <Image
                    className="avatarImg"
                    src={
                      avatar.indexOf('http') !== 0
                        ? `data:image/jpeg;base64,${avatar}`
                        : avatar
                    }
                    roundedCircle
                    onClick={() => handleChangeAvatarClick()}
                  />
                </div>
              </Form.Label>
              <FormControl
                className="avatarBtn"
                name="avatar"
                type="file"
                onChange={handleAvatarChange}
              />
            </Col>
            <Col xs={7}>
              <div className="infoGroupTxt">
                <p className="infoTxt">Tên: {name}</p>
                <p className="infoTxt">Tuổi: {age} tuổi</p>
                <p className="infoTxt">Giới tính: {gender}</p>
              </div>

              <div className="infoGroupInput">
                <Form className="infoForm" onSubmit={handleSubmitChange}>
                  <FormControl
                    style={{ border: 'none' }}
                    name="name"
                    className="infoTxt"
                    placeholder={name}
                    required
                  />
                  <FormControl
                    style={{ border: 'none' }}
                    name="age"
                    type="number"
                    className="infoTxt"
                    placeholder={age}
                    required
                  />
                  <select
                    style={{ border: 'none' }}
                    name="gender"
                    className="custom-select infoTxt"
                    id="inputGroupSelect01"
                    required
                  >
                    <option value="Nam">Nam</option>
                    <option value="Nữ">Nữ</option>
                    <option value="Khác">Khác</option>
                  </select>

                  <Button disabled={isBusy} variant="success" type="submit">
                    Lưu
                  </Button>
                  <Button style={{ marginLeft: '10px' }} variant="success">
                    <Link
                      style={{ color: 'white' }}
                      to={`${process.env.PUBLIC_URL}/changepassword`}
                    >
                      Đổi mật khẩu
                    </Link>
                  </Button>
                </Form>
              </div>
            </Col>
          </Row>
          <hr />
          <Row className="d-flex justify-content-center">
            <Button
              className="playBtn btn btn-success"
              onClick={() => handleInfoClick()}
            >
              Chỉnh sửa thông tin
            </Button>

            <Link
              className="playBtn btn btn-success"
              to={`${process.env.PUBLIC_URL}/game`}
            >
              Chơi với máy
            </Link>

            <Link
              className="playBtn btn btn-success"
              to={`${process.env.PUBLIC_URL}/onlinegame`}
              onClick={(findPlayer, reset)}
            >
              Chơi Online
            </Link>

            <Link
              className="playBtn btn btn-success"
              to={`${process.env.PUBLIC_URL}/`}
              onClick={() => logOut()}
            >
              Đăng Xuất
            </Link>
          </Row>
        </div>
      </Col>
      <Col> </Col>
    </Row>
  );
};
export default TrangChu;
