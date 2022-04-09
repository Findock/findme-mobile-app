import authClient from 'api/authClient';

export const getOtherUserService = async (id) => authClient.get(`users/other/${id}`);
