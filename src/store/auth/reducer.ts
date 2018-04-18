import { IAuthState } from './types';
import { SET_USER_DATA, LOGOUT } from './constants';

const initialState: IAuthState = {
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
        userData: payload
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
