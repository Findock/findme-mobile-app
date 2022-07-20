import authClient from 'api/authClient';

export const getUserChatMessagesService = async (id) => authClient.get(`chat/with-user/${id}`);
