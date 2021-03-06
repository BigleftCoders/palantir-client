import { FETCH_ROOMS, GET_ROOM_BY_ID } from './constants';
import Rooms from 'api/rooms';

// types
import { AxiosResponse } from 'axios';
import { IRoom } from './types';
import { Dispatch } from 'redux';

export const fetchRooms = () => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data }: AxiosResponse<IRoom[]> = await Rooms.getList();
      dispatch({ type: FETCH_ROOMS, payload: data.reverse() });
    } catch (error) {
      throw error;
    }
  };
};

export const getRoomData = (roomId: number) => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data }: AxiosResponse<IRoom> = await Rooms.getRoom(roomId);
      dispatch({ type: GET_ROOM_BY_ID, payload: data });
    } catch (error) {
      throw error;
    }
  };
};
