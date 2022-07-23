import { StyleSheet, View } from 'react-native';
import { FInput } from 'components/Inputs/FInput';
import inputTypes from 'constants/components/inputs/inputTypes';
import sizes from 'themes/sizes';
import colors from 'themes/colors';
import { FButton } from 'components/Buttons/FButton';
import buttonTypes from 'constants/components/buttonTypes';
import icons from 'themes/icons';
import React, { useEffect, useState } from 'react';
import defaultBoxShadow from 'styles/defaultBoxShadow';
import { useErrorModal } from 'hooks/modals/useErrorModal';
import { sendChatMessageService } from 'services/chat/sendChatMessage.service';
import { useLocationPermission } from 'hooks/permissions/useLocationPermission';
import modalsMessages from 'constants/components/modals/modalsMessages';
import * as Location from 'expo-location';
import PropTypes from 'prop-types';
import { useConfirmationModal } from 'hooks/modals/useConfirmationModal';
import { pickImageFromCameraRoll } from 'utils/pickImageFromCameraRoll';
import { appendFileToFormData } from 'utils/appendFileToFormData';
import { takePhotoWithCamera } from 'utils/takePhotoWithCamera';
import { useCameraRollPermission } from 'hooks/permissions/useCameraRollPermission';
import { useCameraPermission } from 'hooks/permissions/useCameraPermission';
import { useNavigation } from '@react-navigation/native';
import { uploadChatPhotoService } from 'services/chat/uploadChatPhoto.service';
import stackNavigatorNames from 'constants/stackNavigatorNames';

