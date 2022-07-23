import authClient from 'api/authClient';

export const archiveChatMessageService = async (id) => authClient.post(`chat-archive/${id}`);
