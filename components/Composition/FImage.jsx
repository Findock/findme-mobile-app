import {
  ImageBackground, View,
} from 'react-native';

export const FImage = ({
  width, height, imagePath, children,
}) => (
  <View style={{
    width,
    height,
  }}
  >
    <ImageBackground
      source={imagePath}
      resizeMode="contain"
      style={{
        width,
        height,
      }}
    />
    {children}
  </View>
);
