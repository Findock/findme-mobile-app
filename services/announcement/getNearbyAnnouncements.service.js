import authClient from 'api/authClient';

export const getNearbyAnnouncementsService = async (params) => authClient.post('announcements/nearby/search', { ...params });
