import { connect } from 'react-redux';
import { closeNoti } from '../actions/gameActions';
import accountMessage from '../components/accountMessage';

const mapStateToProps = state => {
  return {
    message: state.accountMessage,
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
)(accountMessage);
