import authClient from 'api/authClient';

export const makeAnnouncementActiveService = async (id) => authClient.put(`announcements/status/make-active/${id}`);
