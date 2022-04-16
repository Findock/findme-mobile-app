import authClient from 'api/authClient';

export const getMyAuthTokensService = () => authClient.get('auth/my-auth-tokens');
