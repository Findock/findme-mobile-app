import {
  ImageBackground, View, Image,
} from 'react-native';
import React from 'react';
import sizes from 'themes/sizes';
import PropTypes from 'prop-types';

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

FImage.propTypes = {
  width: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  height: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  imagePath: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  resizeMode: PropTypes.oneOf(['cover', 'contain']).isRequired,
  networkImageUrl: PropTypes.string.isRequired,
  imageWidth: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  imageHeight: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
};
