import authClient from 'api/authClient';

export const archiveAnnouncementService = async (id) => authClient.put(`announcements/status/archive/${id}`);
