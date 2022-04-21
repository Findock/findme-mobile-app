import authClient from 'api/authClient';

export const getAnnouncementService = async (id) => authClient.get(`announcements/get/${id}`);
