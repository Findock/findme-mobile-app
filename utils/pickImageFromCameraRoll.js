import * as ImagePicker from 'expo-image-picker';

export const pickImageFromCameraRoll = async (setImage, options) => {
  const result = await ImagePicker.launchImageLibraryAsync({
    ...options,
  });
  if (!result.cancelled) return setImage(result);
};
