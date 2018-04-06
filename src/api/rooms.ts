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
  }
};

export default Rooms;
