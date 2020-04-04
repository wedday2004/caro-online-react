import { connect } from 'react-redux';
import { closeNoti, reset } from '../actions/gameActions';
import { userAskPlayAgain } from '../actions/socketActions';
import gameMessage from '../components/onlineGameMessage';

const mapStateToProps = state => {
  return {
    isNoti: state.isNoti
  };
};

const mapDispatchToProps = dispatch => {
  return {
    reset: () => dispatch(reset()),
    close: () => dispatch(closeNoti()),
    playAgain: () => dispatch(userAskPlayAgain())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(gameMessage);
