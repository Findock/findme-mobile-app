import { useDrawerStatus } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import { FButton } from 'components/Buttons/FButton';
import buttonTypes from 'constants/components/buttonTypes';
import locales from 'constants/locales';
import stackNavigatorNames from 'constants/stackNavigatorNames';
import * as SecureStore from 'expo-secure-store';
import { FDefaultLayout } from 'layouts/FDefault.layout';
import { useEffect } from 'react';
import {
  StyleSheet, View, TouchableWithoutFeedback,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getCategoriesService } from 'services/announcement/getCategories.service';
import { getCoatColorsService } from 'services/announcement/getCoatColors.service';
import { logoutUserService } from 'services/user/logoutUser.service';
import { removeToken } from 'store/auth/authSlice';
import { setAnimalCategories, setAreOptionsLoading, setCoatColors } from 'store/filters-options/filtersOptionsSlice';
import colors from 'themes/colors';
import fonts from 'themes/fonts';
import placements from 'themes/placements';
import sizes from 'themes/sizes';

export const HomepageScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const areFiltersOptionsLoading = useSelector((state) => state.filtersOptions.areOptionsLoading);
  const drawerStatus = useDrawerStatus();

  const logout = async () => {
    await logoutUserService();
    await SecureStore.deleteItemAsync('Authorization');
    dispatch(removeToken());
    navigation.navigate(stackNavigatorNames.LOGIN, { showLogoutModal: true });
  };

  useEffect(() => {
    fetchAnimalCategories();
    fetchCoatColors();
  }, []);

  const fetchAnimalCategories = async () => {
    try {
      dispatch(setAreOptionsLoading(true));
      const res = await getCategoriesService();
      dispatch(setAnimalCategories(res.data));
      dispatch(setAreOptionsLoading(false));
    } catch (error) {
      dispatch(setAreOptionsLoading(false));
    }
  };

  const fetchCoatColors = async () => {
    try {
      dispatch(setAreOptionsLoading(true));
      const res = await getCoatColorsService();
      dispatch(setCoatColors(res.data));
      dispatch(setAreOptionsLoading(false));
    } catch (error) {
      dispatch(setAreOptionsLoading(false));
    }
  };

  return (
    <TouchableWithoutFeedback
      style={{ flex: 1 }}
      onPress={() => {
        if (drawerStatus === 'open') navigation.closeDrawer();
      }}
    >
      <FDefaultLayout>
        <View style={{ flex: 1 }}>
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
              title="Filtry"
              color={colors.WHITE}
              backgroundColor={colors.DARK_GRAY}
              type={buttonTypes.TEXT_BUTTON}
              titleSize={fonts.HEADING_NORMAL}
              titleWeight={fonts.HEADING_WEIGHT_MEDIUM}
              onPress={() => navigation.openDrawer()}
              buttonViewStyles={{ marginTop: sizes.MARGIN_20 }}
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
          </View>
        </View>
      </FDefaultLayout>
    </TouchableWithoutFeedback>
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
