import axios from 'axios';
import nodeenv from 'nodeenv';

export const urlBase = process.env.BASE_URL || 'http://localhost:4000';

const api = axios.create({
  baseURL: urlBase,
});

export default api;
