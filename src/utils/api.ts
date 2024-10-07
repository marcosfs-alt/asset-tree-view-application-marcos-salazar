import axios from 'axios';

const api = axios.create({
  baseURL: 'https://fake-api.tractian.com/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
