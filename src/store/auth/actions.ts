import { SET_USER_DATA, LOGOUT } from './constants';
import Auth from 'api/auth';

export const doGoogleAuthCallback = (code: string) => {
  return async (dispatch: any) => {
    try {
      const response: any = await Auth.doGoogleAuthCallback(code);
      dispatch({ type: SET_USER_DATA, payload: response.data });
      console.log(response.data);

      return response.data;
    } catch (error) {
      throw error;
    }
  };
};

export const getProfile = () => {
  return async (dispatch: any) => {
    try {
      const response: any = await Auth.getProfile();
      dispatch({ type: SET_USER_DATA, payload: response.data });
      console.log(response.data);

      return response.data;
    } catch (error) {
      throw error;
    }
  };
};

export const logout = () => {
  return async (dispatch: any) => {
    try {
      await Auth.logout();
      dispatch({ type: LOGOUT });
    } catch (error) {
      throw error;
    }
  };
};
