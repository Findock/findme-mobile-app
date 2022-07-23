import authClient from 'api/authClient';

export const getArchivedChatMessagesService = async () => authClient.get('chat/archived');
