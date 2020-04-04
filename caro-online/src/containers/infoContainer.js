import { connect } from 'react-redux';
import {
  logOut,
  changeInfo,
  fetchUserData,
  changeAvatar
} from '../actions/accountActions';
import { reset } from '../actions/gameActions';
import info from '../components/info';

const mapStateToProps = state => {
  return {
    userData: state.userData,
    isBusy: state.isBusy
  };
};

const mapDispatchToProps = dispatch => {
  return {
    reset: () => dispatch(reset()),
    logOut: () => dispatch(logOut()),
    changeInfo: user => dispatch(changeInfo(user, true)),
    fetchUserData: token => dispatch(fetchUserData(token)),
    changeAvatar: (username, avtImg) => dispatch(changeAvatar(username, avtImg))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(info);
