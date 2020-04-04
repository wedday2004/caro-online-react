import { connect } from 'react-redux';
import { humanPlay } from '../actions/gameActions';
import gameBoard from '../components/gameBoard';

const mapStateToProps = state => {
  return {
    winline: state.winline,
    currentposition: state.currentposition,
    squares: state.squares,
    currentplayer: state.currentplayer,
    winner: state.winner
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleClick: vt => dispatch(humanPlay(vt))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(gameBoard);
