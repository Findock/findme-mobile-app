import { FButton } from 'components/Buttons/FButton';
import { FHeading } from 'components/Composition/FHeading';
import buttonTypes from 'constants/buttonTypes';
import locales from 'constants/locales';
import {
  StyleSheet, View,
} from 'react-native';
import colors from 'themes/colors';
import fonts from 'themes/fonts';
import placements from 'themes/placements';
import sizes from 'themes/sizes';
import * as SecureStore from 'expo-secure-store';
import { useDispatch } from 'react-redux';
import { removeToken } from 'store/auth/authSlice';
import stackNavigatorNames from 'constants/stackNavigatorNames';
import { useEffect, useState } from 'react';
import { FModal } from 'components/Composition/FModal';
import modalTypes from 'constants/modalTypes';
import { useRoute } from '@react-navigation/native';
import * as Location from 'expo-location';
import { logoutUserService } from 'services/logoutUser.service';
import { FAvatar } from 'components/Composition/FAvatar';

export const HomepageScreen = ({ navigation }) => {
  const [
    deniedLocationPermissionModalVisible,
    setDeniedLocationPermissionModalVisible,
  ] = useState(false);
  const [
    image,
    setImage,
  ] = useState(null);
  const dispatch = useDispatch();
  const route = useRoute();

  useEffect(() => {
    Location.getForegroundPermissionsAsync().then(async (value) => {
      if (value.canAskAgain) {
        const { granted } = await Location.requestForegroundPermissionsAsync();
        setDeniedLocationPermissionModalVisible(!granted);
      } else {
        setDeniedLocationPermissionModalVisible(!value.granted);
      }
    });
  }, []);

  useEffect(() => {
    if (route.params?.showDeniedLocationPermissionModal) {
      setDeniedLocationPermissionModalVisible(true);
      navigation.setParams({ showDeniedLocationPermissionModal: false });
    }
  }, [route.params?.showDeniedLocationPermissionModal]);

  const logout = async () => {
    await logoutUserService();
    await SecureStore.deleteItemAsync('Authorization');
    dispatch(removeToken());
    navigation.navigate(stackNavigatorNames.LOGIN, { showLogoutModal: true });
  };

  return (
    <View style={styles.screen}>
      {deniedLocationPermissionModalVisible && (
        <FModal
          type={modalTypes.INFO_MODAL}
          title={locales.LOCATION_DENIED}
          visible={deniedLocationPermissionModalVisible}
          setVisible={setDeniedLocationPermissionModalVisible}
        />
      )}

      <FAvatar
        size={100}
        image={image}
        setImage={setImage}
        isEditable
      />

      <FHeading
        title="Witaj"
        align={placements.CENTER}
        color={colors.DARK_GREEN}
        size={fonts.HEADING_EXTRA_LARGE}
        weight={fonts.HEADING_WEIGHT_BOLD}
      />
      <View style={styles.buttonContainer}>
        <FButton
          title={locales.LOG_OUT}
          color={colors.WHITE}
          backgroundColor={colors.GREEN}
          type={buttonTypes.TEXT_BUTTON}
          titleSize={fonts.HEADING_NORMAL}
          titleWeight={fonts.HEADING_WEIGHT_MEDIUM}
          onPress={logout}
        />
        <FButton
          title="Historia logowania"
          color={colors.WHITE}
          backgroundColor={colors.DARK_GRAY}
          type={buttonTypes.TEXT_BUTTON}
          titleSize={fonts.HEADING_NORMAL}
          titleWeight={fonts.HEADING_WEIGHT_MEDIUM}
          onPress={() => navigation.navigate(stackNavigatorNames.LOGIN_HISTORY)}
          buttonViewStyles={{ marginTop: sizes.MARGIN_20 }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: placements.CENTER,
    alignItems: placements.CENTER,
  },
  buttonContainer: {
    marginTop: sizes.MARGIN_30,
  },
});
