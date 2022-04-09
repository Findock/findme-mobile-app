import { FHeading } from 'components/Composition/FHeading';
import {
  View, StyleSheet, TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import buttonTypes from 'constants/components/buttonTypes';
import sizes from 'themes/sizes';
import placements from 'themes/placements';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import colors from 'themes/colors';

export const FButton = ({
  type, icon = '', title = '', to, color, titleSize, titleWeight, iconSize, onPress, buttonViewStyles,
  backgroundColor, iconPlacement = placements.RIGHT, style, isUnderline,
}) => {
  const navigation = useNavigation();
  const drawLinkButton = () => (
    <TouchableOpacity onPress={() => navigation.navigate(to)}>
      <View
        style={buttonViewStyles}
        hitSlop={{
          top: sizes.POSITION_20,
          left: sizes.POSITION_20,
          bottom: sizes.POSITION_20,
          right: sizes.POSITION_20,
        }}
      >
        <FHeading
          title={title}
          color={color}
          size={titleSize}
          weight={titleWeight}
          isUnderline={isUnderline}
        />
      </View>
    </TouchableOpacity>
  );
  const drawIconButton = () => (
    <TouchableOpacity
      onPressIn={onPress}
      style={{
        padding: sizes.PADDING_20,
        backgroundColor,
        ...style,
      }}
    >
      <Ionicons
        name={icon}
        color={color}
        size={iconSize}
      />
    </TouchableOpacity>
  );
  const drawTextButton = () => (
    <TouchableOpacity onPress={onPress}>
      <View style={{
        ...styles.buttonContainer,
        ...buttonViewStyles,
        backgroundColor,
      }}
      >
        <View>
          <FHeading
            title={title}
            color={color}
            size={titleSize}
            weight={titleWeight}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
  const drawOutlineTextButton = () => (
    <TouchableOpacity onPress={onPress}>
      <View style={{
        ...styles.buttonContainer,
        ...buttonViewStyles,
        backgroundColor: colors.WHITE,
        borderWidth: sizes.BORDER_2,
        borderColor: color,
      }}
      >
        <View>
          <FHeading
            title={title}
            color={color}
            size={titleSize}
            weight={titleWeight}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
  const drawIconAndTextButton = () => (
    <TouchableOpacity onPress={onPress}>
      <View style={{
        ...styles.buttonContainer,
        ...buttonViewStyles,
        backgroundColor,
      }}
      >
        {
          iconPlacement === placements.LEFT ? (
            <>
              <Ionicons
                name={icon}
                color={color}
                size={iconSize}
                style={{ marginRight: sizes.MARGIN_10 }}
              />
              <View>
                <FHeading
                  title={title}
                  color={color}
                  size={titleSize}
                  weight={titleWeight}
                />
              </View>
            </>
          ) : (
            <>
              <View>
                <FHeading
                  title={title}
                  color={color}
                  size={titleSize}
                  weight={titleWeight}
                />
              </View>
              <Ionicons
                name={icon}
                color={color}
                size={iconSize}
                style={{ marginLeft: sizes.MARGIN_10 }}
              />
            </>
          )
        }
      </View>
    </TouchableOpacity>
  );

  const drawButtonByType = () => {
    switch (type) {
    case buttonTypes.BUTTON_WITH_ICON_AND_TEXT:
      return drawIconAndTextButton();
    case buttonTypes.ICON_BUTTON:
      return drawIconButton();
    case buttonTypes.LINK_BUTTON:
      return drawLinkButton();
    case buttonTypes.OUTLINE_TEXT_BUTTON:
      return drawOutlineTextButton();
    case buttonTypes.TEXT_BUTTON:
    default:
      return drawTextButton();
    }
  };

  return drawButtonByType();
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    borderRadius: sizes.RADIUS_20,
    paddingVertical: sizes.PADDING_12,
    paddingHorizontal: sizes.PADDING_25,
    alignItems: placements.CENTER,
    justifyContent: placements.CENTER,
  },
});
