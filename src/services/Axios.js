import axios from 'axios';
const instance = axios.create({baseURL: 'https://localhost:44377/api'});
export default instance