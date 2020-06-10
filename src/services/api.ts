import axios from 'axios';

export const urlBase = process.env.BASE_URL || 'http://localhost:4000';

const api = axios.create({
  baseURL: urlBase,
});

export default api;
