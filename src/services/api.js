import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api-sister.yellowsistemas.com.br/',
});

export default api;
