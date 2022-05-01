import authClient from 'api/authClient';

export const resolveAnnouncementService = async (id) => authClient.put(`announcements/status/resolve/${id}`);
