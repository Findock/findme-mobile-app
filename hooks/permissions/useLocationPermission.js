import { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import * as Linking from 'expo-linking';
import { FModal } from 'components/Composition/FModal';
import modalTypes from 'constants/components/modals/modalTypes';
import { useAppStateChange } from 'hooks/useAppStateChange';
import modalsMessages from 'constants/components/modals/modalsMessages';

export const useLocationPermission = () => {
  const { currentAppState } = useAppStateChange();
  const [
    permissionsStatus,
    setPermissionsStatus,
  ] = useState(null);
  const [
    deniedLocationPermissionModalVisible,
    setDeniedLocationPermissionModalVisible,
  ] = useState(false);

  useEffect(() => {
    const readPermissions = async () => {
      const permission = await Location.getForegroundPermissionsAsync();
      setPermissionsStatus(permission);
    };
    readPermissions();
  }, [currentAppState]);

  const handleChangeLocationPermission = () => {
    if (permissionsStatus?.canAskAgain && !permissionsStatus?.granted) {
      Location.requestForegroundPermissionsAsync();
    } else {
      Linking.openSettings();
    }
  };

  const tryToAskForLocationPermissionsIfIsNotGranted = () => {
    if (!permissionsStatus?.granted) {
      if (permissionsStatus?.canAskAgain) {
        Location.requestForegroundPermissionsAsync();
      } else {
        setDeniedLocationPermissionModalVisible(true);
      }
    }
  };

  const drawNoPermissionsModal = () => (
    deniedLocationPermissionModalVisible && (
      <FModal
        type={modalTypes.INFO_MODAL}
        title={modalsMessages.LOCATION_DENIED}
        visible={deniedLocationPermissionModalVisible}
        setVisible={setDeniedLocationPermissionModalVisible}
      />
    )
  );

  return {
    handleChangeLocationPermission,
    tryToAskForLocationPermissionsIfIsNotGranted,
    drawNoPermissionsModal,
    granted: permissionsStatus?.granted,
  };
};
