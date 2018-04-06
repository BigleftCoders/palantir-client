import { combineReducers } from 'redux';
import auth from './Auth/reducer';
import rooms from './Rooms/reducer';

export default combineReducers({
  auth,
  rooms
});
