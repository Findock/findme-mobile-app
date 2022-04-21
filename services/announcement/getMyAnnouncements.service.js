import authClient from 'api/authClient';

export const getMyAnnouncementsService = (onlyActive) => authClient.get(`announcements/my?onlyActive=${onlyActive}`);
