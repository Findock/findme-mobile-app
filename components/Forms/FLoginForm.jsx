import { FButton } from 'components/Buttons/FButton';
import { FInput } from 'components/Inputs/FInput';
import buttonTypes from 'constants/components/buttonTypes';
import inputTypes from 'constants/components/inputs/inputTypes';
import locales from 'constants/locales';
import stackNavigatorNames from 'constants/stackNavigatorNames';
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import colors from 'themes/colors';
import fonts from 'themes/fonts';
import icons from 'themes/icons';
import placements from 'themes/placements';
import sizes from 'themes/sizes';
import * as SecureStore from 'expo-secure-store';
import { useDispatch } from 'react-redux';
import { setToken } from 'store/auth/authSlice';
import { filterErrorMessages } from 'utils/filterErrorMessages';
import { FModal } from 'components/Composition/FModal';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as Device from 'expo-device';
import * as Location from 'expo-location';
import { FSpinner } from 'components/Composition/FSpinner';
import placeholders from 'constants/components/inputs/placeholders';
import { authUserService } from 'services/auth/authUser.service';
import userMessages from 'constants/components/inputs/errorMessages/userMessages';
import modalsMessages from 'constants/components/modals/modalsMessages';
import modalTypes from 'constants/components/modals/modalTypes';
import { useSuccessModal } from 'hooks/modals/useSuccessModal';

export const FLoginForm = () => {
  const dispatch = useDispatch();
  const route = useRoute();
  const navigation = useNavigation();

  const successfulModalTitle = useRef('');
  const [
    noInternetConnectionModalVisible,
    setNoInternetConnectionModalVisible,
  ] = useState(false);
  const [
    dataForm,
    setDataForm,
  ] = useState({
    email: '',
    password: '',
    deviceName: Device.modelName,
    localizationDescription: null,
  });
  const [
    errors,
    setErrors,
  ] = useState([]);
  const [
    loading,
    setLoading,
  ] = useState(false);

  useEffect(() => {
    if (route.params?.showLogoutModal) {
      successfulModalTitle.current = modalsMessages.SUCCESSFUL_LOGOUT;
      setShowSuccessModal(true);
      navigation.setParams({ showLogoutModal: false });
    }
  }, [route.params?.showLogoutModal]);

  useEffect(() => {
    if (route.params?.showRegistrationModal) {
      successfulModalTitle.current = modalsMessages.SUCCESSFUL_REGISTRATION;
      setShowSuccessModal(true);
      navigation.setParams({ showRegistrationModal: false });
    }
  }, [route.params?.showDeleteAccountModal]);

  useEffect(() => {
    if (route.params?.showDeleteAccountModal) {
      successfulModalTitle.current = modalsMessages.SUCCESSFUL_ACCOUNT_DELETING;
      setShowSuccessModal(true);
      navigation.setParams({ showDeleteAccountModal: false });
    }
  }, [route.params?.showDeleteAccountModal]);

  useEffect(() => {
    if (route.params?.afterRegisterEmail && route.params?.afterRegisterPassword) {
      setErrors([]);
      setDataForm({
        email: route.params.afterRegisterEmail,
        password: route.params.afterRegisterPassword,
        deviceName: Device.modelName,
      });
      navigation.setParams({
        afterRegisterEmail: '',
        afterRegisterPassword: '',
      });
    }
  }, [route.params?.afterRegisterEmail, route.params?.afterRegisterPassword]);

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
    const {
      message,
      statusCode,
    } = error;
    const errs = [];
    if (statusCode === 400) {
      if (message.join(' ')
        .includes('email')) {
        errs.push(userMessages.INVALID_EMAIL);
      }
      if (message.join(' ')
        .includes('password')) {
        errs.push(userMessages.INVALID_PASSWORD);
      }
    }
    if (statusCode === 401) {
      if (message.join(' ')
        .includes('email')) {
        errs.push(userMessages.USER_WITH_THIS_EMAIL_DOES_NOT_EXIST);
      }
      if (message.join(' ')
        .includes('password')) {
        errs.push(userMessages.INVALID_PASSWORD);
      }
    }
    if (statusCode === 500) {
      setLoading(false);
    }
    setErrors([...errs]);
  };

  const onAccessForegroundPermissions = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status === 'granted') {
      const {
        coords: {
          altitude,
          latitude,
        },
      } = await Location.getCurrentPositionAsync({});
      return `${altitude} ${latitude}`;
    }
    return 'unknown';
  };

  const onSubmit = async () => {
    try {
      setLoading(true);
      const res = await authUserService({
        ...dataForm,
        localizationDescription: await onAccessForegroundPermissions(),
      });
      await SecureStore.setItemAsync('Authorization', `${res.data.token_type} ${res.data.access_token}`);
      const authToken = await SecureStore.getItemAsync('Authorization');
      dispatch(setToken(authToken));
    } catch (error) {
      if (error.response && error.response.data) {
        checkFormValidation(error.response.data);
      } else {
        setNoInternetConnectionModalVisible(true);
      }
      setLoading(false);
    }
  };

  const {
    setShowSuccessModal,
    drawSuccessModal,
  } = useSuccessModal(successfulModalTitle.current);

  return (
    <>
      {loading && <FSpinner />}
      {noInternetConnectionModalVisible && (
        <FModal
          type={modalTypes.INFO_ERROR_MODAL}
          title={modalsMessages.SOMETHING_WENT_WRONG}
          visible={noInternetConnectionModalVisible}
          setVisible={setNoInternetConnectionModalVisible}
        />
      )}
      {drawSuccessModal()}
      <View>
        <FInput
          type={inputTypes.EMAIL}
          icon={icons.MAIL_OUTLINE}
          iconPlacement={placements.LEFT}
          placeholder={placeholders.EMAIL}
          width={sizes.WIDTH_FULL}
          onChangeText={emailInputHandler}
          value={dataForm.email}
          errorMessage={filterErrorMessages(errors, userMessages.INVALID_EMAIL)
            || filterErrorMessages(errors, userMessages.USER_WITH_THIS_EMAIL_DOES_NOT_EXIST)}
        />
        <FInput
          placeholder={placeholders.PASSWORD}
          icon={icons.LOCK_CLOSED_OUTLINE}
          iconPlacement={placements.LEFT}
          type={inputTypes.PASSWORD}
          maxLength={64}
          width={sizes.WIDTH_FULL}
          onChangeText={passwordInputHandler}
          value={dataForm.password}
          errorMessage={filterErrorMessages(errors, userMessages.INVALID_PASSWORD)}
        />
      </View>
      <View>
        <View style={styles.buttonsLinkContainer}>
          <FButton
            type={buttonTypes.LINK_BUTTON}
            title={locales.CREATE_ACCOUNT}
            color={colors.PRIMARY}
            titleWeight={fonts.HEADING_WEIGHT_BOLD}
            titleSize={fonts.HEADING_MEDIUM}
            navigation={navigation}
            to={stackNavigatorNames.REGISTRATION}
          />
          <FButton
            type={buttonTypes.LINK_BUTTON}
            title={locales.FORGOT_PASSWORD}
            color={colors.DARK_GRAY}
            titleWeight={fonts.HEADING_WEIGHT_SEMIBOLD}
            titleSize={fonts.HEADING_NORMAL}
            to={stackNavigatorNames.FORGOT_PASSWORD}
          />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <FButton
          backgroundColor={colors.PRIMARY}
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
