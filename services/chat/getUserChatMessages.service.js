import authClient from 'api/authClient';

export const getUserChatMessagesService = async (params) => authClient.get('chat', { ...params });
