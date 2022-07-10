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

export const FChatNewMessage = ({
  receiver,
  fetchUserMessages,
}) => {
  const [
    message,
    setMessage,
  ] = useState('');
  const [
    isSendMessageButtonDisabled,
    setIsSendMessageButtonDisabled,
  ] = useState(true);
  const [
    isAddPhotoButtonDisabled,
    setIsAddPhotoButtonDisabled,
  ] = useState(false);
  const {
    drawErrorModal,
    setShowErrorModal,
  } = useErrorModal();
  const {
    tryToAskForLocationPermissionsIfIsNotGranted,
    granted: locationStatus,
    drawNoPermissionsModal: drawNoLocationPermissionModal,
  } = useLocationPermission();

  useEffect(() => {
    if (!message) {
      setIsSendMessageButtonDisabled(true);
    } else {
      setIsSendMessageButtonDisabled(false);
    }
  }, [message]);

  const newMessageHandler = (newMessage) => {
    setMessage(newMessage);
  };

  const resetMessageData = () => {
    setMessage('');
    setIsSendMessageButtonDisabled(true);
  };

  const sendNewMessageHandler = async () => {
    try {
      const newMessageData = {
        message,
      };
      await sendChatMessageService(receiver.id, newMessageData);
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

  const {
    setShowConfirmationModal,
    drawConfirmationModal,
  } = useConfirmationModal(modalsMessages.SHARE_CURRENT_LOCATION_CONFIRMATION, shareCurrentLocation);

  return (
    <>
      {drawNoLocationPermissionModal()}
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
                // isDisabled={isAddPhotoButtonDisabled}
                // onPress={() => uploadPhoto('camera-roll')}
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
                isDisabled={isAddPhotoButtonDisabled}
                // onPress={() => uploadPhoto('camera')}
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
};
