import { Platform } from 'react-native';

export const appendFileToFormData = (photo, name) => {
  // eslint-disable-next-line no-undef
  const formData = new FormData();
  // eslint-disable-next-line no-undef
  formData.append('file', {
    uri: Platform.OS === 'android' ? photo.uri : photo.uri.replace('file://', ''),
    name,
    type: 'image/jpeg',
  });
  return formData;
};
