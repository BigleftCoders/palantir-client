import {
  // GOOGLE_AUTH_ERROR,
  // GOOGLE_AUTH_CALLBACK,
  // FINISH_GOOGLE_AUTH,
  // INIT_GOOGLE_AUTH
  SET_USER_DATA
} from '../constants/Auth';
import Auth from 'api/auth';
// import Auth, { GOOGLE_AUTH_ENDPOINT } from 'api/auth';

// export function openGoogleAuthWindow() {
//   return (dispatch: any) => {

//     dispatch();
//   };
//   // return { type: INIT_GOOGLE_AUTH };
// }

export function doGoogleAuthCallback(code: string) {
  return async (dispatch: any) => {
    // dispatch({ type: GOOGLE_AUTH_CALLBACK });

    try {
      const response: any = await Auth.doGoogleAuthCallback(code);
      console.log(response);
      // const userData = await response.json();
      dispatch({ type: SET_USER_DATA, payload: response.data });
      // console.log(userData);
      // dispatch({ type: FINISH_GOOGLE_AUTH });
    } catch (error) {
      // dispatch({ type: GOOGLE_AUTH_ERROR });
      throw error;
    }
  };
}

export const getProfile = () => {
  return async (dispatch: any) => {
    try {
      const user = await Auth.getProfile();
      dispatch({ type: SET_USER_DATA, payload: user.data });
      return user;
    } catch (error) {
      throw error;
    }
  };
};
