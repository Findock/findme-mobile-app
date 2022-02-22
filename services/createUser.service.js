import noAuthClient from 'api/noAuthClient';

export const createUserService = (data) => noAuthClient.post('users', {
  ...data,
});
