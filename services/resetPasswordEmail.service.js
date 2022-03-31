import authClient from 'api/authClient';

export const resetPasswordEmailService = (email) => authClient.post('auth/send-reset-password-email', email);
