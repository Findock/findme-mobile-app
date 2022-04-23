import authClient from 'api/authClient';

export const removeAnnouncementFromFavouritesService = async (id) => authClient.delete(`/announcements/favorites/remove/${id}`);
