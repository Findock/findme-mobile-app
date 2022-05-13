import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { FImage } from 'components/Composition/FImage';
import placements from 'themes/placements';
import sizes from 'themes/sizes';
import colors from 'themes/colors';
import fonts from 'themes/fonts';
import { FHeading } from 'components/Composition/FHeading';
import PropTypes from 'prop-types';
import defaultBoxShadow from 'styles/defaultBoxShadow';

export const FTileSelectInput = ({
  width, height, iconSize, iconDefault, iconPressed, label, setValue, value, style,
}) => (
  <TouchableOpacity
    onPress={setValue}
    style={{
      padding: sizes.PADDING_10,
      ...style,
    }}
  >
    <FImage
      networkImageUrl=""
      imagePath={value ? iconPressed : iconDefault}
      width={width}
      height={height}
      resizeMode={sizes.CONTAIN}
      imageWidth={iconSize}
      imageHeight={iconSize}
      containerStyle={{
        ...styles.backgroundContainer,
        backgroundColor: value ? colors.PRIMARY : colors.LIGHT_GRAY,
        width,
        height,
      }}
      isChildrenInside={false}
    />
    <View style={{
      marginTop: 10,
      width,
    }}
    >
      <FHeading
        align={placements.CENTER}
        title={label}
        weight={fonts.HEADING_WEIGHT_SEMIBOLD}
        color={colors.DARK_GRAY}
        size={fonts.HEADING_SMALL}
      />
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  backgroundContainer: {
    justifyContent: placements.CENTER,
    alignItems: placements.CENTER,
    borderRadius: sizes.RADIUS_10,
    ...defaultBoxShadow,
  },
});

FTileSelectInput.propTypes = {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  iconSize: PropTypes.number.isRequired,
  iconDefault: PropTypes.number.isRequired,
  iconPressed: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
  value: PropTypes.bool.isRequired,
};
