import { connect } from 'react-redux';
import { back, sort } from '../actions/gameActions';
import rightBarWithComputer from '../components/rightBarWithComputer';

const mapStateToProps = state => {
  return {
    isSort: state.isSort,
    currentposition: state.currentposition,
    danhsachnuocdi: state.danhsachnuocdi
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleBackClick: id => dispatch(back(id)),
    sort: id => dispatch(sort(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(rightBarWithComputer);
