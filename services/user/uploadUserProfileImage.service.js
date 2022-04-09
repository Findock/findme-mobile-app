import config from 'config';
import * as SecureStore from 'expo-secure-store';

export const uploadUserProfileImageService = async (formData) => {
  const accessToken = await SecureStore.getItemAsync('Authorization');
  // eslint-disable-next-line no-undef
  const res = await fetch(`${config.backendUrl}users/me/profile-image`, {
    method: 'POST',
    body: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
      authorization: accessToken,
    },
  });
  return res.json();
};
