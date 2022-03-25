import {
  ImageBackground, View, Image,
} from 'react-native';
import React from 'react';
import sizes from 'themes/sizes';

export const FImage = ({
  width, height, imagePath, children, containerStyle, resizeMode, networkImageUrl, imageStyle,
}) => {
  const getUri = () => {
    if (networkImageUrl) return networkImageUrl;
    if (imagePath) return Image.resolveAssetSource(imagePath).uri;
    return null;
  };
  return (
    <View style={{
      width,
      height,
      ...containerStyle,
    }}
    >
      <ImageBackground
        source={{
          uri: getUri(),
        }}
        resizeMode={resizeMode}
        style={{
          width: sizes.WIDTH_FULL,
          height: sizes.WIDTH_FULL,
          ...imageStyle,
        }}
      />
      {children}
    </View>
  );
};
