import { FButton } from 'components/Buttons/FButton';
import { FHeading } from 'components/Composition/FHeading';
import buttonTypes from 'constants/buttonTypes';
import locales from 'constants/locales';
import { StyleSheet, View } from 'react-native';
import colors from 'themes/colors';
import fonts from 'themes/fonts';
import placements from 'themes/placements';
import sizes from 'themes/sizes';
import * as SecureStore from 'expo-secure-store';
import { useDispatch } from 'react-redux';
import { removeToken } from 'store/auth/authSlice';
import stackNavigatorNames from 'constants/stackNavigatorNames';

export const HomepageScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const logout = async () => {
    await SecureStore.deleteItemAsync('Authorization');
    dispatch(removeToken());
    navigation.navigate(stackNavigatorNames.LOGIN, { showLogoutModal: true });
  };

  return (
    <View style={styles.screen}>
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
