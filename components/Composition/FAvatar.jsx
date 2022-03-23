import { FImage } from 'components/Composition/FImage';
import React from 'react';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import colors from 'themes/colors';
import sizes from 'themes/sizes';
import images from 'constants/images';
import { pickImageFromCameraRoll } from 'utils/pickImageFromCameraRoll';
import opacities from 'themes/opacities';
import { uploadUserProfileImageService } from 'services/uploadUserProfileImage.service';
import { useDispatch } from 'react-redux';
import { setMe } from 'store/me/meSlice';
import { FButton } from 'components/Buttons/FButton';
import buttonTypes from 'constants/buttonTypes';
import icons from 'themes/icons';
import { getHalfBorderRadius } from 'utils/getHalfBorderRadius';
import appConfig from 'app.config';

export const FAvatar = ({
  size, isEditable, imageUrl, setShowConfirmDeleteUserProfileImageModal, setShowErrorModal,
}) => {
  const dispath = useDispatch();

  const getImageUrl = () => appConfig.extra.apiUrl.substring(0, appConfig.extra.apiUrl.length - 1) + imageUrl;

  const uploadImage = async () => {
    try {
      await pickImageFromCameraRoll(async (result) => {
        // eslint-disable-next-line no-undef
        const formData = new FormData();
        const { uri, type } = result;
        // eslint-disable-next-line no-undef
        formData.append('file', {
          uri,
          name: 'profile-image.png',
          type,
        });
        const res = await uploadUserProfileImageService(formData);
        dispath(setMe(res));
      }, {
        allowsEditing: true,
      });
    } catch (error) {
      setShowErrorModal(true);
    }
  };

  const wrapper = (children) => {
    if (isEditable) {
      return (
        <TouchableWithoutFeedback
          onPress={uploadImage}
        >
          <View>
            <FButton
              type={buttonTypes.ICON_BUTTON}
              icon={icons.TRASH}
              color={colors.WHITE}
              iconSize={sizes.ICON_20}
              backgroundColor={colors.DARK_PRIMARY}
              style={{
                padding: sizes.PADDING_10,
                borderRadius: getHalfBorderRadius(sizes.WIDTH_50),
                ...styles.deleteButton,
              }}
              onPress={() => setShowConfirmDeleteUserProfileImageModal(true)}
            />
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
        borderRadius: getHalfBorderRadius(size),
        ...styles.avatar,
      }}
      networkImageUrl={imageUrl ? getImageUrl() : null}
      imagePath={images.USER_AVATAR()}
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
  deleteButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 3,
  },
});
