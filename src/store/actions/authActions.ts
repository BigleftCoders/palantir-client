import {
  GOOGLE_AUTH_ERROR,
  GOOGLE_AUTH_CALLBACK,
  FINISH_GOOGLE_AUTH,
  INIT_GOOGLE_AUTH
} from '../constants/Auth';
import Auth, { GOOGLE_AUTH_ENDPOINT } from 'api/auth';

export function openGoogleAuthWindow() {
  window.open(
    `${process.env.REACT_APP_API_URL}${GOOGLE_AUTH_ENDPOINT}`,
    '_blank',
    'height=400,width=400,fullscreen=no'
  );

  return { type: INIT_GOOGLE_AUTH };
}

export function doGoogleAuthCallback(code: string) {
  return async (dispatch: any) => {
    dispatch({ type: GOOGLE_AUTH_CALLBACK });

    try {
      const response: any = await Auth.doGoogleAuthCallback(code);
      const userData = await response.json();

      console.log(userData);

      window.close();

      dispatch({ type: FINISH_GOOGLE_AUTH });
    } catch (error) {
      dispatch({ type: GOOGLE_AUTH_ERROR });
      throw error;
    }
  };
}
