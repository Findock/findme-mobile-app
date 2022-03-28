import React, { useState } from 'react';
import locales from 'constants/locales';
import colors from 'themes/colors';
import placements from 'themes/placements';
import fonts from 'themes/fonts';
import { FHeading } from 'components/Composition/FHeading';
import { Ionicons } from '@expo/vector-icons';
import { FButton } from 'components/Buttons/FButton';
import buttonTypes from 'constants/buttonTypes';
import { FInput } from 'components/Inputs/FInput';
import inputTypes from 'constants/inputTypes';
import icons from 'themes/icons';
import sizes from 'themes/sizes';
import { FDefaultLayout } from 'layouts/FDefault.layout';
import { View } from 'react-native';
import * as Device from 'expo-device';
import errorMessages from 'constants/errorMessages';

export const ForgotPasswordScreen = () => {
  const [
    dataForm,
    setDataForm,
  ] = useState({
    email: '',
    deviceName: Device.modelName,
  });
  const [
    errors,
    setErrors,
  ] = useState([]);
  const [
    loading,
    setLoading,
  ] = useState(false);
  const passwordInputHandler = (newPassword) => {
    setDataForm({
      ...dataForm,
      password: newPassword,
    });
  };

  const checkEmailValidation = (error) => {
    const { message, statusCode } = error;
    const errs = [];
    if (statusCode === 400) {
      if (message.join(' ').includes('email')) {
        errs.push(errorMessages.INVALID_EMAIL);
      }
    }
    if (statusCode === 401) {
      if (message.join(' ').includes('email')) {
        errs.push(errorMessages.USER_WITH_THIS_EMAIL_DOES_NOT_EXIST);
      }
    }
    if (statusCode === 500) {
      setLoading(false);
    }
    setErrors([...errs]);
  };

  return (
    <FDefaultLayout
      hasFlatList={false}
    >
      <View style={{
        flexGrow: 1,
        justifyContent: placements.CENTER,
      }}
      >
        <View style={styles.imageContainer}>
          <Ionicons
            name={icons.LOCK_OPEN_OUTLINE}
            size={sizes.ICON_100}
            color={colors.PRIMARY}
          />
        </View>
        <FHeading
          title={locales.FORGOT_YOUR_PASSWORD}
          color={colors.BLACK}
          align={placements.CENTER}
          size={fonts.HEADING_EXTRA_LARGE}
          weight={fonts.HEADING_WEIGHT_MEDIUM}
        />
        <FHeading
          title={locales.ENTER_EMAIL_TO_RESET_PASSWORD}
          align={placements.CENTER}
          size={fonts.HEADING_SMALL}
          weight={fonts.HEADING_WEIGHT_REGULAR}
          marginBottom={sizes.MARGIN_20}
          style={styles.marginTop}
        />
        <FInput
          iconPlacement={placements.LEFT}
          type={inputTypes.EMAIL}
          icon={icons.MAIL_OUTLINE}
          placeholder={locales.EMAIL}
        />
        <View style={styles.buttonContainer}>
          <FButton
            title={locales.RESET_PASSWORD}
            type={buttonTypes.TEXT_BUTTON}
            backgroundColor={colors.PRIMARY}
            color={colors.WHITE}
            titleWeight={fonts.HEADING_WEIGHT_BOLD}
            titleSize={fonts.HEADING_MEDIUM}
          />
        </View>
      </View>
    </FDefaultLayout>

  );
};

const styles = {
  imageContainer: {
    width: sizes.WIDTH_FULL,
    alignItems: placements.CENTER,
    marginBottom: sizes.MARGIN_20,
  },
  buttonContainer: {
    alignItems: placements.CENTER,
    marginVertical: sizes.MARGIN_20,
  },
  marginTop: {
    marginTop: sizes.MARGIN_10,
  },
};
