import authClient from 'api/authClient';

export const getOtherAnnouncementService = async (id) => authClient.get(`announcements/other/${id}`);
