import axios from 'axios';

let jwt_data = '';

try {
  jwt_data = localStorage.getItem('jwt').toString();
} catch (ex) {}

const clienteAxios = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  headers: {
    jwt: jwt_data,
  },
});

export default clienteAxios;
