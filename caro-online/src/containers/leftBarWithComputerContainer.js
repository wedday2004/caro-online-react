import { connect } from 'react-redux';
import { reset } from '../actions/gameActions';
import leftbar from '../components/leftBarWithComputer';

const mapStateToProps = state => {
  return {
    userData: state.userData,
    currentplayer: state.currentplayer,
    winner: state.winner
  };
};

const mapDispatchToProps = dispatch => {
  return {
    reset: () => dispatch(reset())
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(leftbar);
