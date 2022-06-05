import { TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import sizes from 'themes/sizes';
import PropTypes from 'prop-types';
import { FFullscreenImagePreview } from 'components/Composition/FFullscreenImagePreview';
import { FImage } from 'components/Composition/FImage';

export const FImageWithFullscreenPreview = ({
  width,
  height,
  imagePath,
  containerStyle,
  resizeMode,
  networkImageUrl,
  imageStyle,
  imageWidth = sizes.WIDTH_FULL,
  imageHeight = sizes.HEIGHT_FULL,
  photos,
}) => {
  const [
    showFullscreenImagePreview,
    setShowFullscreenImagePreview,
  ] = useState(false);

  return (
    <TouchableOpacity onPress={() => setShowFullscreenImagePreview(true)}>
      <FFullscreenImagePreview
        visible={showFullscreenImagePreview}
        setVisible={setShowFullscreenImagePreview}
        photos={photos}
        chosenImage={networkImageUrl}
      />
      <FImage
        networkImageUrl={networkImageUrl}
        isChildrenInside={false}
        resizeMode={resizeMode}
        containerStyle={containerStyle}
        width={width}
        height={height}
        imagePath={imagePath}
        imageHeight={imageHeight}
        imageWidth={imageWidth}
        imageStyle={imageStyle}
      />
    </TouchableOpacity>
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
  ]).isRequired,
  imageHeight: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  photos: PropTypes.arrayOf(PropTypes.string),
};
