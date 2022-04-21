import { FButton } from 'components/Buttons/FButton';
import { FImage } from 'components/Composition/FImage';
import images from 'constants/images';
import React, {
  useEffect,
  useState,
} from 'react';
import sizes from 'themes/sizes';
import {
  StyleSheet, TouchableWithoutFeedback, View,
} from 'react-native';
import placements from 'themes/placements';
import colors from 'themes/colors';
import opacities from 'themes/opacities';
import buttonTypes from 'constants/components/buttonTypes';
import icons from 'themes/icons';
import { FModal } from 'components/Composition/FModal';
import modalTypes from 'constants/components/modalTypes';
import locales from 'constants/locales';
import { useCameraPermission } from 'hooks/permissions/useCameraPermission';
import { useCameraRollPermission } from 'hooks/permissions/useCameraRollPermission';
import { pickImageFromCameraRoll } from 'utils/pickImageFromCameraRoll';
import { takePhotoWithCamera } from 'utils/takePhotoWithCamera';
import PropTypes from 'prop-types';

export const FTileImageInput = ({
  width, height, uploadImage, uploadedImage, index, onRemoveImage,
}) => {
  const [
    image,
    setImage,
  ] = useState(null);
  const [
    showMakeChoiceModal,
    setShowMakeChoiceModal,
  ] = useState(false);

  useEffect(() => {
    if (image) {
      uploadImage(image, index);
    }
  }, [image]);

  const onIconButtonPressHandler = () => {
    if (uploadedImage || image) {
      setImage(null);
      if (onRemoveImage)onRemoveImage();
    } else setShowMakeChoiceModal(true);
  };

  const onPressHandler = () => {
    if (!image) setShowMakeChoiceModal(true);
  };

  const {
    tryToAskForCameraPermissionsIfIsNotGranted,
    drawNoPermissionsModal: drawNoCameraPermissionsModal,
    granted: cameraStatus,
  } = useCameraPermission();
  const {
    tryToAskForCameraRollPermissionsIfIsNotGranted,
    drawNoPermissionsModal: drawNoCameraRollPermissionsModal,
    granted: cameraRollStatus,
  } = useCameraRollPermission();

  const onMakeFirstChoiceHandler = async () => {
    if (!cameraRollStatus || !cameraStatus) {
      setShowMakeChoiceModal(false);
      if (!cameraRollStatus) {
        setTimeout(async () => {
          tryToAskForCameraRollPermissionsIfIsNotGranted();
        }, 500);
      }
      if (!cameraStatus) {
        setTimeout(async () => {
          tryToAskForCameraPermissionsIfIsNotGranted();
        }, 500);
      }
    }
    if (cameraStatus && cameraRollStatus) {
      await takePhotoWithCamera(setImage, {});
      setShowMakeChoiceModal(false);
    }
  };

  const onMakeSecondChoiceHandler = async () => {
    if (!cameraRollStatus) {
      setShowMakeChoiceModal(false);
      setTimeout(async () => {
        tryToAskForCameraRollPermissionsIfIsNotGranted();
      }, 500);
    }
    if (cameraRollStatus) {
      await pickImageFromCameraRoll(setImage, {
        allowsEditing: true,
      });
      setShowMakeChoiceModal(false);
    }
  };

  const drawTileImageInputContent = () => (
    <FImage
      width={width}
      height={height}
      imagePath={images.DOG()}
      networkImageUrl={uploadedImage || (image?.uri || '')}
      resizeMode={sizes.COVER}
      imageHeight={(image || uploadedImage) ? sizes.HEIGHT_FULL : sizes.HEIGHT_45}
      imageWidth={(image || uploadedImage) ? sizes.WIDTH_FULL : sizes.WIDTH_45}
      containerStyle={{
        backgroundColor: !(image || uploadedImage) ? colors.LIGHT_GRAY : colors.TRANSPARENT,
        ...styles.tileImageInputContainer,
        ...styles.centerView,
      }}
      imageStyle={{ borderRadius: sizes.RADIUS_10 }}
    >
      <View style={{
        ...styles.buttonContainer,
        top: (image || uploadedImage) ? sizes.POSITION_6 : sizes.POSITION_N28,
        right: (image || uploadedImage) ? sizes.POSITION_6 : sizes.POSITION_N28,
      }}
      >
        <FButton
          type={buttonTypes.ICON_BUTTON}
          icon={!(image || uploadedImage) ? icons.ADD_OUTLINE : icons.TRASH}
          iconSize={sizes.ICON_30}
          color={colors.WHITE}
          backgroundColor={colors.DARK_GRAY}
          style={{
            borderRadius: sizes.RADIUS_20,
            padding: sizes.PADDING_3,
            ...styles.centerView,
          }}
          onPress={onIconButtonPressHandler}
        />
      </View>
    </FImage>
  );

  return (
    <>
      <TouchableWithoutFeedback onPress={onPressHandler}>
        <View>
          {drawTileImageInputContent()}
        </View>
      </TouchableWithoutFeedback>
      {drawNoCameraPermissionsModal()}
      {drawNoCameraRollPermissionsModal()}
      {showMakeChoiceModal && (
        <FModal
          type={modalTypes.MAKE_CHOICE_MODAL}
          setVisible={() => {}}
          visible={showMakeChoiceModal}
          title={locales.WHAT_DO_YOU_WANT_TO_USE}
          firstChoice={locales.CAMERA}
          secondChoice={locales.CAMERA_ROLL}
          onFirstChoice={onMakeFirstChoiceHandler}
          onSecondChoice={onMakeSecondChoiceHandler}
          onClose={() => setShowMakeChoiceModal(false)}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  tileImageInputContainer: {
    borderRadius: sizes.RADIUS_10,
    overflow: 'hidden',
    elevation: sizes.ELEVATION_2,
    shadowOffset: {
      width: 0,
      height: sizes.HEIGHT_1,
    },
    shadowOpacity: opacities.SHADOW_OPACITY_018,
    shadowRadius: sizes.SHADOW_RADIUS_1,
    shadowColor: colors.BLACK,
  },
  centerView: {
    alignItems: placements.CENTER,
    justifyContent: placements.CENTER,
  },
  buttonContainer: {
    position: 'absolute',
    zIndex: 3,
  },
});

FTileImageInput.propTypes = {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  uploadImage: PropTypes.func.isRequired,
  uploadedImage: PropTypes.string.isRequired,
  onRemoveImage: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
};
