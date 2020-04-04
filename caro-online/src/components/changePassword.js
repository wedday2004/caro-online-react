import React from 'react';
import $ from 'jquery';
import { Redirect, Link } from 'react-router-dom';
import { Form, Row, Col, Button, Spinner } from 'react-bootstrap';
import AccountMessage from '../containers/accountMessageContainer';

const ChangePassword = props => {
  const { username, changePassword, isBusy, isSucceed } = props;

  let password = '';
  let rePassword = '';
  let isPasswordValid = false;
  const checkPasss = () => {
    if (rePassword === password) {
      isPasswordValid = true;
    } else {
      isPasswordValid = false;
    }
    if (isPasswordValid) {
      $('.registerBtn').attr({ disabled: false });
      $('.repasswordInput').removeClass('is-invalid');
      $('.passwordInput').removeClass('is-invalid');
      $('.repasswordInput').addClass('is-valid');
      $('.passwordInput').addClass('is-valid');
    } else {
      $('.registerBtn').attr({ disabled: true });
      $('.repasswordInput').removeClass('is-valid');
      $('.passwordInput').removeClass('is-valid');
      $('.repasswordInput').addClass('is-invalid');
      $('.passwordInput').addClass('is-invalid');
    }
  };
  const handlePasswordChange = e => {
    password = e.target.value;
    checkPasss();
  };
  const handleRePasswordChange = e => {
    rePassword = e.target.value;
    checkPasss();
  };

  const handleSubmit = e => {
    e.preventDefault();
    const formVal = $('.loginForm').serializeArray();
    if (!isBusy) {
      changePassword(username, formVal[0].value, formVal[1].value);
    }
  };

  return (
    <Row>
      {isSucceed ? (
        <Redirect to={`${process.env.PUBLIC_URL}/`} />
      ) : (
        <Redirect to={`${process.env.PUBLIC_URL}/changepassword`} />
      )}
      <AccountMessage />
      <Col> </Col>
      <Col className="align-self-center">
        <Form className="loginForm" onSubmit={handleSubmit}>
          <Form.Text className="loginTitle">ĐỔI MẬT KHẨU</Form.Text>
          <Form.Group controlId="id">
            <Form.Label className="label">Password cũ</Form.Label>
            <Form.Control
              required
              name="username"
              className="formInput usernameInput"
              type="Password"
              placeholder="Nhập password cũ"
            />

            {/* <Form.Control.Feedback>
              Username có thể sử dụng
            </Form.Control.Feedback> */}
          </Form.Group>

          <Form.Group controlId="password" placeholder="Nhập password">
            <Form.Label className="label ">Password</Form.Label>
            <Form.Control
              required
              name="password"
              className="formInput passwordInput"
              type="Password"
              placeholder="Nhập password mới"
              onChange={handlePasswordChange}
            />

            <Form.Control.Feedback type="valid">
              Password có thể sử dụng !
            </Form.Control.Feedback>

            <Form.Control.Feedback type="invalid">
              Password không giống nhau !
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="password" placeholder="Nhập password">
            <Form.Label className="label ">RePassword</Form.Label>
            <Form.Control
              required
              className="formInput repasswordInput"
              type="Password"
              placeholder="Nhập lại password mới"
              onChange={handleRePasswordChange}
            />

            <Form.Control.Feedback type="valid">
              Password có thể sử dụng !
            </Form.Control.Feedback>

            <Form.Control.Feedback type="invalid">
              Password không giống nhau !
            </Form.Control.Feedback>
          </Form.Group>
          <Button
            className="btnLogin registerBtn"
            variant="success"
            disabled={isBusy}
            type="submit"
          >
            {isBusy ? (
              <div>
                <Spinner
                  as="span"
                  animation="grow"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                  className="spinner"
                />
                Đang thay đổi
              </div>
            ) : (
              <div> Thay đổi</div>
            )}
          </Button>

          <Button
            style={{ 'margin-top': '10px' }}
            variant="info"
            className="btnLogin registerBtn"
          >
            <Link style={{ color: 'white' }} to={`${process.env.PUBLIC_URL}/`}>
              Quay lại
            </Link>
          </Button>
        </Form>
      </Col>
      <Col> </Col>
    </Row>
  );
};
export default ChangePassword;
