export interface IRoomsState {
  roomsItems: IRoom[];
}

export interface IRoom {
  roomName: string;
  description?: string;
  roomId: number;
}

export interface IMessage {
  date: string;
  value: string;
  createdBy: ICreatedBy;
}

interface ICreatedBy {
  userId: number;
}
