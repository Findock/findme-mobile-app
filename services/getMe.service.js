import authClient from 'api/authClient';

export const getMeService = () => authClient.get('/users/me');
