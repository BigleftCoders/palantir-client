import { combineReducers } from 'redux';
import auth from 'store/Auth/reducer';
import rooms from 'store/Rooms/reducer';

export default combineReducers({
  auth,
  rooms
});
