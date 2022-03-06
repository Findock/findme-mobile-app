import authClient from 'api/authClient';

export const logoutUserService = async () => authClient.post('auth/logout');
