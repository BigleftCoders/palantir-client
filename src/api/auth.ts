import axios from './rest';

export default {
  googleLogin() {
    return axios.get('/auth/google');
    // return new Promise(async (resolve, reject) => {
    //   const redirectUri = `${window.location.origin}/auth/callback/google`;
    //   const url = `https://accounts.google.com/o/oauth2/auth?client_id=${
    //     process.env.REACT_APP_GOOGLE_CLIENT_ID
    //   }&response_type=code&scope=https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email&redirect_uri=${redirectUri}`;

    //   const res = await axios.get(url);
    //   console.log(res);
    // });
  }
};
