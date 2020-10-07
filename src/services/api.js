import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3333',
  // baseURL: 'https://imovapp-api-v01.herokuapp.com',
});

export default api;
