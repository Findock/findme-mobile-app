import { useAppStateChange } from 'hooks/useAppStateChange';
import { useEffect, useState } from 'react';
import { Camera } from 'expo-camera';
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
      const permission = await Camera.getCameraPermissionsAsync();
      setPermissionsStatus(permission);
    };
    readPermissions();
  }, [currentAppState]);

  const handleChangeCameraPermission = () => {
    if (permissionsStatus?.canAskAgain && !permissionsStatus?.granted) {
      Camera.requestCameraPermissionsAsync();
    } else {
      Linking.openSettings();
    }
  };

  const tryToAskForCameraPermissionsIfIsNotGranted = () => {
    if (!permissionsStatus?.granted) {
      if (permissionsStatus?.canAskAgain) {
        Camera.requestCameraPermissionsAsync();
      } else {
        setDeniedLocationPermissionModalVisible(true);
      }
    }
  };

  const drawNoPermissionsModal = () => (
    deniedLocationPermissionModalVisible && (
      <FModal
        type={modalTypes.INFO_MODAL}
        title={locales.LOCATION_DENIED}
        visible={deniedLocationPermissionModalVisible}
        setVisible={setDeniedLocationPermissionModalVisible}
      />
    )
  );
};
