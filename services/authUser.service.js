import noAuthClient from 'api/noAuthClient';

export const authUserService = (data) => noAuthClient.post('auth/login', {
  ...data,
});
