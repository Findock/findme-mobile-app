import authClient from 'api/authClient';

export const deleteCommentService = async (id) => authClient.delete(`comments/${id}`);
