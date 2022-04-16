import authClient from 'api/authClient';

export const createAnnouncementService = async (data) => authClient.post('announcements', data);
