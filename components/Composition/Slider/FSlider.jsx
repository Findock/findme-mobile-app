import React, { useCallback, useState } from 'react';
import {
  Dimensions, FlatList, StyleSheet, View,
} from 'react-native';
import sizes from 'themes/sizes';
import PropTypes from 'prop-types';
import { FSliderDot } from 'components/Composition/Slider/FSliderDot';
import placements from 'themes/placements';
import { FImageWithFullscreenPreview } from 'components/Composition/FImageWithFullscreenPreview';

export const FSlider = ({
  photos,
  height,
  imageResizeMode,
}) => {
  const fullWidth = Dimensions.get('window').width;
  const [
    currentIndex,
    setCurrentIndex,
  ] = useState(0);

  const drawDots = () => photos && photos.map((_, index) => (
    <FSliderDot
      key={index}
      isActive={currentIndex === index}
    />
  ));

  const drawSliderItem = ({ item }) => (
    <FImageWithFullscreenPreview
      height={sizes.HEIGHT_FULL}
      width={fullWidth}
      resizeMode={imageResizeMode}
      imagePath=""
      networkImageUrl={item}
      imageWidth={sizes.WIDTH_FULL}
      photos={photos}
    />
  );

  const onScroll = useCallback((e) => {
    const slideSize = e.nativeEvent.layoutMeasurement.width;
    const index = e.nativeEvent.contentOffset.x / slideSize;
    const roundIndex = Math.ceil(index);

    const distance = Math.abs(roundIndex - index);
    const isNoMansLand = distance > 0.4;
    if (!isNoMansLand) {
      setCurrentIndex(roundIndex);
    }
  }, []);

  return (
    <View>
      <FlatList
        horizontal
        bounces={false}
        initialNumToRender={0}
        maxToRenderPerBatch={1}
        windowSize={2}
        removeClippedSubviews
        onScroll={onScroll}
        pagingEnabled
        scrollEventThrottle={16}
        data={photos}
        keyExtractor={(_, index) => index}
        renderItem={drawSliderItem}
        showsHorizontalScrollIndicator={false}
        style={{
          ...styles.sliderContainer,
          height,
        }}
      />
      {photos.length > 1 && (
        <View style={{
          width: sizes.WIDTH_FULL,
          ...styles.dotsContainer,
        }}
        >
          {drawDots()}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  sliderContainer: {
    width: Dimensions.get('window').width,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: placements.CENTER,
    alignItems: placements.CENTER,
    position: 'absolute',
    bottom: sizes.POSITION_8,
  },
});

FSlider.propTypes = {
  photos: PropTypes.arrayOf(PropTypes.string).isRequired,
  height: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  imageResizeMode: PropTypes.oneOf(['cover', 'contain']).isRequired,
};
