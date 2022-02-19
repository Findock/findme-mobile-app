import { FHeading } from 'components/Composition/FHeading';
import { TouchableWithoutFeedback, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import buttonTypes from 'constants/buttonTypes';
import sizes from 'themes/sizes';
import placements from 'themes/placements';
import React from 'react';

export const FButton = ({
  type, icon = '', title = '', navigation, to, color, titleSize, titleWeight, iconSize, onPress, buttonViewStyles, backgroundColor,
}) => {
  const drawLinkButton = () => (
    <TouchableWithoutFeedback onPress={() => { navigation.navigate(to); }}>
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
    </TouchableWithoutFeedback>
  );
  const drawIconButton = () => (
    <TouchableWithoutFeedback
      onPress={onPress}
      style={{ padding: sizes.PADDING_20 }}
    >
      <Ionicons
        name={icon}
        color={color}
        size={iconSize}
      />
    </TouchableWithoutFeedback>
  );
  const drawTextButton = () => (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={{
        ...styles.buttonContainer,
        backgroundColor,
      }}
      >
        <View style={buttonViewStyles}>
          <FHeading
            title={title}
            color={color}
            size={titleSize}
            weight={titleWeight}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
  const drawIconAndTextButton = () => (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={{
        ...styles.buttonContainer,
        backgroundColor,
      }}
      >
        <View style={buttonViewStyles}>
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

      </View>
    </TouchableWithoutFeedback>
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
  },
});
