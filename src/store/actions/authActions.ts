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
      debugger;
      dispatch({ type: SET_USER_DATA, payload: response.data });
      // console.log(userData);

      window.close();

      // dispatch({ type: FINISH_GOOGLE_AUTH });
    } catch (error) {
      // dispatch({ type: GOOGLE_AUTH_ERROR });
      throw error;
    }
  };
}
