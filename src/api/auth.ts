import axios from './rest';

const Auth = {
  doGoogleAuthCallback(code: string) {
    return axios.get('/auth/google/callback', {
      params: {
        code
      }
    });
  }
};

// const GOOGLE_AUTH_ENDPOINT = '/auth/google';

// export { GOOGLE_AUTH_ENDPOINT };
export default Auth;
