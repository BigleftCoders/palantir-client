import { FETCH_ROOMS } from './constants';
import { IRoomsState } from './types';

const initialState: IRoomsState = {
  rooms: []
};

export default function auth(state = initialState, { type, payload }: any) {
  switch (type) {
    case FETCH_ROOMS:
      return {
        ...state,
        rooms: payload
      };
    default:
      return state;
  }
}
