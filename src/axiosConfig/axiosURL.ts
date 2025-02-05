import axios from 'axios';

const axiosURL = axios.create({
  baseURL: 'http://localhost:5146',
});

export default axiosURL;
