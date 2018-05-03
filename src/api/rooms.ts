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
  },

  createInvite(roomId: number) {
    return axios.post('/invite/create', { roomId });
  },

  verifyInvite(inviteKey: string) {
    return axios.get(`/invite/verify${inviteKey}`);
  }
};

export default Rooms;
