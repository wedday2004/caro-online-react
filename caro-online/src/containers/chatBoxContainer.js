import { connect } from 'react-redux';
import { userSendMessage } from '../actions/socketActions';
import chatBox from '../components/chatBox';

const mapStateToProps = state => {
  return {
    enemy: state.enemyInfo,
    user: state.userData,
    messages: state.messages
  };
};

const mapDispatchToProps = dispatch => {
  return {
    send: data => dispatch(userSendMessage(data))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(chatBox);
