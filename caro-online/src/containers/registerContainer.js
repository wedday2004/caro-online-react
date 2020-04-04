import { connect } from 'react-redux';
import { fetchRegisterData } from '../actions/accountActions';
import signup from '../components/register';

const mapStateToProps = state => {
  return {
    isBusy: state.isBusy,
    isSucceed: state.isRegisterSucceed
  };
};

const mapDispatchToProps = dispatch => {
  return {
    registerRequest: (id, password, isShowMessage) =>
      dispatch(fetchRegisterData(id, password, isShowMessage))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(signup);
