import authClient from 'api/authClient';

export const updateUserService = async (data) => authClient.put('users/me', {
  ...data,
});
