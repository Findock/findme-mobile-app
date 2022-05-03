import authClient from 'api/authClient';

export const getMyAnnouncementsService = (params) => authClient.post('announcements/my/search', {
  ...params,
});
