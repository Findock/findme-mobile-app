import appConfig from 'app.config';
import axios from 'axios';

const noAuthClient = axios.create({
  baseURL: appConfig.extra.apiUrl,
  timeout: 20000,
});

export default noAuthClient;
