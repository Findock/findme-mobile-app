import React, { useState } from 'react';
import locales from 'constants/locales';
import colors from 'themes/colors';
import placements from 'themes/placements';
import fonts from 'themes/fonts';
import { FHeading } from 'components/Composition/FHeading';
import { Ionicons } from '@expo/vector-icons';
import { FButton } from 'components/Buttons/FButton';
import buttonTypes from 'constants/components/buttonTypes';
import { FInput } from 'components/Inputs/FInput';
import inputTypes from 'constants/components/inputs/inputTypes';
import icons from 'themes/icons';
import sizes from 'themes/sizes';
import { StyleSheet, View } from 'react-native';
import { FModal } from 'components/Composition/FModal';
import modalTypes from 'constants/components/modalTypes';
import { useErrorModal } from 'hooks/useErrorModal';
import placeholders from 'constants/components/inputs/placeholders';
import { resetPasswordEmailService } from 'services/user/resetPasswordEmail.service';
import userMessages from 'constants/components/inputs/errorMessages/userMessages';
import { filterErrorMessages } from 'utils/filterErrorMessages';
import { FFormLayout } from 'layouts/FFormLayout';

export const ForgotPasswordScreen = () => {
  const [
    email,
    setEmail,
  ] = useState('');
  const [
    errors,
    setErrors,
  ] = useState([]);
  const [
    mailSentSuccessModalVisible,
    setMailSentSuccessModalVisible,
  ] = useState(false);
  const {
    setShowErrorModal,
    drawErrorModal,
  } = useErrorModal();

  const emailInputHandler = (newEmail) => {
    setEmail(newEmail);
  };

  const checkEmailValidation = (response) => {
    const { statusCode } = response;
    const errs = [];
    if (statusCode === 400) {
      errs.push(userMessages.INVALID_EMAIL);
    } else if (statusCode === 404) {
      errs.push(userMessages.USER_WITH_THIS_EMAIL_DOES_NOT_EXIST);
    } else {
      setShowErrorModal(true);
    }
    setErrors([...errs]);
  };

  const onSubmit = async () => {
    try {
      await resetPasswordEmailService({ email });
      setMailSentSuccessModalVisible(true);
      setErrors([]);
    } catch (error) {
      if (error.response && error.response.data) {
        checkEmailValidation(error.response.data);
      }
    }
  };

  return (
    <FFormLayout>
      {mailSentSuccessModalVisible && (
        <FModal
          type={modalTypes.INFO_MODAL}
          title={locales.MESSAGE_SEND_SUCCESS}
          visible={mailSentSuccessModalVisible}
          setVisible={setMailSentSuccessModalVisible}
        />
      )}
      {drawErrorModal()}
      <View style={{
        flexGrow: 1,
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
          placeholder={placeholders.EMAIL}
          errorMessage={filterErrorMessages(errors, userMessages.USER_WITH_THIS_EMAIL_DOES_NOT_EXIST)}
          onChangeText={emailInputHandler}
          value={email}
          width={sizes.WIDTH_FULL}
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
    </FFormLayout>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    width: sizes.WIDTH_FULL,
    alignItems: placements.CENTER,
    marginBottom: sizes.MARGIN_10,
  },
  buttonContainer: {
    alignItems: placements.CENTER,
    marginVertical: sizes.MARGIN_20,
  },
  marginTop: {
    marginTop: sizes.MARGIN_10,
  },
});