export const FChatNewMessage = ({
  receiver,
  fetchUserMessages,
  messagesListRef,
  setCanScrollToBottom,
  setIsNewMessage,
}) => {
  const navigation = useNavigation();
  const [
    message,
    setMessage,
  ] = useState('');
  const [
    photo,
    setPhoto,
  ] = useState(null);
  const [
    isSendMessageButtonDisabled,
    setIsSendMessageButtonDisabled,
  ] = useState(true);
  const {
    drawErrorModal,
    setShowErrorModal,
  } = useErrorModal();
  const {
    tryToAskForLocationPermissionsIfIsNotGranted,
    granted: locationStatus,
    drawNoPermissionsModal: drawNoLocationPermissionModal,
  } = useLocationPermission();
  const {
    tryToAskForCameraRollPermissionsIfIsNotGranted,
    drawNoPermissionsModal,
    granted: status,
  } = useCameraRollPermission();
  const {
    tryToAskForCameraPermissionsIfIsNotGranted,
    drawNoPermissionsModal: drawNoCameraPermissionsModal,
    granted: cameraStatus,
  } = useCameraPermission();

  useEffect(() => {
    if (!message) {
      setIsSendMessageButtonDisabled(true);
    } else {
      setIsSendMessageButtonDisabled(false);
    }
  }, [message]);

  useEffect(() => {
    if (photo) {
      navigation.navigate(stackNavigatorNames.MESSAGES_TAB, {
        screen: stackNavigatorNames.CHAT_SELECTED_PHOTO_MODAL,
        params: {
          photo,
          sendPhotoHandler,
        },
      });
    }
  }, [photo]);

  const newMessageHandler = (newMessage) => {
    setMessage(newMessage);
  };

  const resetMessageData = () => {
    setMessage('');
    setPhoto(null);
    setIsSendMessageButtonDisabled(true);
  };

  const sendNewMessageHandler = async () => {
    try {
      await sendChatMessageService(receiver.id, { message });
      resetMessageData();
      fetchUserMessages();
    } catch (error) {
      setShowErrorModal(true);
    }
  };

  const sendPhotoHandler = async () => {
    try {
      await sendChatMessageService(receiver.id, {
        message: '',
        photosIds: [photo.id],
      });
      resetMessageData();
      fetchUserMessages();
    } catch (error) {
      setShowErrorModal(true);
    }
  };

  const shareCurrentLocation = async () => {
    if (!locationStatus) tryToAskForLocationPermissionsIfIsNotGranted();
    if (locationStatus) {
      try {
        const position = await Location.getCurrentPositionAsync();
        await sendChatMessageService(receiver.id, {
          locationLat: position.coords.latitude,
          locationLon: position.coords.longitude,
          message: '',
        });
      } catch (error) {
        setShowErrorModal(true);
      }
    }
  };

  const uploadPhoto = async (source) => {
    if (source === 'camera-roll') {
      if (!status) tryToAskForCameraRollPermissionsIfIsNotGranted();
    } else if (source === 'camera') {
      if (!cameraStatus) tryToAskForCameraPermissionsIfIsNotGranted();
    }
    try {
      if (source === 'camera-roll') {
        if (status) {
          await pickImageFromCameraRoll(async (result) => {
            const formData = appendFileToFormData(result, 'chat-image.jpg');
            const res = await uploadChatPhotoService(formData);
            setPhoto({
              id: res.id,
              url: res.url,
            });
          }, {
            allowsEditing: true,
          });
        }
      } else if (source === 'camera') {
        if (cameraStatus && status) {
          await takePhotoWithCamera(async (result) => {
            const formData = appendFileToFormData(result, 'chat-image.jpg');
            const res = await uploadChatPhotoService(formData);
            setPhoto({
              id: res.id,
              url: res.url,
            });
          }, {
            allowsEditing: true,
          });
        }
      }
    } catch (error) {
      setShowErrorModal(true);
    }
  };

  const {
    setShowConfirmationModal,
    drawConfirmationModal,
  } = useConfirmationModal(modalsMessages.SHARE_CURRENT_LOCATION_CONFIRMATION, shareCurrentLocation);

  return (
    <>
      {drawNoLocationPermissionModal()}
      {drawNoPermissionsModal()}
      {drawNoCameraPermissionsModal()}
      {drawConfirmationModal()}
      {drawErrorModal()}
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <FInput
            width={sizes.WIDTH_FULL}
            type={inputTypes.TEXTAREA}
            transparent
            onChangeText={newMessageHandler}
            value={message}
            onPress={() => {
              setCanScrollToBottom(false);
              setIsNewMessage(false);
              messagesListRef.current.scrollToOffset({
                y: 0,
                animated: true,
              });
            }}
          />
          <View style={styles.buttonsContainer}>
            <View style={{ flexDirection: 'row' }}>
              <FButton
                type={buttonTypes.ICON_BUTTON}
                iconSize={sizes.ICON_30}
                icon={icons.ATTACH_OUTLINE}
                color={colors.PRIMARY}
                buttonViewStyles={{
                  padding: 0,
                  marginRight: sizes.MARGIN_12,
                }}
                onPress={() => uploadPhoto('camera-roll')}
              />
              <FButton
                type={buttonTypes.ICON_BUTTON}
                iconSize={sizes.ICON_30}
                icon={icons.CAMERA_OUTLINE}
                color={colors.PRIMARY}
                buttonViewStyles={{
                  padding: 0,
                  marginRight: sizes.MARGIN_12,
                }}
                onPress={() => uploadPhoto('camera')}
              />
              <FButton
                type={buttonTypes.ICON_BUTTON}
                iconSize={sizes.ICON_27}
                icon={icons.LOCATION_OUTLINE}
                color={colors.PRIMARY}
                buttonViewStyles={{ padding: 0 }}
                onPress={() => setShowConfirmationModal(true)}
              />
            </View>
            <FButton
              type={buttonTypes.ICON_BUTTON}
              iconSize={sizes.ICON_35}
              icon={icons.SEND_OUTLINE}
              color={colors.PRIMARY}
              buttonViewStyles={{ padding: 0 }}
              isDisabled={isSendMessageButtonDisabled}
              onPress={sendNewMessageHandler}
            />
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: sizes.WIDTH_FULL,
    paddingVertical: sizes.PADDING_20,
    paddingHorizontal: sizes.PADDING_15,
  },
  innerContainer: {
    backgroundColor: colors.WHITE,
    ...defaultBoxShadow,
    borderRadius: sizes.RADIUS_10,
    paddingVertical: sizes.PADDING_10,
  },
  buttonsContainer: {
    width: sizes.WIDTH_FULL,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: sizes.PADDING_20,
  },
  rowContainer: {
    width: sizes.WIDTH_FULL,
    flexDirection: 'row',
    paddingHorizontal: sizes.PADDING_20,
  },
});

FChatNewMessage.propTypes = {
  receiver: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    profileImageUrl: PropTypes.string,
    lastLogin: PropTypes.string,
  }).isRequired,
  fetchUserMessages: PropTypes.func.isRequired,
  setCanScrollToBottom: PropTypes.func.isRequired,
  setIsNewMessage: PropTypes.func.isRequired,
};
