import { connect } from 'react-redux';
import { changePassword } from '../actions/accountActions';
import ChangePassword from '../components/changePassword';

const mapStateToProps = state => {
  return {
    isBusy: state.isBusy,
    isSucceed: state.isChangePasswordSucceed,
    username: state.userData.username
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changePassword: (id, password, newpassword) =>
      dispatch(changePassword(id, password, newpassword))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChangePassword);
