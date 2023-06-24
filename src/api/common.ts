import axios from 'axios';

export const instance = axios.create({
  baseURL: 'https://api.thedogapi.com/v1',
  timeout: 15000,
  headers: { 'x-api-key': import.meta.env.VITE_DOG_API_KEY },
});
