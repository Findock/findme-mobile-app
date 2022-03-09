import {
  ImageBackground, View, Image,
} from 'react-native';
import React from 'react';
import sizes from 'themes/sizes';

export const FImage = ({
  width, height, imagePath, children, style, resizeMode,
}) => (
  <View style={{
    width,
    height,
    ...style,
  }}
  >
    <ImageBackground
      source={{ uri: imagePath && Image.resolveAssetSource(imagePath).uri }}
      resizeMode={resizeMode}
      style={{
        width: sizes.WIDTH_FULL,
        height: sizes.WIDTH_FULL,
      }}
    />
    {children}
  </View>
);
