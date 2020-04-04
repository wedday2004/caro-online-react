import io from 'socket.io-client';
import URL from '../service/URL';

import {
  getEnemyInfo,
  enemyLeft,
  setPlayer,
  reset,
  onlinePlay,
  enemyAskTie,
  enemySurrender,
  userReceiveMessage,
  onlineBack,
  enemyAskUndo,
  playAgain
} from '../actions/gameActions';
import store from '../store/store';

let socket = '';
let clientRoom = -1;
let slot = 0;

export const ketnoi = () => {
  socket = io(URL);
  socket.emit('find', { room: clientRoom }); // gửi yêu cầu tìm kiếm phòng
  socket.on('connectToRoom', data => {
    // nhận phòng từ server
    clientRoom = data;
  });
  socket.on('found', () => {
    // tìm thấy
    socket.emit('userdata', {
      // gửi user info lên server
      user: localStorage.getItem('userdata'),
      room: clientRoom
    });
  });

  socket.on('enemy', data => {
    store.dispatch(getEnemyInfo(JSON.parse(data.user)));
  });

  socket.on('character', data => {
    if (store.getState().userCharacter === '') {
      store.dispatch(setPlayer(data));
    }
  });
  socket.on('someoneLeft', () => {
    store.dispatch(reset());
    store.dispatch(enemyLeft());
    clientRoom = -1;
  });
  socket.on('enemyPlay', vt => {
    const x = store.getState().userCharacter;
    store.dispatch(onlinePlay(vt, x === 'X' ? 'O' : 'X'));
  });
  socket.on('enemyAskTie', () => {
    store.dispatch(enemyAskTie());
  });
  socket.on('tieResponse', data => {
    if (data === true) {
      store.dispatch(reset());
    }
  });
  socket.on('enemyAskUndo', () => {
    store.dispatch(enemyAskUndo());
  });
  socket.on('undoResponse', data => {
    if (data === true) {
      const { danhsachnuocdi, userCharacter, currentplayer } = store.getState();
      let b = 0;
      if (currentplayer === userCharacter) {
        b = 3;
      } else {
        b = 2;
      }
      const vtUndo = danhsachnuocdi[danhsachnuocdi.length - b];
      socket.emit('undo', { vtUndo, clientRoom });
    }
  });
  socket.on('playAgain', () => {
    slot += 1;
    if (slot === 2) {
      slot = 0;
      store.dispatch(playAgain());
    }
  });
  socket.on('serverReqUndo', data => {
    store.dispatch(onlineBack(data));
  });

  socket.on('enemySurrender', data => {
    store.dispatch(enemySurrender(data));
  });

  socket.on('receiveMessage', data => {
    store.dispatch(userReceiveMessage(data));
  });
};
export const userPlay = (vt, character) => {
  socket.emit('userPlay', { vt, character, clientRoom });
};

export const askTie = () => {
  socket.emit('askTie', { clientRoom });
};

export const tieResponse = isAgree => {
  socket.emit('tieResponse', { isAgree, clientRoom });
};

export const askUndo = () => {
  socket.emit('askUndo', { clientRoom });
};

export const askPlayAgain = () => {
  socket.emit('askPlayAgain', { clientRoom });
  slot += 1;
  if (slot === 2) {
    slot = 0;
    store.dispatch(playAgain());
  }
};

export const undoResponse = isAgree => {
  socket.emit('undoResponse', { isAgree, clientRoom });
};

export const surender = userCharacter => {
  socket.emit('surrender', { userCharacter, clientRoom });
};
export const sendMessage = data => {
  socket.emit('sendMessage', { data, clientRoom });
};

export const left = () => {
  store.dispatch(reset());
  socket.emit('left', clientRoom);
  clientRoom = -1;
  socket.close();
};
