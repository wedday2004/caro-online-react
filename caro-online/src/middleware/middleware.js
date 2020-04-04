import {
  haveWinner,
  humanPlay,
  computerPlay,
  changeSquares,
  changeCurrentPosition,
  changeTurn,
  changeDSND,
  onlinePlay
} from '../actions/gameActions';
import checkWin from '../function/isWin';
import getComputerPosition from '../function/getComputerPosition';

export default store => next => action => {
  const {
    squares,
    winner,
    isBack,
    danhsachnuocdi,
    currentposition,
    currentplayer
  } = store.getState();

  switch (action.type) {
    case 'ONLINE_PLAY': {
      if (squares[action.vitri] === null && winner === '') {
        store.dispatch(onlinePlay());
        squares[action.vitri] = currentplayer === 'X' ? 'X' : 'O';
        const result = checkWin(squares, action.vitri);
        if (result !== null) {
          store.dispatch(haveWinner(result.winner, result.winLine));
          next(action);
        } else next(action);
      }
      break;
    }
    case 'HUMAN_PLAY': {
      if (
        squares[action.vitri] === null &&
        winner === '' &&
        currentplayer === 'X'
      ) {
        const dsnd = danhsachnuocdi;

        if (isBack) {
          // thay đổi danh sách nước đi khi quay lại
          for (let j = 0; j < dsnd.length; j += 1) {
            if (dsnd[j] === currentposition) {
              dsnd.splice(j + 1);
              break;
            }
          }
          store.dispatch(changeDSND(dsnd));
        }
        store.dispatch(humanPlay());

        squares[action.vitri] = 'X';
        const result = checkWin(squares, action.vitri);
        if (result !== null) {
          store.dispatch(haveWinner(result.winner, result.winLine));
          next(action);
        } else next(action);
        const d = store.getState().danhsachnuocdi;
        const vt = getComputerPosition(d);
        store.dispatch(computerPlay(vt));
      }
      break;
    }
    case 'COMPUTER_PLAY': {
      if (squares[action.vitri] === null && winner === '') {
        squares[action.vitri] = 'O';
        const result = checkWin(squares, action.vitri);
        if (result !== null) {
          store.dispatch(haveWinner(result.winner, result.winLine));
          next(action);
        } else next(action);
      }
      break;
    }
    case 'BACK': {
      let luotdi = '';
      const dsnd = danhsachnuocdi.slice();
      const board = squares.slice();
      //  ấn vào nước đi không có trong bàn cờ
      if (squares[action.vitri] === null) {
        for (let j = 0; j < dsnd.length; j += 1) {
          if (j % 2 === 0) board[danhsachnuocdi[j]] = 'X';
          else board[dsnd[j]] = 'O';
        }
      }
      let checkluotdi = '';
      for (let i = 0; i < dsnd.length; i += 1) {
        //    ấn vào nước đi có trong bàn cờ
        if (dsnd[i] === action.vitri) {
          for (let j = i + 1; j < dsnd.length; j += 1) {
            board[dsnd[j]] = null;
          }
          checkluotdi = i;
          break;
        }
      }
      if (checkluotdi % 2 === 0) luotdi = 'O';
      else luotdi = 'X';
      store.dispatch(changeSquares(board));
      store.dispatch(changeTurn(luotdi));
      store.dispatch(changeCurrentPosition(action.vitri));
      next(action);
      const result = checkWin(board, action.vitri);
      if (result !== null) {
        store.dispatch(haveWinner(result.winner, result.winLine));
        next(action);
      } else next(action);
      break;
    }
    case 'ONLINE_BACK': {
      let luotdi = '';
      const dsnd = danhsachnuocdi.slice();
      const board = squares.slice();

      let checkluotdi = '';

      for (let i = 0; i < dsnd.length; i += 1) {
        //    undo về nước đi có trong bàn cờ
        if (dsnd[i] === action.vitri) {
          for (let j = i + 1; j < dsnd.length; j += 1) {
            board[dsnd[j]] = null;
          }
          checkluotdi = i;
          break;
        }
      }

      // thay đổi danh sách nước đi
      for (let j = 0; j < dsnd.length; j += 1) {
        if (dsnd[j] === action.vitri) {
          dsnd.splice(j + 1);
          break;
        }
      }
      store.dispatch(changeCurrentPosition(action.vitri));
      store.dispatch(changeDSND(dsnd));
      if (checkluotdi % 2 === 0) luotdi = 'O';
      else luotdi = 'X';
      store.dispatch(changeSquares(board));
      store.dispatch(changeTurn(luotdi));

      next(action);
      break;
    }
    default:
      next(action);
  }
};
