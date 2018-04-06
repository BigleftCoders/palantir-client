import { FETCH_ROOMS } from './constants';
import { IRoomsState } from './types';

const initialState: IRoomsState = {
  roomsItems: []
};

export default function rooms(state = initialState, { type, payload }: any) {
  switch (type) {
    case FETCH_ROOMS:
      return {
        ...state,
        roomsItems: payload
      };
    default:
      return state;
  }
}
