import authClient from 'api/authClient';

export const deleteUserProfileImageService = async () => authClient.delete('users/me/profile-image');
