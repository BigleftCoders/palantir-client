import { FETCH_ROOMS } from './constants';
import Rooms from 'api/rooms';

export const fetchRooms = () => {
  return async (dispatch: any) => {
    try {
      const response: any = await Rooms.getList();
      dispatch({ type: FETCH_ROOMS, payload: response.data });
      console.log(response.data);
    } catch (error) {
      throw error;
    }
  };
};
