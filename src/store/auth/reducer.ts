import { IAuthState } from './types';
import { START_DOING_CALLBACK, SET_USER_DATA, LOGOUT } from './constants';

const initialState: IAuthState = {
  isUserLoaded: false,
  isDoingCallback: false,
  userData: {
    displayName: '',
    googleId: '',
    userId: ''
  }
};

export default function auth(state = initialState, { type, payload }: any) {
  switch (type) {
    case START_DOING_CALLBACK:
      return {
        ...state,
        isDoingCallback: true
      };
    case SET_USER_DATA:
      return {
        ...state,
        isUserLoaded: true,
        isDoingCallback: false,
        userData: payload
      };
    case LOGOUT:
      return {
        ...state,
        isUserLoaded: false,
        userData: {
          displayName: '',
          googleId: ''
        }
      };

    default:
      return state;
  }
}
