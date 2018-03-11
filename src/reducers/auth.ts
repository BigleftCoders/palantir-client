import { LOGIN, LOGOUT } from '../constants/Auth';

const initialAuthState = { isLoggedIn: false };

function auth(state = initialAuthState, action: object) {
  switch (action.type) {
    case LOGIN:
      return { ...state, isLoggedIn: true };
    case LOGOUT:
      return { ...state, isLoggedIn: false };
    default:
      return state;
  }
}

export default auth;
