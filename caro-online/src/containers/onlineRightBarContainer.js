import { connect } from 'react-redux';
import { findPlayer } from '../actions/socketActions';

import rightbar from '../components/onlineRightBar';

const mapStateToProps = state => {
  return {
    userData: state.enemyInfo,
    currentplayer: state.currentplayer,
    winner: state.winner,
    currentposition: state.currentposition,
    danhsachnuocdi: state.danhsachnuocdi
  };
};

const mapDispatchToProps = dispatch => {
  return {
    findPlayer: () => dispatch(findPlayer())
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(rightbar);
