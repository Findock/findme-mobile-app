import authClient from 'api/authClient';

export const getUserAllChatMessagesService = async () => authClient.get('chat');
