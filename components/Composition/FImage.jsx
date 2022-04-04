import {
  ImageBackground, View, Image,
} from 'react-native';
import React from 'react';
import sizes from 'themes/sizes';

export const FImage = ({
  width, height, imagePath, children, containerStyle, resizeMode, networkImageUrl, imageStyle,
  imageWidth = sizes.WIDTH_FULL, imageHeight = sizes.HEIGHT_FULL,
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
          width: imageWidth,
          height: imageHeight,
          ...imageStyle,
        }}
      >
        {children}
      </ImageBackground>
    </View>
  );
};
