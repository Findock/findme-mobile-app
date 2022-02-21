import { FButton } from 'components/Buttons/FButton';
import { FInput } from 'components/Inputs/FInput';
import buttonTypes from 'constants/buttonTypes';
import inputTypes from 'constants/inputTypes';
import locales from 'constants/locales';
import stackNavigatorNames from 'constants/stackNavigatorNames';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { authUserService } from 'services/authUser.service';
import colors from 'themes/colors';
import fonts from 'themes/fonts';
import icons from 'themes/icons';
import placements from 'themes/placements';
import sizes from 'themes/sizes';
import * as SecureStore from 'expo-secure-store';

export const FLoginForm = ({ navigation }) => {
  const [
    dataForm,
    setDataForm,
  ] = useState({
    email: '',
    password: '',
  });

  const emailInputHandler = (newEmail) => {
    setDataForm({
      ...dataForm,
      email: newEmail,
    });
  };

  const passwordInputHandler = (newPassword) => {
    setDataForm({
      ...dataForm,
      password: newPassword,
    });
  };

  const onSubmit = async () => {
    try {
      const res = await authUserService(dataForm);
      await SecureStore.setItemAsync(locales.SECURE_STORE_KEY, `${res.data.token_type} ${res.data.access_token}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <View>
        <FInput
          type={inputTypes.EMAIL}
          icon={icons.MAIL_OUTLINE}
          iconPlacement={placements.LEFT}
          placeholder={locales.EMAIL}
          width={sizes.WIDTH_FULL}
          onChangeText={emailInputHandler}
          value={dataForm.email}
        />
        <FInput
          placeholder={locales.PASSWORD}
          icon={icons.LOCK_CLOSED_OUTLINE}
          iconPlacement={placements.LEFT}
          type={inputTypes.PASSWORD}
          maxLength={64}
          width={sizes.WIDTH_FULL}
          onChangeText={passwordInputHandler}
          value={dataForm.password}
        />
      </View>
      <View>
        <View style={styles.buttonsLinkContainer}>
          <FButton
            type={buttonTypes.LINK_BUTTON}
            title={locales.CREATE_ACCOUNT}
            color={colors.GREEN}
            titleWeight={fonts.HEADING_WEIGHT_SEMIBOLD}
            titleSize={fonts.HEADING_NORMAL}
            navigation={navigation}
            to={stackNavigatorNames.REGISTRATION}
          />
          <FButton
            type={buttonTypes.LINK_BUTTON}
            title={locales.FORGOT_PASSWORD}
            color={colors.DARK_GRAY}
            titleWeight={fonts.HEADING_WEIGHT_SEMIBOLD}
            titleSize={fonts.HEADING_NORMAL}
          />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <FButton
          backgroundColor={colors.GREEN}
          color={colors.WHITE}
          iconSize={sizes.ICON_20}
          titleWeight={fonts.HEADING_WEIGHT_BOLD}
          titleSize={fonts.HEADING_NORMAL}
          title={locales.LOGIN}
          type={buttonTypes.BUTTON_WITH_ICON_AND_TEXT}
          icon={icons.PAW}
          onPress={onSubmit}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  buttonsLinkContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: placements.CENTER,
    marginTop: sizes.MARGIN_8,
  },
  buttonContainer: {
    alignItems: placements.CENTER,
    marginTop: sizes.MARGIN_40,
  },
});
