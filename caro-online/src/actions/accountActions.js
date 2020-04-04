import fetch from 'cross-fetch';
import axios from 'axios';
import $ from 'jquery';
import APIURL from '../service/api';

export const setUserData = userData => ({
  type: 'SET_USER_DATA',
  userData
});

export const showMessage = message => ({
  type: 'SHOW_MESSAGE',
  message
});

export const logOut = () => {
  localStorage.clear();
  return { type: 'LOGOUT' };
};

export const fetchUserData = token => dispatch => {
  dispatch({ type: 'FETCHING' });
  return fetch(`${APIURL.GET_INFO}?secret_token=${token}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    }
  })
    .then(response => response.json())
    .then(res => {
      localStorage.setItem('userdata', JSON.stringify(res));
      dispatch(setUserData(res));
      dispatch({ type: 'COMPLETED' });
    })
    .catch(error => {
      dispatch({ type: 'COMPLETED' });
      throw error;
    });
};

export const fetchLoginData = (username, password) => dispatch => {
  dispatch({ type: 'FETCHING' });
  const data = $.param({ username, password });
  return fetch(APIURL.LOGIN, {
    method: 'POST',
    body: data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    }
  })
    .then(response => response.json())
    .then(res => {
      if (res.user !== false) {
        localStorage.setItem('token', res.token);
        dispatch(fetchUserData(res.token));
      } else {
        dispatch(showMessage('Login thất bại'));
        dispatch({ type: 'COMPLETED' });
      }
    })
    .catch(error => {
      throw error;
    });
};

export const changeInfo = (userData, isShowMessage) => dispatch => {
  dispatch({ type: 'FETCHING' });
  const data = $.param(userData);
  return fetch(APIURL.CHANGE_INFO, {
    method: 'POST',
    body: data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    }
  })
    .then(response => response.json())
    .then(res => {
      if (res.message !== 'Succeed') {
        if (isShowMessage) {
          dispatch(showMessage('Thay đổi thất bại'));
        }
      }
      dispatch({ type: 'COMPLETED' });
    })
    .catch(error => {
      throw error;
    });
};

export const fetchRegisterData = (
  username,
  password,
  isShowMessage,
  userData
) => dispatch => {
  dispatch({ type: 'FETCHING' });
  const data = $.param({ username, password });
  return fetch(APIURL.REGISTER, {
    method: 'POST',
    body: data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    }
  })
    .then(response => response.json())
    .then(res => {
      if (res.message === 'Succeed') {
        dispatch({ type: 'REGISTER_SUCCEED' });
        if (isShowMessage) {
          dispatch(showMessage('Đăng ký thành công'));
          dispatch(fetchLoginData(username, password));
        } else {
          dispatch(fetchLoginData(username, password));
          dispatch(changeInfo(userData));
        }
      } else if (isShowMessage) {
        dispatch(showMessage('Đăng ký thất bại'));
      } else {
        dispatch(fetchLoginData(username, password));
      }
      dispatch({ type: 'COMPLETED' });
    })
    .catch(error => {
      throw error;
    });
};

export const changePassword = (username, password, newpassword) => dispatch => {
  dispatch({ type: 'FETCHING' });
  const data = $.param({ username, password, newpassword });
  return fetch(APIURL.CHANGE_PASSWORD, {
    method: 'POST',
    body: data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    }
  })
    .then(response => response.json())
    .then(res => {
      if (res.message === 'Succeed') {
        dispatch({ type: 'CHANGE_PASSWORD_SUCCEED' });

        dispatch(showMessage('Thay đổi thành công'));
      } else {
        dispatch(showMessage('Không đúng'));
      }
      dispatch({ type: 'COMPLETED' });
    })
    .catch(error => {
      throw error;
    });
};

export const changeAvatar = (username, avatarImg) => dispatch => {
  dispatch({ type: 'FETCHING' });

  // return fetch(APIURL.CHANGE_AVATAR, {
  //   method: 'POST',
  //   body: JSON.stringify({ username, avatar }),
  //   headers: {
  //     'Content-Type': 'application/json; charset=utf-8'
  //   }
  // })
  //   .then(response => response.json())
  //   .then(res => {
  //     console.log(res);
  //   });
  const form = new FormData();
  form.append('username', username);
  form.append('avatarimage', avatarImg);
  const config = {
    headers: {
      'content-type': 'multipart/form-data'
    }
  };
  axios
    .post(APIURL.CHANGE_AVATAR, form, config)
    .then(res => {
      console.log(res.data);
      dispatch(fetchUserData(localStorage.getItem('token')));
      dispatch({ type: 'COMPLETED' });
    })
    .catch(error => {
      throw error;
    });
};
