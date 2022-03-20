import { FButton } from 'components/Buttons/FButton';
import buttonTypes from 'constants/buttonTypes';
import locales from 'constants/locales';
import React, { useEffect, useState } from 'react';
import colors from 'themes/colors';
import fonts from 'themes/fonts';
import {
  View, StyleSheet, Platform,
} from 'react-native';
import { FSettingsRow } from 'components/Scoped/Settings/FSettingsRow';
import { FHeading } from 'components/Composition/FHeading';
import sizes from 'themes/sizes';
import placements from 'themes/placements';
import { FKeyboardWrapper } from 'components/Utils/FKeyboardWrapper';
import { updateUserService } from 'services/updateUser.service';
import errorMessages from 'constants/errorMessages';
import { filterErrorMessages } from 'utils/filterErrorMessages';
import { FSpinner } from 'components/Composition/FSpinner';
import { useDispatch } from 'react-redux';
import { getMeService } from 'services/getMe.service';
import { setMe } from 'store/me/meSlice';
import * as Linking from 'expo-linking';
import * as Location from 'expo-location';

export const FSettingsFormScreen = ({ me, setIsForm, status }) => {
  const dispatch = useDispatch();
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
  const [
    loading,
    setLoading,
  ] = useState(false);
  const [
    errors,
    setErrors,
  ] = useState([]);

  useEffect(() => {
    const a = async () => {
      await Location.requestForegroundPermissionsAsync();
    };
    if (!status?.granted) {
      a();
    }
  }, [status]);

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

  const checkFormValidation = (error) => {
    const { message, statusCode } = error;
    const errs = [];
    if (statusCode === 400) {
      if (message.join(' ').includes('phone')) {
        errs.push(errorMessages.INVALID_PHONE_NUMBER);
      }
    }
    setErrors([...errs]);
  };

  const fetchMe = async () => {
    const res = await getMeService();
    dispatch(setMe(res.data));
  };

  const onUpdateUserProfile = async () => {
    try {
      setLoading(true);
      await updateUserService(dataForm);
      await fetchMe();
      setErrors([]);
      setIsForm(false);
    } catch (error) {
      if (error.response && error.response.data) {
        checkFormValidation(error.response.data);
        setLoading(false);
      }
    }
  };

  const onLocationPermissionOn = async () => {
    await Linking.openSettings();
  };

  return (
    <FKeyboardWrapper>
      <>
        {loading && <FSpinner />}
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
            value={status?.granted ? locales.TURN_ON : locales.TURN_OFF}
            style={styles.headerSpace}
            // isDisabled={status?.status === 'granted'}
            onSwitchValueChange={onLocationPermissionOn}
            switchValue={false}
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
            errorMessage={filterErrorMessages(errors, errorMessages.INVALID_PHONE_NUMBER)}
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
            onPress={() => onUpdateUserProfile()}
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
