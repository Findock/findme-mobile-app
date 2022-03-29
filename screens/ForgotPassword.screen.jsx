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
import errorMessages from 'constants/errorMessages';
import { resetPasswordEmailService } from 'services/resetPasswordEmail.service';
import { FModal } from 'components/Composition/FModal';
import modalTypes from 'constants/modalTypes';

export const ForgotPasswordScreen = () => {
  const [
    dataForm,
    setDataForm,
  ] = useState({
    email: '',
  });
  const [
    noInternetConnectionModalVisible,
    setNoInternetConnectionModalVisible,
  ] = useState(false);
  const [
    errors,
    setErrors,
  ] = useState([]);
  const emailInputHandler = (oldEmail) => {
    setDataForm({
      ...dataForm,
      email: oldEmail,
    });
  };
  const [
    mailSendedSuccessModalVisible,
    setMailSendedSuccessVisible,
  ] = useState(false);
  const checkEmailValidation = (error) => {
    const { message, statusCode } = error;
    const errs = [];
    if (statusCode === 400) {
      if (message.join(' ').includes('email')) {
        errs.push(errorMessages.INVALID_EMAIL);
      }
    }
    setErrors([...errs]);
  };

  const onSubmit = async () => {
    try {
      await resetPasswordEmailService({
        ...dataForm,
      });
    } catch (error) {
      if (error.response && error.response.data) {
        checkEmailValidation(error.response.data);
      } else {
        setNoInternetConnectionModalVisible(true);
      }
      setMailSendedSuccessVisible(true);
    }
  };

  return (
    <>
      {noInternetConnectionModalVisible && (
        <FModal
          type={modalTypes.INFO_MODAL}
          title={locales.IT_SEEMS_TO_BE_NO_INTERNET_CONNECTION}
          visible={noInternetConnectionModalVisible}
          setVisible={setNoInternetConnectionModalVisible}
        />
      )}
      {mailSendedSuccessModalVisible && (
        <FModal
          type={modalTypes.INFO_MODAL}
          title={locales.MESSAGE_SEND_SUCCESS}
          visible={mailSendedSuccessModalVisible}
          setVisible={setMailSendedSuccessVisible}
        />
      )}
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
            errorMessage={errors}
            onChangeText={emailInputHandler}
            value={dataForm.email}
          />
          <View style={styles.buttonContainer}>
            <FButton
              title={locales.RESET_PASSWORD}
              type={buttonTypes.TEXT_BUTTON}
              backgroundColor={colors.PRIMARY}
              color={colors.WHITE}
              titleWeight={fonts.HEADING_WEIGHT_BOLD}
              titleSize={fonts.HEADING_MEDIUM}
              onPress={onSubmit}
            />
          </View>
        </View>
      </FDefaultLayout>
    </>
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
