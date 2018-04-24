import { IAuthState } from './types';
import { SET_USER_DATA, LOGOUT } from './constants';

const initialState: IAuthState = {
  isUserLoaded: false,
  userData: {
    displayName: '',
    googleId: '',
    userId: ''
  }
};

export default function auth(state = initialState, { type, payload }: any) {
  switch (type) {
    case SET_USER_DATA:
      return {
        ...state,
        isUserLoaded: true,
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
