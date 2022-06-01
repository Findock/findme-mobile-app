import authClient from 'api/authClient';

export const getAnnouncementComments = async (id) => authClient.get(`comments/to-announcement/${id}`);
