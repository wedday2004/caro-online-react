import {
  ketnoi,
  left,
  askTie,
  tieResponse,
  surender,
  sendMessage,
  askUndo,
  undoResponse,
  askPlayAgain
} from '../socket/socketio';

export const userLeft = () => dispatch => {
  dispatch({ type: 'USER_LEFT' });
  return left();
};
export const findPlayer = () => dispatch => {
  dispatch({ type: 'FINDING_PLAYER' });
  return ketnoi();
};
export const userAskTie = () => dispatch => {
  dispatch({ type: 'ASK_TIE' });
  return askTie();
};
export const userResponseTie = isAgree => dispatch => {
  dispatch({ type: 'TIE_RESPONSE', isAgree });
  return tieResponse(isAgree);
};

export const userSurrender = userCharacter => dispatch => {
  dispatch({ type: 'SURRENDER', userCharacter });
  return surender(userCharacter);
};

export const userSendMessage = data => dispatch => {
  dispatch({ type: 'SEND_MESSAGE', data });
  return sendMessage(data);
};

export const userAskUndo = () => dispatch => {
  dispatch({ type: 'ASK_UNDO' });
  return askUndo();
};
export const userResponseUndo = isAgree => dispatch => {
  dispatch({ type: 'UNDO_RESPONSE', isAgree });
  return undoResponse(isAgree);
};
export const userAskPlayAgain = () => dispatch => {
  dispatch({ type: 'ASK_PLAY_AGAIN' });
  return askPlayAgain();
};
