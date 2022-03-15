import { FButton } from 'components/Buttons/FButton';
import buttonTypes from 'constants/buttonTypes';
import locales from 'constants/locales';
import React, { useState } from 'react';
import colors from 'themes/colors';
import fonts from 'themes/fonts';
import {
  View, StyleSheet, ScrollView, Platform,
} from 'react-native';
import { FSettingsRow } from 'components/Scoped/Settings/FSettingsRow';
import { FHeading } from 'components/Composition/FHeading';
import sizes from 'themes/sizes';
import placements from 'themes/placements';
import { FKeyboardWrapper } from 'components/Utils/FKeyboardWrapper';

export const FSettingsFormScreen = ({ me, status, setIsForm }) => {
  const [
    dataForm,
    setDataForm,
  ] = useState({
    name: me.name,
    phoneNumber: me.phoneNumber,
    street: me.street,
    city: me.city,
    bio: me.bio,
  });

  const nameInputhandler = (newName) => {
    setDataForm({
      ...dataForm,
      name: newName,
    });
  };
  const streetInputhandler = (newStreet) => {
    setDataForm({
      ...dataForm,
      street: newStreet,
    });
  };
  const phoneInputhandler = (newPhone) => {
    setDataForm({
      ...dataForm,
      phoneNumber: newPhone,
    });
  };
  const cityInputhandler = (newCity) => {
    setDataForm({
      ...dataForm,
      city: newCity,
    });
  };
  const bioInputhandler = (newBio) => {
    setDataForm({
      ...dataForm,
      bio: newBio,
    });
  };

  return (
    <FKeyboardWrapper>
      <>
        <View style={{ marginTop: Platform.OS === 'android' ? 0 : sizes.MARGIN_40 }}>
          <FHeading
            title={locales.GENERAL_SETTINGS}
            color={colors.GREEN}
            size={fonts.HEADING_LARGE}
            weight={fonts.HEADING_WEIGHT_SEMIBOLD}
            align={placements.LEFT}
          />
          <FSettingsRow
            isForm
            withSwitch
            label={locales.LOCALIZATION_SERVICE}
            value={status?.status === 'granted' ? locales.TURN_ON : locales.TURN_OFF}
            style={styles.headerSpace}
          />
        </View>
        <View style={{ marginTop: sizes.MARGIN_50 }}>
          <FHeading
            title={locales.ACCOUNT_SETTINGS}
            color={colors.GREEN}
            size={fonts.HEADING_LARGE}
            weight={fonts.HEADING_WEIGHT_SEMIBOLD}
            align={placements.LEFT}
          />
          <FSettingsRow
            isForm
            withSwitch={false}
            label={locales.NAME}
            value={dataForm.name}
            style={styles.headerSpace}
            onChangeText={nameInputhandler}
          />
          <FSettingsRow
            isForm
            withSwitch={false}
            label={locales.PHONE}
            value={dataForm.phoneNumber}
            style={styles.settingRowSpace}
            onChangeText={phoneInputhandler}
            isPhoneInput
          />
          <FSettingsRow
            isForm
            withSwitch={false}
            label={locales.STREET}
            value={dataForm.street}
            style={styles.settingRowSpace}
            onChangeText={streetInputhandler}
          />
          <FSettingsRow
            isForm
            withSwitch={false}
            label={locales.CITY}
            value={dataForm.city}
            style={styles.settingRowSpace}
            onChangeText={cityInputhandler}
          />
          <FSettingsRow
            isForm
            withSwitch={false}
            label={locales.BIO}
            value={dataForm.bio}
            style={styles.settingRowSpace}
            onChangeText={bioInputhandler}
            maxLength={256}
            isTextarea
            numberOfLines={3}

          />
        </View>
        <View style={styles.buttonsContainer}>
          <FButton
            title={locales.CANCEL}
            type={buttonTypes.OUTLINE_TEXT_BUTTON}
            color={colors.GREEN}
            titleWeight={fonts.HEADING_WEIGHT_BOLD}
            titleSize={fonts.HEADING_MEDIUM}
            onPress={() => setIsForm(false)}
          />
          <FButton
            title={locales.SAVE}
            type={buttonTypes.TEXT_BUTTON}
            color={colors.WHITE}
            backgroundColor={colors.GREEN}
            titleWeight={fonts.HEADING_WEIGHT_BOLD}
            titleSize={fonts.HEADING_MEDIUM}
            onPress={() => setIsForm(false)}
          />
        </View>
      </>
    </FKeyboardWrapper>
  );
};

const styles = StyleSheet.create({
  headerSpace: {
    marginTop: sizes.MARGIN_25,
  },
  settingRowSpace: {
    marginTop: sizes.MARGIN_20,
  },
  buttonsContainer: {
    marginTop: sizes.MARGIN_40,
    width: sizes.WIDTH_FULL,
    justifyContent: 'space-between',
    alignItems: placements.CENTER,
    flexDirection: 'row',
  },
});
