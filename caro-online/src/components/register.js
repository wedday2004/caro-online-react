import React from 'react';
import $ from 'jquery';
import { Link, Redirect } from 'react-router-dom';
import { Form, Row, Col, Button, Spinner } from 'react-bootstrap';
import AccountMessage from '../containers/accountMessageContainer';

const SignUpForm = props => {
  const { registerRequest, isBusy, isSucceed } = props;

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
      registerRequest(formVal[0].value, formVal[1].value, true);
    }
  };

  return (
    <Row>
      {isSucceed ? (
        <Redirect to={`${process.env.PUBLIC_URL}/login`} />
      ) : (
        <Redirect to={`${process.env.PUBLIC_URL}/signup`} />
      )}
      <AccountMessage />
      <Col> </Col>
      <Col className="align-self-center">
        <Form className="loginForm" onSubmit={handleSubmit}>
          <Form.Text className="loginTitle">ĐĂNG KÝ</Form.Text>
          <Form.Group controlId="id">
            <Form.Label className="label">Username</Form.Label>
            <Form.Control
              required
              name="username"
              className="formInput usernameInput"
              type="text"
              placeholder="Nhập username"
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
              placeholder="Nhập password"
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
              placeholder="Nhập password"
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
                Đang đăng ký...
              </div>
            ) : (
              <div> Đăng ký</div>
            )}
          </Button>
          <Form.Text className="notHaveAccountQuestion">
            Đã có tài khoản ?
          </Form.Text>
          <Button variant="link" className="notHaveAccountQuestion">
            <Link to={`${process.env.PUBLIC_URL}/login`}>Đăng nhập !</Link>
          </Button>
        </Form>
      </Col>
      <Col> </Col>
    </Row>
  );
};
export default SignUpForm;
