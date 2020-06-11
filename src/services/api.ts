import axios from 'axios';
import dotenv from 'dotenv';

export const urlBase =
  process.env.BASE_URL || 'https://ecoletafry-api.herokuapp.com';

const api = axios.create({
  baseURL: urlBase,
});

export default api;
