import authClient from 'api/authClient';

export const restoreArchivedChatMessageService = async (id) => authClient.delete(`chat-archive/${id}`);
