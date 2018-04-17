import { FETCH_ROOMS, GET_ROOM_BY_ID } from './constants';
import { IRoomsState } from './types';

const initialState: IRoomsState = {
  roomsItems: [],
  roomData: {},
  messages: null
};

export default function rooms(state = initialState, { type, payload }: any) {
  switch (type) {
    case FETCH_ROOMS:
      return {
        ...state,
        roomsItems: payload
      };
    case GET_ROOM_BY_ID:
      return {
        ...state,
        roomData: payload.foundedRoom,
        messages: payload.messagesForRoom.messages
      };
    default:
      return state;
  }
}
