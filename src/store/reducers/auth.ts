import {
  INIT_GOOGLE_AUTH,
  GOOGLE_AUTH_CALLBACK,
  FINISH_GOOGLE_AUTH,
  GOOGLE_AUTH_ERROR
} from '../constants/Auth';

const initialState = {
  isAuthInProcess: false,
  isWaitForAuthCallback: false,
  isError: false
};

export default function auth(state = initialState, action: any) {
  switch (action.type) {
    case INIT_GOOGLE_AUTH:
      return { ...state, isAuthInProcess: true };
    case GOOGLE_AUTH_CALLBACK:
      return { ...state, isWaitForAuthCallback: true };
    case FINISH_GOOGLE_AUTH:
      return { ...state, isAuthInProcess: false, isWaitForAuthCallback: false };
    case GOOGLE_AUTH_ERROR:
      return { ...state, isAuthInProcess: false, isWaitForAuthCallback: false, isError: true };
    default:
      return state;
  }
}
