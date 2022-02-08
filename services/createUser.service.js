import appConfig from 'app.config';
import axios from 'axios';

export const createUserService = (data) => axios.post(`${appConfig.extra.apiKey}users`, {
  ...data,
});
