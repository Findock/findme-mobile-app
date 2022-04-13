import authClient from 'api/authClient';

export const getCoatColorsService = async () => authClient.get('coat-colors');
