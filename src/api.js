import axios from 'axios';

const api = axios.create({
  baseURL: 'https://reagent-api.herokuapp.com/api/v1',
  timeout: 30000,
  withCredentials: true,
});

const onSuccess = response => response;

const onFail = err => {
  throw err;
};

api.interceptors.response.use(onSuccess, onFail);

export default api;
