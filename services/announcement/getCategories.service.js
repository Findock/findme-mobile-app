import authClient from 'api/authClient';

export const getCategoriesService = () => authClient.get('announcement-categories');
