import { connect } from 'react-redux';
import { closeNoti } from '../actions/gameActions';
import gameMessage from '../components/gameMessage';

const mapStateToProps = state => {
  return {
    isNoti: state.isNoti
  };
};

const mapDispatchToProps = dispatch => {
  return {
    close: () => dispatch(closeNoti())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(gameMessage);
