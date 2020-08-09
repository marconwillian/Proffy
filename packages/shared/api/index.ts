import axios from 'axios';

const api = axios.create({
    baseURL: 'https://server-proffy.marconwillian.dev'
});

export default api;