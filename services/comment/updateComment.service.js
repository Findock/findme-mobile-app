import authClient from 'api/authClient';

export const updateCommentService = async (id, body) => authClient.put(`comments/${id}`, { ...body });
