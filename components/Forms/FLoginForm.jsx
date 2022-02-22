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
import { useDispatch } from 'react-redux';
import { setToken } from 'store/auth/authSlice';
import errorMessages from 'constants/errorMessages';
import { filterErrorMessages } from 'utils/filterErrorMessages';
import { FSpinner } from 'components/Composition/FSpinner';
import { FModal } from 'components/Composition/FModal';
import modalTypes from 'constants/modalTypes';

export const FLoginForm = ({ navigation }) => {
  const dispatch = useDispatch();

  const [
    modalVisible,
    setModalVisible,
  ] = useState(false);
  const [
    dataForm,
    setDataForm,
  ] = useState({
    email: '',
    password: '',
  });
  const [
    errors,
    setErrors,
  ] = useState([]);
  const [
    loading,
    setLoading,
  ] = useState(false);

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

  const checkFormValidation = (error) => {
    const { message, statusCode } = error;
    const errs = [];
    if (statusCode === 400) {
      if (message.join(' ').includes('email')) {
        errs.push(errorMessages.INVALID_EMAIL);
      }
      if (message.join(' ').includes('password')) {
        errs.push(errorMessages.INVALID_PASSWORD);
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

  const onSubmit = async () => {
    try {
      setLoading(true);
      const res = await authUserService(dataForm);
      await SecureStore.setItemAsync('Authorization', `${res.data.token_type} ${res.data.access_token}`);
      const authToken = await SecureStore.getItemAsync('Authorization');
      dispatch(setToken(authToken));
      setLoading(false);
      setErrors([]);
    } catch (error) {
      if (error.response && error.response.data) {
        checkFormValidation(error.response.data);
      } else {
        setModalVisible(true);
      }
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <FSpinner />}
      {modalVisible && (
        <FModal
          type={modalTypes.INFO_MODAL}
          title={locales.IT_SEEMS_TO_BE_NO_INTERNET_CONNECTION}
          visible={modalVisible}
          setVisible={setModalVisible}
        />
      )}
      <View>
        <FInput
          type={inputTypes.EMAIL}
          icon={icons.MAIL_OUTLINE}
          iconPlacement={placements.LEFT}
          placeholder={locales.EMAIL}
          width={sizes.WIDTH_FULL}
          onChangeText={emailInputHandler}
          value={dataForm.email}
          errorMessage={filterErrorMessages(errors, errorMessages.INVALID_EMAIL)
            || filterErrorMessages(errors, errorMessages.USER_WITH_THIS_EMAIL_DOES_NOT_EXIST)}
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
          errorMessage={filterErrorMessages(errors, errorMessages.INVALID_PASSWORD)}
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
