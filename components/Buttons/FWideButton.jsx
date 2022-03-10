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

export const FWideButton = ({
  icon, title, titleWeight, titleSize, titleColor, iconSize, iconColor, buttonBgColor, iconBgColor, onPress,
}) => (
  <TouchableOpacity
    onPress={onPress}
    activeOpacity={opacities.OPACITY_08}
  >
    <View style={{
      ...styles.wideButtonContainer,
      backgroundColor: buttonBgColor,
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
      <Ionicons
        name={icons.CHEVRON_FORWARD_OUTLINE}
        color={titleColor}
        size={iconSize}
      />
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  wideButtonContainer: {
    flexDirection: 'row',
    alignItems: placements.CENTER,
    justifyContent: 'space-between',
    width: sizes.WIDTH_FULL,
    paddingVertical: sizes.PADDING_12,
    paddingHorizontal: sizes.PADDING_25,
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
