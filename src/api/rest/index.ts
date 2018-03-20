import axios, { AxiosInstance } from 'axios';

const restInstance: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL
});

export default restInstance;
