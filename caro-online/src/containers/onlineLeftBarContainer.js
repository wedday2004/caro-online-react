import { connect } from 'react-redux';
import { reset } from '../actions/gameActions';
import {
  userLeft,
  userAskTie,
  userSurrender,
  userAskUndo
} from '../actions/socketActions';
import leftbar from '../components/onlineLeftBar';

const mapStateToProps = state => {
  return {
    userData: state.userData,
    currentplayer: state.currentplayer,
    winner: state.winner,
    userCharacter: state.userCharacter,
    isPlayAgain: state.isPlayAgain
  };
};

const mapDispatchToProps = dispatch => {
  return {
    reset: () => dispatch(reset()),
    userLeft: () => dispatch(userLeft()),
    askTie: () => dispatch(userAskTie()),
    askUndo: () => dispatch(userAskUndo()),
    surrender: userCharacter => dispatch(userSurrender(userCharacter))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(leftbar);
