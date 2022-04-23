import authClient from 'api/authClient';

export const addAnnouncementToFavouritesService = async (id) => authClient.post(`/announcements/favorites/add/${id}`);
