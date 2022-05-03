import { FHeading } from 'components/Composition/FHeading';
import {
  View, StyleSheet, TouchableOpacity,
  ActivityIndicator, Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import buttonTypes from 'constants/components/buttonTypes';
import sizes from 'themes/sizes';
import placements from 'themes/placements';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import colors from 'themes/colors';
import PropTypes from 'prop-types';
import fonts from 'themes/fonts';
import defaultBoxShadow from 'styles/defaultBoxShadow';
import { getHalfBorderRadius } from 'styles/utils/getHalfBorderRadius';

export const FButton = ({
  type, icon = '', title = '', to, color, titleSize, titleWeight, iconSize, onPress, buttonViewStyles, iconViewStyles,
  backgroundColor, iconPlacement = placements.RIGHT, style, isUnderline, loading, iconViewSize, isDisabled = false,
}) => {
  const navigation = useNavigation();
  const drawLinkButton = () => (
    <TouchableOpacity onPress={() => {
      if (isDisabled) return;
      navigation.navigate(to);
    }}
    >
      <View
        style={{
          ...buttonViewStyles,
          opacity: isDisabled ? 0.5 : 1,
        }}
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
          style={{ opacity: isDisabled ? 0.5 : 1 }}
        />
      </View>
    </TouchableOpacity>
  );
  const drawIconButton = () => (
    <TouchableOpacity
      onPress={() => {
        if (isDisabled) return;
        onPress();
      }}
      style={{
        padding: sizes.PADDING_20,
        backgroundColor,
        ...style,
        opacity: isDisabled ? 0.5 : 1,
      }}
    >
      <Ionicons
        name={icon}
        color={color}
        size={iconSize}
        style={{ opacity: isDisabled ? 0.5 : 1 }}
      />
    </TouchableOpacity>
  );
  const drawTextButton = () => (
    <TouchableOpacity onPress={() => {
      if (isDisabled) return;
      onPress();
    }}
    >
      <View style={{
        ...styles.buttonContainer,
        ...buttonViewStyles,
        backgroundColor,
        opacity: isDisabled ? 0.5 : 1,
      }}
      >
        <View>
          <FHeading
            title={title}
            color={color}
            size={titleSize}
            weight={titleWeight}
            style={{ opacity: isDisabled ? 0.5 : 1 }}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
  const drawOutlineTextButton = () => (
    <TouchableOpacity onPress={() => {
      if (isDisabled) return;
      onPress();
    }}
    >
      <View style={{
        ...styles.buttonContainer,
        ...buttonViewStyles,
        backgroundColor: colors.WHITE,
        borderWidth: sizes.BORDER_2,
        borderColor: color,
        opacity: isDisabled ? 0.5 : 1,
      }}
      >
        <View>
          <FHeading
            title={title}
            color={color}
            size={titleSize}
            weight={titleWeight}
            style={{ opacity: isDisabled ? 0.5 : 1 }}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
  const drawIconAndTextButton = () => (
    <TouchableOpacity onPress={() => {
      if (isDisabled) return;
      onPress();
    }}
    >
      <View style={{
        ...styles.buttonContainer,
        ...buttonViewStyles,
        backgroundColor,
        opacity: isDisabled ? 0.5 : 1,
      }}
      >
        {
          iconPlacement === placements.LEFT ? (
            <>
              <Ionicons
                name={icon}
                color={color}
                size={iconSize}
                style={{
                  marginRight: sizes.MARGIN_10,
                  opacity: isDisabled ? 0.5 : 1,
                }}
              />
              <View>
                <FHeading
                  title={title}
                  color={color}
                  size={titleSize}
                  weight={titleWeight}
                  style={{ opacity: isDisabled ? 0.5 : 1 }}
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
                  style={{ opacity: isDisabled ? 0.5 : 1 }}
                />
              </View>
              <Ionicons
                name={icon}
                color={color}
                size={iconSize}
                style={{
                  marginLeft: sizes.MARGIN_10,
                  opacity: isDisabled ? 0.5 : 1,
                }}
              />
            </>
          )
        }
      </View>
    </TouchableOpacity>
  );

  const drawLoadingButton = () => (
    <TouchableOpacity onPress={() => {
      if (isDisabled) return;
      onPress();
    }}
    >
      <View style={{
        ...styles.buttonContainer,
        ...buttonViewStyles,
        backgroundColor,
        opacity: isDisabled ? 0.3 : 1,
      }}
      >
        <View>
          <FHeading
            title={title}
            color={color}
            size={titleSize}
            weight={titleWeight}
            style={{ opacity: isDisabled ? 0.5 : 1 }}
          />
        </View>
        {loading && (
          <ActivityIndicator
            animating
            size={Platform.OS === 'ios' ? 'small' : sizes.ICON_20}
            color={color}
            style={{
              marginLeft: sizes.MARGIN_5,
              opacity: isDisabled ? 0.5 : 1,
            }}
          />
        )}
      </View>
    </TouchableOpacity>
  );

  const drawIconButtonWithLabel = () => (
    <TouchableOpacity
      onPress={() => {
        if (isDisabled) return;
        onPress();
      }}
      style={{
        ...style,
        ...styles.iconButtonWithLabel,
        ...buttonViewStyles,
      }}
    >
      <>
        <View style={{
          ...iconViewStyles,
          backgroundColor,
          ...defaultBoxShadow,
          width: iconViewSize,
          height: iconViewSize,
          borderRadius: getHalfBorderRadius(iconViewSize),
          ...styles.iconContainer,
          opacity: isDisabled ? 0.5 : 1,
        }}
        >
          <Ionicons
            name={icon}
            color={color}
            size={iconSize}
            style={{ opacity: isDisabled ? 0.5 : 1 }}
          />
        </View>
        <View style={{ marginTop: sizes.MARGIN_5 }}>
          <FHeading
            title={title}
            size={fonts.HEADING_NORMAL}
            weight={fonts.HEADING_WEIGHT_MEDIUM}
            color={colors.DARK_GRAY}
            style={{ opacity: isDisabled ? 0.5 : 1 }}
          />
        </View>
      </>
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
    case buttonTypes.LOADING_BUTTON:
      return drawLoadingButton();
    case buttonTypes.ICON_BUTTON_WITH_LABEL:
      return drawIconButtonWithLabel();
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
  iconButtonWithLabel: {
    alignItems: placements.CENTER,
    justifyContent: 'center',
  },
  iconContainer: {
    alignItems: placements.CENTER,
    justifyContent: placements.CENTER,
  },
});

FButton.propTypes = {
  type: PropTypes.oneOf(['link', 'text-and-icon', 'icon', 'text', 'outline-text', 'loading', 'icon-with-label']).isRequired,
  iconViewSize: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  icon: PropTypes.string,
  title: PropTypes.string,
  to: PropTypes.string,
  color: PropTypes.string,
  titleSize: PropTypes.number,
  titleWeight: PropTypes.string,
  iconSize: PropTypes.number,
  onPress: PropTypes.func,
  backgroundColor: PropTypes.string,
  iconPlacement: PropTypes.oneOf(['center', 'left', 'right']),
  isUnderline: PropTypes.bool,
  loading: PropTypes.bool,
  isDisabled: PropTypes.bool,
};
