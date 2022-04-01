import { FButton } from 'components/Buttons/FButton';
import buttonTypes from 'constants/buttonTypes';
import locales from 'constants/locales';
import React, { useEffect } from 'react';
import colors from 'themes/colors';
import fonts from 'themes/fonts';
import { View, StyleSheet, Platform } from 'react-native';
import { FSettingsRow } from 'components/Scoped/Settings/FSettingsRow';
import { FHeading } from 'components/Composition/FHeading';
import sizes from 'themes/sizes';
import placements from 'themes/placements';
import * as Linking from 'expo-linking';
import * as Location from 'expo-location';
import stackNavigatorNames from 'constants/stackNavigatorNames';

export const FSettingsScreen = ({ me, setIsForm }) => {
  const [status] = Location.useForegroundPermissions();

  useEffect(() => {
    const a = async () => {
      await Location.requestForegroundPermissionsAsync();
    };
    if (!status?.granted) {
      a();
    }
  }, [status]);

  const onLocationPermissionOn = async () => {
    await Linking.openSettings();
  };
  return (
    <>
      <View style={{ marginTop: Platform.OS === 'android' ? 0 : sizes.MARGIN_30 }}>
        <FHeading
          title={locales.GENERAL_SETTINGS}
          color={colors.PRIMARY}
          size={fonts.HEADING_LARGE}
          weight={fonts.HEADING_WEIGHT_SEMIBOLD}
          align={placements.LEFT}
        />
        <FSettingsRow
          isForm={false}
          withSwitch
          label={locales.LOCALIZATION_SERVICE}
          value={status?.granted ? locales.TURN_ON : locales.TURN_OFF}
          style={styles.headerSpace}
          isDisabled={status?.granted}
          disabledColor={colors.SUCCESS}
          onSwitchValueChange={onLocationPermissionOn}
          switchValue={status?.granted}
        />
        <View style={styles.buttonContainer}>
          <FButton
            title={locales.CHANGE_PASSWORD}
            titleWeight={fonts.HEADING_WEIGHT_BOLD}
            titleSize={fonts.HEADING_NORMAL}
            type={buttonTypes.LINK_BUTTON}
            to={stackNavigatorNames.PASSWORD_CHANGE}
            isUnderline
          />
        </View>
      </View>
      <View style={{ marginTop: sizes.MARGIN_50 }}>
        <FHeading
          title={locales.ACCOUNT_SETTINGS}
          color={colors.PRIMARY}
          size={fonts.HEADING_LARGE}
          weight={fonts.HEADING_WEIGHT_SEMIBOLD}
          align={placements.LEFT}
        />
        <FSettingsRow
          isForm={false}
          withSwitch={false}
          label={locales.NAME}
          value={me.name}
          style={styles.headerSpace}
        />
        <FSettingsRow
          isForm={false}
          withSwitch={false}
          label={locales.PHONE}
          value={me.phoneNumber}
          style={styles.settingRowSpace}
        />
        <FSettingsRow
          isForm={false}
          withSwitch={false}
          label={locales.STREET}
          value={!me.street ? locales.NO_INFORMATION : me.street}
          style={styles.settingRowSpace}
        />
        <FSettingsRow
          isForm={false}
          withSwitch={false}
          label={locales.CITY}
          value={!me.city ? locales.NO_INFORMATION : me.city}
          style={styles.settingRowSpace}
        />
        <FSettingsRow
          isForm={false}
          withSwitch={false}
          label={locales.BIO}
          value={!me.bio ? locales.NONE : me.bio}
          style={styles.settingRowSpace}
        />
      </View>
      <View style={styles.buttonContainer}>
        <FButton
          title={locales.EDIT}
          type={buttonTypes.OUTLINE_TEXT_BUTTON}
          color={colors.PRIMARY}
          titleWeight={fonts.HEADING_WEIGHT_BOLD}
          titleSize={fonts.HEADING_MEDIUM}
          onPress={() => setIsForm(true)}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  headerSpace: {
    marginTop: sizes.MARGIN_25,
  },
  settingRowSpace: {
    marginTop: sizes.MARGIN_20,
  },
  buttonContainer: {
    marginTop: sizes.MARGIN_30,
    alignItems: 'flex-start',
    width: sizes.WIDTH_FULL,
  },
});
