import { START_DOING_CALLBACK, SET_USER_DATA, LOGOUT } from './constants';
import Auth from 'api/auth';

// types
import { AxiosResponse } from 'axios';
import { IUserData } from './types';
import { Dispatch } from 'redux';

export const doGoogleAuthCallback = (code: string) => {
  return async (dispatch: Dispatch<any>) => {
    dispatch({ type: START_DOING_CALLBACK });
    try {
      const {
        data
      }: AxiosResponse<IUserData> = await Auth.doGoogleAuthCallback(code);
      dispatch({ type: SET_USER_DATA, payload: data });

      return data;
    } catch (error) {
      throw error;
    }
  };
};

export const getProfile = () => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data }: AxiosResponse<IUserData> = await Auth.getProfile();
      dispatch({ type: SET_USER_DATA, payload: data });

      return data;
    } catch (error) {
      throw error;
    }
  };
};

export const logout = () => {
  return async (dispatch: Dispatch<any>) => {
    try {
      await Auth.logout();
      dispatch({ type: LOGOUT });
    } catch (error) {
      throw error;
    }
  };
};
