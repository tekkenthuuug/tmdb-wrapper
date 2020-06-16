import axios, { AxiosRequestConfig } from 'axios';

const config: AxiosRequestConfig = {
  baseURL: 'https://api.themoviedb.org/3',
};

const axiosInstance = axios.create(config);

export default axiosInstance;
