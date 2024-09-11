import axios from 'axios';

// Configuração do Axios
const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL
});

export default api;