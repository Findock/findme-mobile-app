import React, { useState } from 'react';
import icons from 'themes/icons';
import sizes from 'themes/sizes';
import colors from 'themes/colors';
import locales from 'constants/locales';
import placements from 'themes/placements';
import fonts from 'themes/fonts';
import inputTypes from 'constants/components/inputs/inputTypes';
import { FInput } from 'components/Inputs/FInput';
import buttonTypes from 'constants/components/buttonTypes';
import { FButton } from 'components/Buttons/FButton';
import { StyleSheet, View } from 'react-native';
import { FImage } from 'components/Composition/FImage';
import images from 'constants/images';
import { filterErrorMessages } from 'utils/filterErrorMessages';
import { useErrorModal } from 'hooks/modals/useErrorModal';
import { FSpinner } from 'components/Composition/FSpinner';
import { useNavigation } from '@react-navigation/native';
import placeholders from 'constants/components/inputs/placeholders';
import { updatePasswordService } from 'services/user/updatePassword.service';
import userMessages from 'constants/components/inputs/errorMessages/userMessages';
import { FFormLayout } from 'layouts/FFormLayout';
import modalsMessages from 'constants/components/modals/modalsMessages';
import { useSuccessModal } from 'hooks/modals/useSuccessModal';

export const ChangePasswordScreen = () => {
  const navigation = useNavigation();
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
    loading,
    setLoading,
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
    const {
      message,
      statusCode,
    } = response;
    const errs = [];
    if (statusCode === 400) {
      if (message.join(' ')
        .includes('same as')) {
        errs.push(userMessages.NEW_PASSWORD_THE_SAME_AS_OLD_PASSWORD);
      }
      if (message.join(' ')
        .includes('oldPassword')) {
        errs.push(userMessages.INVALID_OLD_PASSWORD);
      }
      if (message.join(' ')
        .includes('newPassword')) {
        errs.push(userMessages.PASSWORD_MUST_BE_LONGER_OR_EQUAL_TO_6);
      }
      setErrors([...errs]);
    } else {
      setShowErrorModal(true);
    }
  };

  const onSubmit = async () => {
    if (dataForm.newPassword !== confirmNewPassword) {
      setErrors([userMessages.PASSWORDS_ARE_NOT_THE_SAME]);
    } else {
      try {
        setLoading(true);
        await updatePasswordService(dataForm);
        setLoading(false);
        setShowSuccessModal(true);
        setErrors([]);
      } catch (error) {
        console.log(error.response);
        setLoading(false);
        if (error.response && error.response.data) {
          checkPasswordValidation(error.response.data);
        }
      }
    }
  };
  const {
    setShowSuccessModal,
    drawSuccessModal,
  } = useSuccessModal(modalsMessages.PASSWORD_CHANGED_SUCCESSFULLY, () => navigation.goBack());

  return (
    <FFormLayout>
      {drawSuccessModal()}
      {drawErrorModal()}
      <>
        {loading && <FSpinner />}
        <View style={styles.imageContainer}>
          <FImage
            imagePath={images.CHANGE_PASSWORD()}
            width={sizes.WIDTH_120}
            height={sizes.HEIGHT_120}
            networkImageUrl=""
            resizeMode={sizes.CONTAIN}
            isChildrenInside={false}
            imageHeight={sizes.HEIGHT_FULL}
            imageWidth={sizes.WIDTH_FULL}
          />
        </View>
        <FInput
          iconPlacement={placements.LEFT}
          type={inputTypes.PASSWORD}
          icon={icons.LOCK_CLOSED_OUTLINE}
          placeholder={placeholders.PASS_OLD_PASSWORD}
          marginBottom={sizes.MARGIN_30}
          onChangeText={oldPasswordInputHandler}
          errorMessage={filterErrorMessages(errors, userMessages.INVALID_OLD_PASSWORD)}
          width={sizes.WIDTH_FULL}
          value={dataForm.oldPassword}
        />
        <FInput
          iconPlacement={placements.LEFT}
          type={inputTypes.PASSWORD}
          icon={icons.LOCK_CLOSED_OUTLINE}
          placeholder={placeholders.PASS_NEW_PASSWORD}
          onChangeText={newPasswordInputHandler}
          errorMessage={filterErrorMessages(errors, userMessages.PASSWORD_MUST_BE_LONGER_OR_EQUAL_TO_6)
            || filterErrorMessages(errors, userMessages.PASSWORDS_ARE_NOT_THE_SAME)
            || filterErrorMessages(errors, userMessages.NEW_PASSWORD_THE_SAME_AS_OLD_PASSWORD)}
          width={sizes.WIDTH_FULL}
          value={dataForm.newPassword}
        />
        <FInput
          iconPlacement={placements.LEFT}
          type={inputTypes.PASSWORD}
          icon={icons.LOCK_CLOSED_OUTLINE}
          placeholder={placeholders.REPEAT_NEW_PASSWORD}
          onChangeText={confirmNewPasswordInputHandler}
          errorMessage={filterErrorMessages(errors, userMessages.PASSWORD_MUST_BE_LONGER_OR_EQUAL_TO_6)
            || filterErrorMessages(errors, userMessages.PASSWORDS_ARE_NOT_THE_SAME)}
          width={sizes.WIDTH_FULL}
          value={confirmNewPassword}
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
    </FFormLayout>
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
