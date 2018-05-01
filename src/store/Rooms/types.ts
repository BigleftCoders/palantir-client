export interface IRoomsState {
  roomsItems: IRoom[];
  roomData?: IRoom | object;
  messages: IMessage[] | null;
}

export interface IRoom {
  roomName: string;
  description?: string;
  roomId: number;
  users: IUserItem[];
}

export interface IRoomData {
  foundedRoom: IRoom;
  messagesForRoom: {
    messages: IMessage[];
    roomId: number;
  };
}

export interface IMessage {
  createdAt: number;
  userName: string;
  message: string;
}

export interface IUserItem {
  displayName: string;
  _id: string;
}

// interface ICreatedBy {
//   userId: number;
// }
