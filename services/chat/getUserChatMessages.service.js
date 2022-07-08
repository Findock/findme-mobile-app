import authClient from 'api/authClient';

export const getUserChatMessagesService = async () => authClient.get('chat');
