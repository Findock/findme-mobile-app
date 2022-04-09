import { FButton } from 'components/Buttons/FButton';
import { FImage } from 'components/Composition/FImage';
import buttonTypes from 'constants/components/buttonTypes';
import images from 'constants/images';
import { useCameraRollPermission } from 'hooks/permissions/useCameraRollPermission';
import React from 'react';
import {
  Platform, StyleSheet, TouchableWithoutFeedback, View,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { uploadUserProfileImageService } from 'services/user/uploadUserProfileImage.service';
import { setMe } from 'store/me/meSlice';
import colors from 'themes/colors';
import icons from 'themes/icons';
import opacities from 'themes/opacities';
import sizes from 'themes/sizes';
import { getHalfBorderRadius } from 'utils/getHalfBorderRadius';
import { pickImageFromCameraRoll } from 'utils/pickImageFromCameraRoll';
import PropTypes from 'prop-types';

export const FAvatar = ({
  size, isEditable, imageUrl, setShowConfirmDeleteUserProfileImageModal, setShowErrorModal,
}) => {
  const dispatch = useDispatch();
  const {
    tryToAskForCameraRollPermissionsIfIsNotGranted,
    drawNoPermissionsModal,
    granted: status,
  } = useCameraRollPermission();

  const uploadImage = async () => {
    if (!status) tryToAskForCameraRollPermissionsIfIsNotGranted();
    try {
      await pickImageFromCameraRoll(async (result) => {
        // eslint-disable-next-line no-undef
        const formData = new FormData();
        // eslint-disable-next-line no-undef
        formData.append('file', {
          uri: Platform.OS === 'android' ? result.uri : result.uri.replace('file://', ''),
          name: 'profile-image.jpg',
          type: 'image/jpeg',
        });
        const res = await uploadUserProfileImageService(formData);
        dispatch(setMe(res));
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
            {drawNoPermissionsModal()}
            {imageUrl !== '' && (
              <FButton
                type={buttonTypes.ICON_BUTTON}
                icon={icons.TRASH}
                color={colors.WHITE}
                iconSize={sizes.ICON_20}
                backgroundColor={colors.PRIMARY}
                style={{
                  padding: sizes.PADDING_10,
                  borderRadius: getHalfBorderRadius(sizes.WIDTH_50),
                  ...styles.deleteButton,
                }}
                onPress={() => setShowConfirmDeleteUserProfileImageModal(true)}
              />
            )}
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
      containerStyle={{
        borderRadius: getHalfBorderRadius(size),
        ...styles.avatar,
      }}
      imageStyle={{
        ...styles.image,
        borderRadius: getHalfBorderRadius(size + sizes.BORDER_4),
      }}
      networkImageUrl={imageUrl || null}
      imagePath={images.USER_AVATAR()}
      resizeMode={sizes.COVER}
    />,
  );
};

const styles = StyleSheet.create({
  image: {
    overflow: 'hidden',
  },
  avatar: {
    elevation: sizes.ELEVATION_3,
    shadowOffset: {
      width: 0,
      height: sizes.HEIGHT_1,
    },
    shadowColor: colors.BLACK,
    shadowOpacity: opacities.SHADOW_OPACITY_022,
    shadowRadius: sizes.SHADOW_RADIUS_2_22,
    backgroundColor: colors.WHITE,
    borderWidth: sizes.BORDER_4,
    borderColor: colors.WHITE,
  },
  deleteButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    elevation: sizes.ELEVATION_5,
    shadowColor: colors.BLACK,
    shadowOffset: {
      width: 0,
      height: sizes.HEIGHT_1,
    },
    shadowOpacity: opacities.SHADOW_OPACITY_01,
    shadowRadius: sizes.SHADOW_RADIUS_1,
    zIndex: 1,
  },
});

FAvatar.propTypes = {
  size: PropTypes.number.isRequired,
  isEditable: PropTypes.bool.isRequired,
  imageUrl: PropTypes.string.isRequired,
  setShowConfirmDeleteUserProfileImageModal: PropTypes.func.isRequired,
  setShowErrorModal: PropTypes.func,
};
