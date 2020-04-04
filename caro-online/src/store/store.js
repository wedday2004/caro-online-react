import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/rootReducers';
import mid from '../middleware/middleware';
import { setUserData } from '../actions/accountActions';
import { reset } from '../actions/gameActions';

const store = createStore(rootReducer, applyMiddleware(thunk, mid));
const user = JSON.parse(localStorage.getItem('userdata'));
store.dispatch(setUserData(user));
store.dispatch(reset);
export default store;
