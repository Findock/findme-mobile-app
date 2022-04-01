import { useAppStateChange } from 'hooks/useAppStateChange';
import { useEffect, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import modalTypes from 'constants/modalTypes';
import locales from 'constants/locales';
import { FModal } from 'components/Composition/FModal';
import * as Linking from 'expo-linking';

export const useCameraRollPermission = () => {
  const { currentAppState } = useAppStateChange();
  const [
    permissionsStatus,
    setPermissionsStatus,
  ] = useState(null);
  const [
    deniedCameraRollPermissionModalVisible,
    setDeniedCameraRollPermissionModalVisible,
  ] = useState(false);

  useEffect(() => {
    const readPermissions = async () => {
      const permission = await ImagePicker.getMediaLibraryPermissionsAsync();
      setPermissionsStatus(permission);
    };
    readPermissions();
  }, [currentAppState]);

  const handleChangeCameraRollPermission = () => {
    if (permissionsStatus?.canAskAgain && !permissionsStatus?.granted) {
      ImagePicker.requestMediaLibraryPermissionsAsync();
    } else {
      Linking.openSettings();
    }
  };

  const tryToAskForCameraRollPermissionsIfIsNotGranted = () => {
    if (!permissionsStatus?.granted) {
      if (permissionsStatus?.canAskAgain) {
        ImagePicker.requestMediaLibraryPermissionsAsync();
      } else {
        setDeniedCameraRollPermissionModalVisible(true);
      }
    }
  };

  const drawNoPermissionsModal = () => (
    deniedCameraRollPermissionModalVisible && (
      <FModal
        type={modalTypes.INFO_MODAL}
        title={locales.CAMERA_ROLL_DENIED}
        visible={deniedCameraRollPermissionModalVisible}
        setVisible={setDeniedCameraRollPermissionModalVisible}
      />
    )
  );

  return {
    handleChangeCameraRollPermission,
    tryToAskForCameraRollPermissionsIfIsNotGranted,
    drawNoPermissionsModal,
    granted: permissionsStatus?.granted,
  };
};
