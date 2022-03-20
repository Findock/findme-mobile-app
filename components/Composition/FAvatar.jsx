import { FImage } from 'components/Composition/FImage';
import React, { useEffect } from 'react';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import colors from 'themes/colors';
import sizes from 'themes/sizes';
import images from 'constants/images';
import { pickImageFromCameraRoll } from 'utils/pickImageFromCameraRoll';
import opacities from 'themes/opacities';
import { uploadUserProfileImageService } from 'services/uploadUserProfileImage.service';

export const FAvatar = ({
  size, setImage, image, isEditable, imageUrl,
}) => {
  const getBorderRadius = () => Math.ceil(size / 2);

  const getImage = () => {
    if (imageUrl) return imageUrl;
    if (!image) return images.USER_AVATAR();
    return image;
  };

  const uploadImage = async () => {
    await pickImageFromCameraRoll(setImage, {
      allowsEditing: true,
    });
  };

  useEffect(() => {
    (async () => {
      try {
        if (image && !image.cancelled) {
          // eslint-disable-next-line no-undef
          const formData = new FormData();
          const { uri, type } = image;
          // eslint-disable-next-line no-undef
          formData.append('file', {
            uri,
            name: 'gowno.png',
            type,
          });
          const res = await uploadUserProfileImageService(formData);
          setImage(res.profileImageUrl);
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, [image]);

  const wrapper = (children) => {
    if (isEditable) {
      return (
        <TouchableWithoutFeedback
          onPress={uploadImage}
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
      height={size + sizes.BORDER_4}
      width={size + sizes.BORDER_4}
      style={{
        borderRadius: getBorderRadius(),
        ...styles.avatar,
      }}
      networkImageUrl={getImage()}
      imagePath={getImage()}
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
    borderWidth: sizes.BORDER_4,
    borderColor: colors.WHITE,
  },
});
