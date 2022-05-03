import authClient from 'api/authClient';

export const getUserAnnouncementsService = (id, params) => authClient.post(`announcements/other/${id}/search`, {
  ...params,
});
