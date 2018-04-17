import { FETCH_ROOMS } from './constants';
import Rooms from 'api/rooms';

export const fetchRooms = () => {
  return async (dispatch: any) => {
    try {
      const { data }: any = await Rooms.getList();
      dispatch({ type: FETCH_ROOMS, payload: data.reverse() });
      console.log(data);
    } catch (error) {
      throw error;
    }
  };
};
