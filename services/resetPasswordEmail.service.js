import authClient from 'api/authClient';

export const resetPasswordEmailService = async () => authClient.post('auth/send-reset-password-email');
