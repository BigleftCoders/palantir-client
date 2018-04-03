import axios from './rest';

const Rooms = {
  getList() {
    return axios.get('/room/list');
  },

  createRoom(roomName: string) {
    return axios.post('/room/create', { roomName });
  }
};

export default Rooms;
