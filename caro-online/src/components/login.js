import { Link } from 'react-router-dom';
import React from 'react';
import $ from 'jquery';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import { Form, Row, Col, Button, Spinner } from 'react-bootstrap';
import './css/form.css';
import AccountMessage from '../containers/accountMessageContainer';

const LoginForm = props => {
  const { loginRequest, isBusy, register } = props;

  const responseFacebook = response => {
    try {
      const { name } = response;
      const id = `fb${response.id}`;
      const pass = 'my_secret';
      const newUser = {};
      const picture = response.picture.data.url;
      newUser.username = id;
      newUser.name = name;
      newUser.avatar = picture;
      newUser.gender = 'Khác';
      newUser.age = '1';
      register(id, pass, false, newUser);
    } catch (e) {
      console.log('err');
    }
  };

  const responseGoogle = response => {
    try {
      const { name, imageUrl } = response.profileObj;
      const id = `gg${response.profileObj.googleId}`;
      const pass = 'my_secret';
      const newUser = {};
      newUser.username = id;
      newUser.name = name;
      newUser.avatar = imageUrl;
      newUser.gender = 'Khác';
      newUser.age = '1';
      register(id, pass, false, newUser);
    } catch (e) {
      console.log('err');
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    const formVal = $('.loginForm').serializeArray();
    if (!isBusy) {
      loginRequest(formVal[0].value, formVal[1].value);
    }
  };
  return (
    <Row>
      <AccountMessage />
      <Col> </Col>
      <Col className="align-self-center">
        <Form className="loginForm" onSubmit={handleSubmit}>
          <Form.Text className="loginTitle">ĐĂNG NHẬP</Form.Text>
          <Form.Group controlId="id">
            <Form.Label className="label">Username</Form.Label>
            <Form.Control
              required
              className="formInput"
              name="username"
              type="text"
              placeholder="Nhập username"
            />
          </Form.Group>
          <Form.Group controlId="password" placeholder="Nhập password">
            <Form.Label className="label">Password</Form.Label>
            <Form.Control
              required
              name="password"
              className="formInput"
              type="Password"
              placeholder="Nhập password"
            />
          </Form.Group>
          <Button
            type="submit"
            className="btnLogin"
            variant="success"
            disabled={isBusy}
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
                Đang đăng nhập ...
              </div>
            ) : (
              <div>Đăng nhập</div>
            )}
          </Button>
          <Form.Text className="notHaveAccountQuestion">
            Hoặc đăng nhập bằng
          </Form.Text>
          <div className="socialBtnLogin">
            <GoogleLogin
              className="googleBtn"
              clientId="718126775668-4lvfa2r63uhvf98mc7j8u5q57h9bf1mo.apps.googleusercontent.com"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              buttonText=""
            />
            <FacebookLogin
              textButton=""
              appId="476825822925373"
              fields="name,email,picture"
              icon="fa-facebook"
              callback={responseFacebook}
              cssClass="fbBtn"
            />
          </div>
          <Form.Text className="notHaveAccountQuestion">
            Bạn chưa có tài khoản ?
          </Form.Text>

          <Button variant="link" className="notHaveAccountQuestion">
            <Link to={`${process.env.PUBLIC_URL}/signup`}>Đăng ký !</Link>
          </Button>
        </Form>
      </Col>

      <Col> </Col>
    </Row>
  );
};
export default LoginForm;
