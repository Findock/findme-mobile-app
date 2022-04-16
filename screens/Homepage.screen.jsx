import { useNavigation } from '@react-navigation/native';
import { FButton } from 'components/Buttons/FButton';
import buttonTypes from 'constants/components/buttonTypes';
import locales from 'constants/locales';
import stackNavigatorNames from 'constants/stackNavigatorNames';
import * as SecureStore from 'expo-secure-store';
import { FDefaultLayout } from 'layouts/FDefault.layout';
import {
  StyleSheet, View,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { logoutUserService } from 'services/user/logoutUser.service';
import { removeToken } from 'store/auth/authSlice';
import colors from 'themes/colors';
import fonts from 'themes/fonts';
import placements from 'themes/placements';
import sizes from 'themes/sizes';

export const HomepageScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const logout = async () => {
    await logoutUserService();
    await SecureStore.deleteItemAsync('Authorization');
    dispatch(removeToken());
    navigation.navigate(stackNavigatorNames.LOGIN, { showLogoutModal: true });
  };

  return (
    <FDefaultLayout>
      <View>
        <View style={styles.buttonContainer}>
          <FButton
            title={locales.LOG_OUT}
            color={colors.WHITE}
            backgroundColor={colors.PRIMARY}
            type={buttonTypes.TEXT_BUTTON}
            titleSize={fonts.HEADING_NORMAL}
            titleWeight={fonts.HEADING_WEIGHT_MEDIUM}
            onPress={logout}
          />
          <FButton
            title="Profil użytkownika"
            color={colors.WHITE}
            backgroundColor={colors.DARK_GRAY}
            type={buttonTypes.TEXT_BUTTON}
            titleSize={fonts.HEADING_NORMAL}
            titleWeight={fonts.HEADING_WEIGHT_MEDIUM}
            onPress={() => navigation.navigate(stackNavigatorNames.USER_PROFILE)}
            buttonViewStyles={{ marginTop: sizes.MARGIN_20 }}
          />
          <FButton
            title="Inny użytkownik"
            color={colors.WHITE}
            backgroundColor={colors.PRIMARY}
            type={buttonTypes.TEXT_BUTTON}
            titleSize={fonts.HEADING_NORMAL}
            titleWeight={fonts.HEADING_WEIGHT_MEDIUM}
            onPress={() => navigation.navigate(stackNavigatorNames.USER_PROFILE_PREVIEW)}
            buttonViewStyles={{ marginTop: sizes.MARGIN_20 }}
          />
          <FButton
            title="Dodaj ogłoszenie"
            color={colors.WHITE}
            backgroundColor={colors.DARK_GRAY}
            type={buttonTypes.TEXT_BUTTON}
            titleSize={fonts.HEADING_NORMAL}
            titleWeight={fonts.HEADING_WEIGHT_MEDIUM}
            onPress={() => navigation.navigate(stackNavigatorNames.ADD_ANNOUNCEMENT)}
            buttonViewStyles={{ marginTop: sizes.MARGIN_20 }}
          />
          <FButton
            title="Karta ogłoszenia"
            color={colors.WHITE}
            backgroundColor={colors.DARK_GRAY}
            type={buttonTypes.TEXT_BUTTON}
            titleSize={fonts.HEADING_NORMAL}
            titleWeight={fonts.HEADING_WEIGHT_MEDIUM}
            onPress={() => navigation.navigate(stackNavigatorNames.ANNOUNCEMENT_CARD_PREVIEW)}
            buttonViewStyles={{ marginTop: sizes.MARGIN_20 }}
          />
        </View>
      </View>
    </FDefaultLayout>
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
