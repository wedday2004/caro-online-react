import { connect } from 'react-redux';
import { userResponseTie } from '../actions/socketActions';
import { reset } from '../actions/gameActions';
import gameMessage from '../components/enemyMessage';

const mapStateToProps = state => {
  return {
    isNoti: state.isEnemyNoti
  };
};

const mapDispatchToProps = dispatch => {
  return {
    reset: () => dispatch(reset()),
    response: isAgree => dispatch(userResponseTie(isAgree))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(gameMessage);
