import appConfig from 'app.config';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const authClient = axios.create({
  baseURL: appConfig.extra.apiUrl,
});

authClient.interceptors.request.use(async (req) => {
  const accessToken = await SecureStore.getItemAsync('Authorization');

  req.headers.authorization = accessToken;

  return req;
});

export default authClient;
