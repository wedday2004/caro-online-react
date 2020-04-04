import { connect } from 'react-redux';
import { onlinePlay } from '../actions/gameActions';
import gameBoard from '../components/onlineGameBoard';

const mapStateToProps = state => {
  return {
    winline: state.winline,
    currentposition: state.currentposition,
    squares: state.squares,
    currentplayer: state.currentplayer,
    winner: state.winner,
    userCharacter: state.userCharacter,
    enemyInfo: state.enemyInfo,
    isPlayAgain: state.isPlayAgain
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleClick: (vt, player) => dispatch(onlinePlay(vt, player))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(gameBoard);
