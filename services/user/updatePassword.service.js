import authClient from 'api/authClient';

export const updatePasswordService = (data) => authClient.post('users/me/update-password', {
  ...data,
});
