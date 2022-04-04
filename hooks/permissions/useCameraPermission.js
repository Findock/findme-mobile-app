import { useAppStateChange } from 'hooks/useAppStateChange';
import { useEffect, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import modalTypes from 'constants/modalTypes';
import locales from 'constants/locales';
import { FModal } from 'components/Composition/FModal';
import * as Linking from 'expo-linking';

export const useCameraPermission = () => {
  const { currentAppState } = useAppStateChange();
  const [
    permissionsStatus,
    setPermissionsStatus,
  ] = useState(null);
  const [
    deniedCameraPermissionModalVisible,
    setDeniedCameraPermissionModalVisible,
  ] = useState(false);

  useEffect(() => {
    const readPermissions = async () => {
      const permission = await ImagePicker.getCameraPermissionsAsync();
      setPermissionsStatus(permission);
    };
    readPermissions();
  }, [currentAppState]);

  const handleChangeCameraPermission = () => {
    if (permissionsStatus?.canAskAgain && !permissionsStatus?.granted) {
      ImagePicker.requestCameraPermissionsAsync();
    } else {
      Linking.openSettings();
    }
  };

  const tryToAskForCameraPermissionsIfIsNotGranted = () => {
    if (!permissionsStatus?.granted) {
      if (permissionsStatus?.canAskAgain) {
        ImagePicker.requestCameraPermissionsAsync();
      } else {
        setDeniedCameraPermissionModalVisible(true);
      }
    }
  };

  const drawNoPermissionsModal = () => deniedCameraPermissionModalVisible && (
    <FModal
      type={modalTypes.INFO_MODAL}
      title={locales.CAMERA_DENIED}
      visible={deniedCameraPermissionModalVisible}
      setVisible={setDeniedCameraPermissionModalVisible}
    />
  );

  return {
    handleChangeCameraPermission,
    tryToAskForCameraPermissionsIfIsNotGranted,
    drawNoPermissionsModal,
    granted: permissionsStatus?.granted,
  };
};
