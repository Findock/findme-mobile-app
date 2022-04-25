import authClient from 'api/authClient';

export const updateAnnouncementService = async (id, data) => authClient.put(`/announcements/update/${id}`, data);
