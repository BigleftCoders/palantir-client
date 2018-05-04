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
  userId: string;
  color: string;
}

export interface IUserItem {
  displayName: string;
  color: string;
  _id: string;
}

export interface IInviteResponse {
  roomId: number;
}

// interface ICreatedBy {
//   userId: number;
// }
