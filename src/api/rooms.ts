import axios from './rest';

interface ICreateRoomOptions {
  roomName: string;
  description?: string;
}

const Rooms = {
  getList() {
    return axios.get('/room/list');
  },

  createRoom(options: ICreateRoomOptions) {
    return axios.post('/room/create', options);
  },

  getRoom(roomId: number) {
    return axios.get(`/room/${roomId}`);
  }
};

export default Rooms;
