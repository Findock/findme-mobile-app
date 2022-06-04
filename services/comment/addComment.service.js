import authClient from 'api/authClient';

export const addCommentService = async (body) => authClient.post('comments', { ...body });
