import { combineReducers } from 'redux';

// reducers
import nav from './nav';
import auth from './auth';

const RootReducer = combineReducers({
  nav,
  auth
});

export default RootReducer;
