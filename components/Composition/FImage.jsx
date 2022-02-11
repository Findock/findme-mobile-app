import {
  ImageBackground, View,
} from 'react-native';
import React from 'react';

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
