import React, { useState } from 'react';
import { FDefaultLayout } from 'layouts/FDefault.layout';
import icons from 'themes/icons';
import sizes from 'themes/sizes';
import colors from 'themes/colors';
import locales from 'constants/locales';
import placements from 'themes/placements';
import fonts from 'themes/fonts';
import inputTypes from 'constants/inputTypes';
import { FInput } from 'components/Inputs/FInput';
import buttonTypes from 'constants/buttonTypes';
import { FButton } from 'components/Buttons/FButton';
import { View, StyleSheet } from 'react-native';
import { FImage } from 'components/Composition/FImage';
import images from 'constants/images';
import { FKeyboardWrapper } from 'components/Utils/FKeyboardWrapper';
import errorMessages from 'constants/errorMessages';
import { FModal } from 'components/Composition/FModal';
import modalTypes from 'constants/modalTypes';
import { filterErrorMessages } from 'utils/filterErrorMessages';
import { useErrorModal } from 'hooks/useErrorModal';
import { updatePasswordService } from '../services/updatePassword.service';

export const ChangePasswordScreen = () => {
  const [
    errors,
    setErrors,
  ] = useState([]);
  const [
    dataForm,
    setDataForm,
  ] = useState({
    oldPassword: '',
    newPassword: '',
  });
  const [
    confirmNewPassword,
    setConfirmNewPassword,
  ] = useState('');
  const [
    passwordChangeSuccessModalVisible,
    setPasswordChangeSuccessModalVisible,
  ] = useState(false);
  const {
    setShowErrorModal,
    drawErrorModal,
  } = useErrorModal();

  const oldPasswordInputHandler = (password) => {
    setDataForm({
      ...dataForm,
      oldPassword: password,
    });
  };
  const newPasswordInputHandler = (password) => {
    setDataForm({
      ...dataForm,
      newPassword: password,
    });
  };
  const confirmNewPasswordInputHandler = (password) => {
    setConfirmNewPassword(password);
  };

  const checkPasswordValidation = (response) => {
    const { message, statusCode } = response;
    const errs = [];
    if (statusCode === 400) {
      if (message.join(' ').includes('Invalid')) {
        errs.push(errorMessages.INVALID_OLD_PASSWORD);
      }
      if (message.join(' ').includes('newPassword')) {
        errs.push(errorMessages.PASSWORD_MUST_BE_LONGER_OR_EQUAL_TO_6);
      }
      setErrors([...errs]);
    } else {
      setShowErrorModal(true);
    }
  };

  const onSubmit = async () => {
    if (dataForm.newPassword !== confirmNewPassword) {
      setErrors([errorMessages.PASSWORDS_ARE_NOT_THE_SAME]);
    } else {
      try {
        await updatePasswordService(dataForm);
        setPasswordChangeSuccessModalVisible(true);
        setErrors([]);
      } catch (error) {
        if (error.response && error.response.data) {
          checkPasswordValidation(error.response.data);
        }
      }
    }
  };
  return (
    <FDefaultLayout>
      {passwordChangeSuccessModalVisible && (
        <FModal
          type={modalTypes.INFO_MODAL}
          title={locales.PASSWORD_CHANGED_SUCCESSFULLY}
          visible={passwordChangeSuccessModalVisible}
          setVisible={setPasswordChangeSuccessModalVisible}
        />
      )}
      {drawErrorModal()}
      <FKeyboardWrapper>
        <>
          <View style={styles.imageContainer}>
            <FImage
              imagePath={images.CHANGE_PASSWORD()}
              width={sizes.WIDTH_120}
              height={sizes.HEIGHT_120}
            />
          </View>
          <FInput
            iconPlacement={placements.LEFT}
            type={inputTypes.PASSWORD}
            icon={icons.LOCK_CLOSED_OUTLINE}
            placeholder={locales.PASS_OLD_PASSWORD}
            marginBottom={sizes.MARGIN_30}
            onChangeText={oldPasswordInputHandler}
            errorMessage={filterErrorMessages(errors, errorMessages.INVALID_OLD_PASSWORD)}
          />
          <FInput
            iconPlacement={placements.LEFT}
            type={inputTypes.PASSWORD}
            icon={icons.LOCK_CLOSED_OUTLINE}
            placeholder={locales.PASS_NEW_PASSWORD}
            onChangeText={newPasswordInputHandler}
            errorMessage={filterErrorMessages(errors, errorMessages.PASSWORD_MUST_BE_LONGER_OR_EQUAL_TO_6)
              || filterErrorMessages(errors, errorMessages.PASSWORDS_ARE_NOT_THE_SAME)}
          />
          <FInput
            iconPlacement={placements.LEFT}
            type={inputTypes.PASSWORD}
            icon={icons.LOCK_CLOSED_OUTLINE}
            placeholder={locales.REPEAT_NEW_PASSWORD}
            onChangeText={confirmNewPasswordInputHandler}
            errorMessage={filterErrorMessages(errors, errorMessages.PASSWORD_MUST_BE_LONGER_OR_EQUAL_TO_6)
              || filterErrorMessages(errors, errorMessages.PASSWORDS_ARE_NOT_THE_SAME)}
          />
          <View style={styles.buttonContainer}>
            <FButton
              title={locales.CHANGE_PASSWORD}
              type={buttonTypes.TEXT_BUTTON}
              backgroundColor={colors.PRIMARY}
              color={colors.WHITE}
              titleWeight={fonts.HEADING_WEIGHT_BOLD}
              titleSize={fonts.HEADING_MEDIUM}
              onPress={onSubmit}
            />
          </View>
        </>
      </FKeyboardWrapper>
    </FDefaultLayout>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    width: sizes.WIDTH_FULL,
    alignItems: placements.CENTER,
    marginVertical: sizes.MARGIN_50,
  },
  buttonContainer: {
    width: sizes.WIDTH_FULL,
    alignItems: placements.CENTER,
    marginVertical: sizes.MARGIN_20,
  },
});
