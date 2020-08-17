import axios from 'axios';

const api = axios.create({
  baseURL: 'https://reagent-api.herokuapp.com/api/v1',
  timeout: 30000,
  withCredentials: true,
});

export default api;
