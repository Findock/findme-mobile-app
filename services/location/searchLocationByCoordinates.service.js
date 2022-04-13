import authClient from 'api/authClient';

export const searchLocationByCoordinatesService = (coords) => authClient.post('location/search/by-coordinates', coords);
