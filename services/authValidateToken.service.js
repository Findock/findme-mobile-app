import authClient from 'api/authClient';

export const authValidateTokenService = () => authClient.get('auth/validate-token');
