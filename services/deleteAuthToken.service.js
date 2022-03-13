import authClient from 'api/authClient';

export const deleteAuthTokenService = (id) => authClient.delete(`auth/auth-token/${id}`);
