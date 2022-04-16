import authClient from 'api/authClient';

export const searchDistinctiveFeatureService = async (query) => authClient.post('distinctive-feature/search', { query });
