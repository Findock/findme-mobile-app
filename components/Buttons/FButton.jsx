import { FHeading } from 'components/Composition/FHeading';
import {
  ActivityIndicator, Platform, StyleSheet, TouchableOpacity, View,
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
import opacities from 'themes/opacities';
import { FImage } from 'components/Composition/FImage';

export const FButton = ({
  type,
  icon = '',
  title = '',
  to,
  color,
  titleSize,
  titleWeight,
  iconSize,
  onPress,
  buttonViewStyles,
  iconViewStyles,
  backgroundColor,
  iconPlacement = placements.RIGHT,
  style,
  isUnderline,
  loading,
  iconViewSize,
  isDisabled = false,
  imagePath,
  imageSize,
}) => {
  const navigation = useNavigation();
  const drawLinkButton = () => (
    <TouchableOpacity
      onPress={() => {
        if (isDisabled) return;
        navigation.navigate(to);
      }}
      disabled={isDisabled}
    >
      <View
        style={{
          ...buttonViewStyles,
          opacity: isDisabled ? opacities.OPACITY_05 : opacities.OPACITY_1,
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
          style={{ opacity: isDisabled ? opacities.OPACITY_05 : opacities.OPACITY_1 }}
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
      disabled={isDisabled}
      style={{
        padding: sizes.PADDING_20,
        backgroundColor,
        ...style,
        opacity: isDisabled ? opacities.OPACITY_05 : opacities.OPACITY_1,
        ...buttonViewStyles,
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
    <TouchableOpacity
      onPress={() => {
        if (isDisabled) return;
        onPress();
      }}
      disabled={isDisabled}
    >
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
    <TouchableOpacity
      onPress={() => {
        if (isDisabled) return;
        onPress();
      }}
      disabled={isDisabled}
    >
      <View style={{
        ...styles.buttonContainer,
        ...buttonViewStyles,
        backgroundColor: colors.WHITE,
        borderWidth: sizes.BORDER_2,
        borderColor: color,
        opacity: isDisabled ? opacities.OPACITY_05 : opacities.OPACITY_1,
      }}
      >
        <View>
          <FHeading
            title={title}
            color={color}
            size={titleSize}
            weight={titleWeight}
            style={{ opacity: isDisabled ? opacities.OPACITY_05 : opacities.OPACITY_1 }}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
  const drawIconAndTextButton = () => (
    <TouchableOpacity
      onPress={() => {
        if (isDisabled) return;
        onPress();
      }}
      disabled={isDisabled}
    >
      <View style={{
        ...styles.buttonContainer,
        ...buttonViewStyles,
        backgroundColor,
        opacity: isDisabled ? opacities.OPACITY_05 : opacities.OPACITY_1,
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
                  opacity: isDisabled ? opacities.OPACITY_05 : opacities.OPACITY_1,
                }}
              />
              <View>
                <FHeading
                  title={title}
                  color={color}
                  size={titleSize}
                  weight={titleWeight}
                  style={{ opacity: isDisabled ? opacities.OPACITY_05 : opacities.OPACITY_1 }}
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
                  style={{ opacity: isDisabled ? opacities.OPACITY_05 : opacities.OPACITY_1 }}
                />
              </View>
              <Ionicons
                name={icon}
                color={color}
                size={iconSize}
                style={{
                  marginLeft: sizes.MARGIN_10,
                  opacity: isDisabled ? opacities.OPACITY_05 : opacities.OPACITY_1,
                }}
              />
            </>
          )
        }
      </View>
    </TouchableOpacity>
  );

  const drawTextAndImageButton = () => (
    <TouchableOpacity
      onPress={() => {
        if (isDisabled) return;
        onPress();
      }}
      disabled={isDisabled}
    >
      <View style={{
        ...styles.buttonContainer,
        flexDirection: 'column',
        ...buttonViewStyles,
        backgroundColor,
        opacity: isDisabled ? opacities.OPACITY_05 : opacities.OPACITY_1,
      }}
      >
        <View style={{ width: sizes.WIDTH_FULL }}>
          <FImage
            networkImageUrl=""
            imageWidth={imageSize}
            imageHeight={imageSize}
            imagePath={imagePath}
            isChildrenInside={false}
            width={sizes.WIDTH_FULL}
            height={imageSize}
            resizeMode={sizes.COVER}
            containerStyle={{
              opacity: isDisabled ? opacities.OPACITY_05 : opacities.OPACITY_1,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          />
          <View style={{ marginTop: sizes.MARGIN_12 }}>
            <FHeading
              title={title}
              color={color}
              size={titleSize}
              weight={titleWeight}
              style={{ opacity: isDisabled ? opacities.OPACITY_05 : opacities.OPACITY_1 }}
              align={placements.CENTER}
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  const drawLoadingButton = () => (
    <TouchableOpacity
      onPress={() => {
        if (isDisabled) return;
        onPress();
      }}
      disabled={isDisabled}
    >
      <View style={{
        ...styles.buttonContainer,
        ...buttonViewStyles,
        backgroundColor,
        opacity: isDisabled ? opacities.OPACITY_05 : opacities.OPACITY_1,
      }}
      >
        <View>
          <FHeading
            title={title}
            color={color}
            size={titleSize}
            weight={titleWeight}
            style={{ opacity: isDisabled ? opacities.OPACITY_05 : opacities.OPACITY_1 }}
          />
        </View>
        {loading && (
          <ActivityIndicator
            animating
            size={Platform.OS === 'ios' ? 'small' : sizes.ICON_20}
            color={color}
            style={{
              marginLeft: sizes.MARGIN_5,
              opacity: isDisabled ? opacities.OPACITY_05 : opacities.OPACITY_1,
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
      disabled={isDisabled}
      style={{
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
          opacity: isDisabled ? opacities.OPACITY_05 : opacities.OPACITY_1,
        }}
        >
          <Ionicons
            name={icon}
            color={color}
            size={iconSize}
            style={{ opacity: isDisabled ? opacities.OPACITY_05 : opacities.OPACITY_1 }}
          />
        </View>
        <View style={{ marginTop: sizes.MARGIN_5 }}>
          <FHeading
            title={title}
            size={fonts.HEADING_NORMAL}
            weight={fonts.HEADING_WEIGHT_MEDIUM}
            color={colors.DARK_GRAY}
            style={{ opacity: isDisabled ? opacities.OPACITY_05 : opacities.OPACITY_1 }}
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
    case buttonTypes.BUTTON_WITH_TEXT_AND_IMAGE:
      return drawTextAndImageButton();
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
  type: PropTypes.oneOf([
    'link',
    'text-and-icon',
    'icon',
    'text',
    'outline-text',
    'loading',
    'icon-with-label',
    'text-and-image',
  ]).isRequired,
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
  imagePath: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  imageSize: PropTypes.number,
};
