import React from 'react';
import {
  View, TouchableOpacity, StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FHeading } from 'components/Composition/FHeading';
import icons from 'themes/icons';
import placements from 'themes/placements';
import sizes from 'themes/sizes';
import opacities from 'themes/opacities';
import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';

export const FWideButton = ({
  icon, title, titleWeight, titleSize, titleColor, iconSize, iconColor, buttonBgColor, iconBgColor,
  arrowColor, onPress, style, isLink, navigateTo,
}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={isLink ? () => navigation.navigate(navigateTo) : onPress}
      activeOpacity={opacities.OPACITY_08}
    >
      <View style={{
        ...styles.wideButtonContainer,
        backgroundColor: buttonBgColor,
        ...style,
      }}
      >
        <View style={styles.viewWithIconAndTitle}>
          <View style={{
            ...styles.iconBox,
            backgroundColor: iconBgColor,
          }}
          >
            <Ionicons
              name={icon}
              color={iconColor}
              size={iconSize}
            />
          </View>
          <FHeading
            color={titleColor}
            size={titleSize}
            title={title}
            weight={titleWeight}
            align={placements.LEFT}
          />
        </View>
        {isLink && (
          <Ionicons
            name={icons.CHEVRON_FORWARD_OUTLINE}
            color={arrowColor}
            size={iconSize}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  wideButtonContainer: {
    flexDirection: 'row',
    alignItems: placements.CENTER,
    justifyContent: 'space-between',
    width: sizes.WIDTH_FULL,
    paddingVertical: sizes.PADDING_12,
    paddingHorizontal: sizes.PADDING_25,
    overflow: 'hidden',
  },
  viewWithIconAndTitle: {
    flexDirection: 'row',
    alignItems: placements.CENTER,
    flex: 1,
  },
  iconBox: {
    alignItems: placements.CENTER,
    justifyContent: placements.CENTER,
    marginRight: sizes.MARGIN_20,
    borderRadius: sizes.RADIUS_15,
    width: sizes.WIDTH_50,
    height: sizes.HEIGHT_50,
  },
});
FWideButton.propTypes = {
  icon: PropTypes.string,
  title: PropTypes.string,
  titleWeight: PropTypes.string,
  titleSize: PropTypes.number,
  titleColor: PropTypes.string,
  iconSize: PropTypes.number,
  iconColor: PropTypes.string,
  iconBgColor: PropTypes.string,
  arrowColor: PropTypes.string,
  onPress: PropTypes.func,
  isLink: PropTypes.bool.isRequired,
  navigateTo: PropTypes.string,
};
