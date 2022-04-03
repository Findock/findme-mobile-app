import * as ImagePicker from 'expo-image-picker';

export const takePhotoWithCamera = async (setImage, options) => {
  const result = await ImagePicker.launchCameraAsync({
    ...options,
  });
  console.log(result);
  if (!result.cancelled) {
    setImage(result);
  }
};
