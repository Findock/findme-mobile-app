import authClient from 'api/authClient';

export const getLastViewedAnnouncementsService = async (params) => authClient.post('announcements/last-viewed/search', { ...params });
