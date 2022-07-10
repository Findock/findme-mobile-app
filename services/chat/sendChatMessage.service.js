import authClient from 'api/authClient';

export const sendChatMessageService = async (id, body) => authClient.post(`chat/for-user/${id}`, { ...body });
