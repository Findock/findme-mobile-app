import { TouchableWithoutFeedback, View } from 'react-native';
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
  onClose = () => ({}),
  isChildrenInside,
  children,
}) => {
  const [
    showFullscreenImagePreview,
    setShowFullscreenImagePreview,
  ] = useState(false);

  const handleVisibleChange = (visible) => {
    setShowFullscreenImagePreview(visible);
    onClose();
  };

  return (
    <TouchableWithoutFeedback onPress={() => setShowFullscreenImagePreview(true)}>
      <View>
        <FFullscreenImagePreview
          visible={showFullscreenImagePreview}
          setVisible={handleVisibleChange}
          photos={photos}
          chosenImage={networkImageUrl}
        />
        <FImage
          networkImageUrl={networkImageUrl}
          isChildrenInside={isChildrenInside}
          resizeMode={resizeMode}
          containerStyle={containerStyle}
          width={width}
          height={height}
          imagePath={imagePath}
          imageHeight={imageHeight}
          imageWidth={imageWidth}
          imageStyle={imageStyle}
        >
          {isChildrenInside && children}
        </FImage>
      </View>
    </TouchableWithoutFeedback>
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
  photos: PropTypes.arrayOf(PropTypes.string),
  onClose: PropTypes.func,
  isChildrenInside: PropTypes.bool.isRequired,
};
