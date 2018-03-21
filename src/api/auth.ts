import axios from './rest';

export default {
  googleLogin() {
    return axios.get('/auth/google');
  }
};
