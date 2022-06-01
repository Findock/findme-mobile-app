import authClient from 'api/authClient';

export const addCommentForAnnouncement = async (body) => authClient.post('comments', { ...body });
