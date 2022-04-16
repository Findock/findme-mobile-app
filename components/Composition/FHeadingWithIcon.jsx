import { FHeading } from 'components/Composition/FHeading';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import placements from 'themes/placements';
import { Ionicons } from '@expo/vector-icons';
import sizes from 'themes/sizes';
import PropTypes from 'prop-types';

export const FHeadingWithIcon = ({
  icon, iconPlacement, iconSize, iconColor, titleColor, titleWeight, titleSize, title, titleAlign, titleStyle, iconStyle,
  containerStyle, numberOfLines,
}) => {
  const drawDependingOnIconPlacement = () => {
    if (iconPlacement === placements.RIGHT) {
      return (
        <>
          <View>
            <FHeading
              color={titleColor}
              size={titleSize}
              title={title}
              weight={titleWeight}
              align={titleAlign}
              style={titleStyle}
              numberOfLines={numberOfLines}
            />
          </View>
          <Ionicons
            size={iconSize}
            name={icon}
            color={iconColor}
            style={iconStyle}
          />
        </>
      );
    }
    return (
      <>
        <Ionicons
          size={iconSize}
          name={icon}
          color={iconColor}
          style={iconStyle}
        />
        <View>
          <FHeading
            color={titleColor}
            size={titleSize}
            title={title}
            weight={titleWeight}
            align={titleAlign}
            style={titleStyle}
          />
        </View>
      </>
    );
  };
  return (
    <View style={{
      ...styles.centerView,
      ...containerStyle,
    }}
    >
      {drawDependingOnIconPlacement()}
    </View>
  );
};

const styles = StyleSheet.create({
  centerView: {
    flexDirection: 'row',
    alignItems: placements.CENTER,
    width: sizes.WIDTH_FULL,
  },
});

FHeadingWithIcon.propTypes = {
  icon: PropTypes.string.isRequired,
  iconPlacement: PropTypes.oneOf(['center', 'left', 'right']).isRequired,
  iconSize: PropTypes.number.isRequired,
  iconColor: PropTypes.string.isRequired,
  titleColor: PropTypes.string.isRequired,
  titleWeight: PropTypes.string.isRequired,
  titleSize: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  titleAlign: PropTypes.oneOf(['center', 'left', 'right']),
};
