import { IAuthState } from './types';
import { SET_USER_DATA, LOGOUT } from './constants';

const initialState: IAuthState = {
  userData: {
    displayName: '',
    googleId: ''
  }
  // isAuthInProcess: false,
  // isWaitForAuthCallback: false,
  // isError: false
};

export default function auth(state = initialState, action: any) {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        userData: action.payload
      };
    case LOGOUT:
      return {
        ...state,
        userData: {
          displayName: '',
          googleId: ''
        }
      };
    default:
      return state;
  }
}
