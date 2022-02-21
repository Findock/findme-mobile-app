import appConfig from 'app.config';
import axios from 'axios';

export const authUserService = (data) => axios.post(`${appConfig.extra.apiKey}auth/login`, {
  ...data,
});
