import { connect } from 'react-redux';
import {
  fetchLoginData,
  fetchRegisterData,
  changeInfo,
  showMessage
} from '../actions/accountActions';
import login from '../components/login';

const mapStateToProps = state => {
  return {
    isBusy: state.isBusy,
    loginStatus: state.loginStatus,
    registerStatus: state.register
  };
};

const mapDispatchToProps = dispatch => {
  return {
    showMessage: message => dispatch(showMessage(message)),
    loginRequest: (id, password) => dispatch(fetchLoginData(id, password)),
    register: (id, password, isShowMessage, userData) =>
      dispatch(fetchRegisterData(id, password, isShowMessage, userData)),
    changeInfo: (userData, isShowMessage) =>
      dispatch(changeInfo(userData, isShowMessage))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(login);
