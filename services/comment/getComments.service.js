import authClient from 'api/authClient';

export const getCommentsService = async (id) => authClient.get(`comments/to-announcement/${id}`);
