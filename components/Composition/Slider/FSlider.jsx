import { FImage } from 'components/Composition/FImage';
import React, {
  useCallback, useState,
} from 'react';
import {
  View, StyleSheet, Dimensions, FlatList,
} from 'react-native';
import sizes from 'themes/sizes';
import PropTypes from 'prop-types';
import { FSliderDot } from 'components/Composition/Slider/FSliderDot';
import placements from 'themes/placements';

export const FSlider = ({ photos }) => {
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
    <FImage
      height={sizes.HEIGHT_FULL}
      width={fullWidth}
      resizeMode={sizes.COVER}
      imagePath={null}
      networkImageUrl={item}
      imageWidth={sizes.WIDTH_FULL}
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
        }}
      />
      <View style={{
        width: sizes.WIDTH_FULL,
        ...styles.dotsContainer,
      }}
      >
        {drawDots()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sliderContainer: {
    height: 350,
    width: Dimensions.get('window').width,
    left: sizes.POSITION_N30,
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
};
