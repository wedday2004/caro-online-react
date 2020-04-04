import { connect } from 'react-redux';
import app from '../App';

const mapStateToProps = state => {
  return {
    userData: state.userData
  };
};

export default connect(
  mapStateToProps,
  null
)(app);
