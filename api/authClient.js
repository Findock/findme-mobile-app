import axios from 'axios';
import config from 'config';
import * as SecureStore from 'expo-secure-store';

const authClient = axios.create({
  baseURL: config.backendUrl,
  timeout: 20000,
});

authClient.interceptors.request.use(async (req) => {
  const accessToken = await SecureStore.getItemAsync('Authorization');

  req.headers.authorization = accessToken;

  return req;
});

export default authClient;
