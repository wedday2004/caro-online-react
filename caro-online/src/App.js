import { Route, Switch, Redirect } from 'react-router-dom';
import React from 'react';
import './App.css';
import Board from './containers/gameBoardContainer';
import OnlineBoard from './containers/onlineGameBoardContainer';
import LoginForm from './containers/loginContainer';
import SignUpForm from './containers/registerContainer';
import TrangChu from './containers/infoContainer';
import ChangePassword from './containers/changePasswordContainer';

const App = props => {
  const { userData } = props;

  let login = false;
  if (userData === null || userData === '') {
    login = true;
  } else {
    login = false;
  }

  return (
    <Switch>
      <Route exact path={`${process.env.PUBLIC_URL}/`}>
        {login ? (
          <Redirect to={`${process.env.PUBLIC_URL}/login`} />
        ) : (
          <TrangChu />
        )}
      </Route>
      <Route path={`${process.env.PUBLIC_URL}/game`}>
        {login ? (
          <Redirect to={`${process.env.PUBLIC_URL}/login`} />
        ) : (
          <Board />
        )}
      </Route>
      <Route path={`${process.env.PUBLIC_URL}/onlinegame`}>
        {login ? (
          <Redirect to={`${process.env.PUBLIC_URL}/login`} />
        ) : (
          <OnlineBoard />
        )}
      </Route>
      <Route path={`${process.env.PUBLIC_URL}/login`}>
        {login ? <LoginForm /> : <Redirect to={`${process.env.PUBLIC_URL}/`} />}
      </Route>
      <Route path={`${process.env.PUBLIC_URL}/changepassword`}>
        {login ? (
          <Redirect to={`${process.env.PUBLIC_URL}/`} />
        ) : (
          <ChangePassword />
        )}
      </Route>
      <Route path={`${process.env.PUBLIC_URL}/signup`}>
        {login ? (
          <SignUpForm />
        ) : (
          <Redirect to={`${process.env.PUBLIC_URL}/`} />
        )}
      </Route>
    </Switch>
  );
};

export default App;
