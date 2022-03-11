import { FHeading } from 'components/Composition/FHeading';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import buttonTypes from 'constants/buttonTypes';
import sizes from 'themes/sizes';
import placements from 'themes/placements';
import React from 'react';

export const FButton = ({
  type, icon = '', title = '', navigation, to, color, titleSize, titleWeight, iconSize, onPress, buttonViewStyles,
  backgroundColor, iconPlacement = placements.RIGHT,
}) => {
  const drawLinkButton = () => (
    <TouchableOpacity onPress={() => { navigation.navigate(to); }}>
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
        />
      </View>
    </TouchableOpacity>
  );
  const drawIconButton = () => (
    <TouchableOpacity
      onPress={onPress}
      style={{ padding: sizes.PADDING_20 }}
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
