export const squares = (state = Array(400).fill(null), action) => {
  switch (action.type) {
    case 'ONLINE_PLAY': {
      const arr = state.slice();
      arr[action.vitri] = action.player;
      return arr;
    }
    case 'HUMAN_PLAY': {
      const arr = state.slice();
      arr[action.vitri] = 'X';
      return arr;
    }
    case 'COMPUTER_PLAY': {
      const arr = state.slice();
      arr[action.vitri] = 'O';
      return arr;
    }
    case 'RESET': {
      return Array(400).fill(null);
    }
    case 'CHANGE_SQUARES': {
      return action.arr;
    }
    default:
      return state;
  }
};
export const userCharacter = (state = '', action) => {
  switch (action.type) {
    case 'SET_PLAYER': {
      return action.character;
    }
    case 'USER_LEFT': {
      return '';
    }
    case 'ENEMY_LEFT': {
      return 'X';
    }
    default:
      return state;
  }
};
export const currentplayer = (state = 'X', action) => {
  switch (action.type) {
    case 'ONLINE_PLAY': {
      let nextplayer = '';
      if (state === 'O') nextplayer = 'X';
      else nextplayer = 'O';
      return nextplayer;
    }
    case 'HUMAN_PLAY': {
      return 'O';
    }
    case 'COMPUTER_PLAY': {
      return 'X';
    }
    case 'RESET': {
      return 'X';
    }

    case 'CHANGE_TURN': {
      return action.player;
    }
    case 'SURRENDER': {
      return action.userCharacter;
    }
    case 'ENEMY_SURRENDER': {
      return action.userCharacter;
    }

    default:
      return state;
  }
};
export const currentposition = (state = -1, action) => {
  switch (action.type) {
    case 'ONLINE_PLAY': {
      const position = action.vitri;
      return position;
    }
    case 'HUMAN_PLAY': {
      const position = action.vitri;
      return position;
    }
    case 'COMPUTER_PLAY': {
      const position = action.vitri;
      return position;
    }
    case 'RESET': {
      return -1;
    }
    case 'CHANGE_CURRENT_POSITION': {
      return action.vitri;
    }
    default:
      return state;
  }
};

export const winner = (state = '', action) => {
  switch (action.type) {
    case 'RESET': {
      return '';
    }
    case 'CHANGE_TURN': {
      return '';
    }
    case 'WIN': {
      return action.player;
    }
    case 'SURRENDER': {
      return action.userCharacter === 'X' ? 'O' : 'X';
    }
    case 'ENEMY_SURRENDER': {
      return action.userCharacter === 'X' ? 'O' : 'X';
    }
    default:
      return state;
  }
};

export const winline = (state = [], action) => {
  switch (action.type) {
    case 'RESET': {
      return [];
    }
    case 'CHANGE_TURN': {
      return [];
    }
    case 'WIN': {
      return action.winline;
    }

    default:
      return state;
  }
};

export const isBack = (state = false, action) => {
  switch (action.type) {
    case 'HUMAN_PLAY': {
      return false;
    }
    case 'COMPUTER_PLAY': {
      return false;
    }

    case 'RESET': {
      return false;
    }
    case 'BACK': {
      return true;
    }
    default:
      return state;
  }
};

export const isSort = (state = false, action) => {
  switch (action.type) {
    case 'SORT': {
      return !state;
    }
    default:
      return state;
  }
};

export const danhsachnuocdi = (state = [], action) => {
  switch (action.type) {
    case 'ONLINE_PLAY': {
      const arr = state.slice();
      arr.push(action.vitri);
      return arr;
    }
    case 'HUMAN_PLAY': {
      const arr = state.slice();
      arr.push(action.vitri);
      return arr;
    }
    case 'COMPUTER_PLAY': {
      const arr = state.slice();
      arr.push(action.vitri);
      return arr;
    }
    case 'RESET': {
      return [];
    }
    case 'CHANGE_DSND': {
      return action.arr;
    }
    default:
      return state;
  }
};

export const isEnemyNoti = (state = false, action) => {
  switch (action.type) {
    case 'ENEMY_ASK_TIE': {
      return true;
    }
    case 'TIE_RESPONSE': {
      return false;
    }
    default:
      return state;
  }
};

export const isUndoNoti = (state = false, action) => {
  switch (action.type) {
    case 'ENEMY_ASK_UNDO': {
      return true;
    }
    case 'UNDO_RESPONSE': {
      return false;
    }
    default:
      return state;
  }
};

export const isPlayAgain = (state = true, action) => {
  switch (action.type) {
    case 'PLAY_AGAIN': {
      return true;
    }
    case 'ASK_PLAY_AGAIN': {
      return false;
    }
    case 'WIN': {
      return false;
    }
    default:
      return state;
  }
};
