import { FImage } from 'components/Composition/FImage';
import React from 'react';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import colors from 'themes/colors';
import sizes from 'themes/sizes';
import images from 'constants/images';
import { pickImageFromCameraRoll } from 'utils/pickImageFromCameraRoll';
import opacities from 'themes/opacities';

export const FAvatar = ({
  size, setImage, image, isEditable,
}) => {
  const getBorderRadius = () => Math.ceil(size / 2);

  const wrapper = (children) => {
    if (isEditable) {
      return (
        <TouchableWithoutFeedback
          onPress={() => pickImageFromCameraRoll(setImage, {
            allowsEditing: true,
          })}
        >
          <View>
            {children}
          </View>
        </TouchableWithoutFeedback>
      );
    }
    return children;
  };

  return wrapper(
    <FImage
      height={size}
      width={size}
      style={{
        borderRadius: getBorderRadius(),
        ...styles.avatar,
      }}
      imagePath={!image ? images.USER_AVATAR() : image}
      resizeMode={sizes.COVER}
    />,
  );
};

const styles = StyleSheet.create({
  avatar: {
    elevation: sizes.ELEVATION_1,
    shadowOffset: {
      width: 0,
      height: sizes.HEIGHT_4,
    },
    shadowColor: colors.BLACK,
    shadowOpacity: opacities.SHADOW_OPACITY_025,
    shadowRadius: sizes.SHADOW_RADIUS_4,
    overflow: 'hidden',
    backgroundColor: colors.WHITE,
  },
});
