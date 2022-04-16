import authClient from 'api/authClient';

export const deleteAccountService = async () => authClient.delete('users/me');
