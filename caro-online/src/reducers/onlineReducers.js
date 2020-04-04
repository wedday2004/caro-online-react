export const enemyInfo = (state = '', action) => {
  switch (action.type) {
    case 'GET_ENEMY_INFO': {
      return action.enemyInfo;
    }
    case 'USER_LEFT': {
      return '';
    }
    case 'ENEMY_LEFT': {
      return '';
    }
    default:
      return state;
  }
};

export const messages = (state = [], action) => {
  switch (action.type) {
    case 'REICEIVE_MESSAGE': {
      const arr = state.slice();
      arr.push(action.data);
      return arr;
    }
    case 'USER_LEFT': {
      return [];
    }
    case 'ENEMY_LEFT': {
      return [];
    }
    default:
      return state;
  }
};
