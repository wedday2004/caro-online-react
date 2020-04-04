export const userData = (state = '', action) => {
  switch (action.type) {
    case 'SET_USER_DATA': {
      return action.userData;
    }
    case 'LOGOUT': {
      return '';
    }
    default:
      return state;
  }
};

export const isBusy = (state = false, action) => {
  switch (action.type) {
    case 'FETCHING': {
      return true;
    }
    case 'COMPLETED': {
      return false;
    }
    default:
      return state;
  }
};

export const accountMessage = (state = '', action) => {
  switch (action.type) {
    case 'SHOW_MESSAGE': {
      return action.message;
    }
    default:
      return state;
  }
};

// eslint-disable-next-line no-unused-vars
export const isRegisterSucceed = (state = '', action) => {
  switch (action.type) {
    case 'REGISTER_SUCCEED': {
      return true;
    }
    default:
      return false;
  }
};
export const isChangePasswordSucceed = (state = '', action) => {
  switch (action.type) {
    case 'CHANGE_PASSWORD_SUCCEED': {
      return true;
    }
    default:
      return false;
  }
};

export const isNoti = (state = false, action) => {
  switch (action.type) {
    case 'WIN': {
      return true;
    }
    case 'CLOSE_NOTI': {
      return false;
    }
    case 'RESET': {
      return false;
    }
    case 'SHOW_MESSAGE': {
      return true;
    }
    case 'SURRENDER': {
      return true;
    }
    case 'ENEMY_SURRENDER': {
      return true;
    }
    case 'ASK_PLAY_AGAIN': {
      return false;
    }
    default:
      return state;
  }
};
