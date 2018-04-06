import { IAuthState } from './Auth/types';
import { IRoomsState } from './Rooms/types';

export interface IGlobalStore {
  auth: IAuthState;
  rooms: IRoomsState;
}
