import axios from 'axios';
import config from 'config';

const noAuthClient = axios.create({
  baseURL: config.backendUrl,
  timeout: 20000,
});

export default noAuthClient;
