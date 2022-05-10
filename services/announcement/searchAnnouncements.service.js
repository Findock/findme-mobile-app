import authClient from 'api/authClient';

export const searchAnnouncementsService = async (params) => authClient.post('announcements/search', { ...params });
