// import { Auth } from 'api/auth';
import {
  // INIT_GOOGLE_AUTH,
  // GOOGLE_AUTH_CALLBACK,
  // FINISH_GOOGLE_AUTH,
  // GOOGLE_AUTH_ERROR
  SET_USER_DATA
} from '../constants/Auth';
interface IUserData {
  displayName: string;
  id: '' | number;
}
interface IAuthState {
  userData: IUserData;
}

const initialState: IAuthState = {
  userData: {
    displayName: '',
    id: ''
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
    // case INIT_GOOGLE_AUTH:
    //   return { ...state, isAuthInProcess: true };
    // case GOOGLE_AUTH_CALLBACK:
    //   return { ...state, isWaitForAuthCallback: true };
    // case FINISH_GOOGLE_AUTH:
    //   return { ...state, isAuthInProcess: false, isWaitForAuthCallback: false };
    // case GOOGLE_AUTH_ERROR:
    //   return { ...state, isAuthInProcess: false, isWaitForAuthCallback: false, isError: true };
    default:
      return state;
  }
}
