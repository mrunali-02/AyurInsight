import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'http://localhost:5000/api',
  timeout: 120000, // 120 seconds for slow ML models
  headers: {
    'Content-Type': 'application/json'
  }
});

export default axiosClient;
