import { connect } from 'react-redux';
import { userResponseUndo } from '../actions/socketActions';
import { reset } from '../actions/gameActions';
import gameMessage from '../components/undoMessage';

const mapStateToProps = state => {
  return {
    isNoti: state.isUndoNoti
  };
};

const mapDispatchToProps = dispatch => {
  return {
    reset: () => dispatch(reset()),
    response: isAgree => dispatch(userResponseUndo(isAgree))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(gameMessage);
