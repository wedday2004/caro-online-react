export const onlinePlay = (vitri, player) => ({
  type: 'ONLINE_PLAY',
  vitri,
  player
});

export const haveWinner = (player, winline) => ({
  type: 'WIN',
  player,
  winline
});

export const reset = () => ({
  type: 'RESET'
});

export const sort = () => ({
  type: 'SORT'
});

export const back = vitri => ({
  type: 'BACK',
  vitri
});
export const onlineBack = vitri => ({
  type: 'ONLINE_BACK',
  vitri
});
export const changeSquares = arr => ({
  type: 'CHANGE_SQUARES',
  arr
});
export const changeTurn = player => ({
  type: 'CHANGE_TURN',
  player
});
export const changeCurrentPosition = vitri => ({
  type: 'CHANGE_CURRENT_POSITION',
  vitri
});

export const changeDSND = arr => ({
  type: 'CHANGE_DSND',
  arr
});

export const computerPlay = vitri => ({
  type: 'COMPUTER_PLAY',
  vitri
});

export const humanPlay = vitri => ({
  type: 'HUMAN_PLAY',
  vitri
});

export const closeNoti = () => ({
  type: 'CLOSE_NOTI'
});

export const getEnemyInfo = enemyInfo => ({
  type: 'GET_ENEMY_INFO',
  enemyInfo
});

export const enemyLeft = () => ({
  type: 'ENEMY_LEFT'
});

export const setPlayer = character => ({
  type: 'SET_PLAYER',
  character
});

export const enemyAskTie = () => ({
  type: 'ENEMY_ASK_TIE'
});

export const enemyAskUndo = () => ({
  type: 'ENEMY_ASK_UNDO'
});

export const enemySurrender = userCharacter => ({
  type: 'ENEMY_SURRENDER',
  userCharacter
});

export const userReceiveMessage = data => ({
  type: 'REICEIVE_MESSAGE',
  data
});

export const playAgain = () => ({
  type: 'PLAY_AGAIN'
});
