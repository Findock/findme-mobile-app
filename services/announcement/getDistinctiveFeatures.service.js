import authClient from 'api/authClient';

export const getDistinctiveFeaturesService = async () => authClient.get('distinctive-feature');
