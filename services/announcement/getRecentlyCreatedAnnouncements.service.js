import authClient from 'api/authClient';

export const getRecentlyCreatedAnnouncementsService = async (params) => authClient.post(
  'announcements/recently-created/search',
  { ...params },
);
