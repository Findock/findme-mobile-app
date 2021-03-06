import locales from 'constants/locales';
import React, { useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import icons from 'themes/icons';
import placements from 'themes/placements';
import inputTypes from 'constants/components/inputs/inputTypes';
import { FButton } from 'components/Buttons/FButton';
import colors from 'themes/colors';
import sizes from 'themes/sizes';
import fonts from 'themes/fonts';
import buttonTypes from 'constants/components/buttonTypes';
import { FSpinner } from 'components/Composition/FSpinner';
import { FInput } from 'components/Inputs/FInput';
import { filterErrorMessages } from 'utils/filterErrorMessages';
import { FCheckbox } from 'components/Inputs/FCheckbox';
import stackNavigatorNames from 'constants/stackNavigatorNames';
import { FModal } from 'components/Composition/FModal';
import modalTypes from 'constants/components/modals/modalTypes';
import { useNavigation } from '@react-navigation/native';
import placeholders from 'constants/components/inputs/placeholders';
import checkboxTypes from 'constants/components/checkboxTypes';
import { createUserService } from 'services/user/createUser.service';
import userMessages from 'constants/components/inputs/errorMessages/userMessages';
import { FErrorMessage } from 'components/Composition/FErrorMessage';
import modalsMessages from 'constants/components/modals/modalsMessages';

export const FRegistrationForm = () => {
  const navigation = useNavigation();
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
    name: '',
    termsAccepted: false,
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
  const nameInputHandler = (newName) => {
    setDataForm({
      ...dataForm,
      name: newName,
    });
  };
  const passwordInputHandler = (newPassword) => {
    setDataForm({
      ...dataForm,
      password: newPassword,
    });
  };

  const termsAcceptedHandler = () => {
    setDataForm({
      ...dataForm,
      termsAccepted: !dataForm.termsAccepted,
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
        errs.push(userMessages.PASSWORD_MUST_BE_LONGER_OR_EQUAL_TO_6);
      }
      if (message.join(' ')
        .includes('name')) {
        errs.push(userMessages.NAME_CANNOT_BE_EMPTY);
      }
      if (message.join(' ')
        .includes('Terms') || message.join(' ')
        .includes('terms')) {
        errs.push(userMessages.YOU_HAVE_TO_ACCEPT_REGULATIONS);
      }
    }
    if (statusCode === 409) {
      if (message.join(' ')
        .includes('email')) {
        errs.push(userMessages.USER_ALREADY_EXISTS);
      }
    }
    setErrors([...errs]);
  };
  const onSubmit = async () => {
    try {
      setLoading(true);
      await createUserService(dataForm);
      navigation.navigate(stackNavigatorNames.AUTH_ROOT, {
        screen: stackNavigatorNames.LOGIN,
        params: {
          afterRegisterEmail: dataForm.email,
          afterRegisterPassword: dataForm.password,
          showRegistrationModal: true,
        },
      });
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
          type={modalTypes.INFO_ERROR_MODAL}
          title={modalsMessages.SOMETHING_WENT_WRONG}
          visible={modalVisible}
          setVisible={setModalVisible}
        />
      )}
      <View>
        <FInput
          placeholder={placeholders.EMAIL}
          value={dataForm.email}
          icon={icons.MAIL_OUTLINE}
          iconPlacement={placements.LEFT}
          onChangeText={emailInputHandler}
          type={inputTypes.EMAIL}
          width={sizes.WIDTH_FULL}
          errorMessage={filterErrorMessages(errors, userMessages.INVALID_EMAIL)
            || filterErrorMessages(errors, userMessages.USER_ALREADY_EXISTS)}
        />
        <FInput
          placeholder={placeholders.NAME}
          value={dataForm.name}
          icon={icons.PERSON_OUTLINE}
          iconPlacement={placements.LEFT}
          onChangeText={nameInputHandler}
          type={inputTypes.TEXT}
          width={sizes.WIDTH_FULL}
          errorMessage={filterErrorMessages(errors, userMessages.NAME_CANNOT_BE_EMPTY)}
        />
        <FInput
          placeholder={placeholders.PASSWORD}
          value={dataForm.password}
          icon={icons.LOCK_CLOSED_OUTLINE}
          iconPlacement={placements.LEFT}
          onChangeText={passwordInputHandler}
          type={inputTypes.PASSWORD}
          maxLength={64}
          width={sizes.WIDTH_FULL}
          errorMessage={filterErrorMessages(errors, userMessages.PASSWORD_MUST_BE_LONGER_OR_EQUAL_TO_6)}
        />
      </View>
      <View>
        <View style={styles.regulationsContainer}>
          <FCheckbox
            iconColor={colors.WHITE}
            checkboxBorderColor={colors.PRIMARY}
            checkboxBgColor={colors.PRIMARY}
            setValue={termsAcceptedHandler}
            value={dataForm.termsAccepted}
            label={locales.ACCEPT_REGULATIONS}
            type={checkboxTypes.CHECKBOX_WITH_ICON}
            labelSize={fonts.HEADING_EXTRA_SMALL}
            labelWeight={fonts.HEADING_WEIGHT_MEDIUM}
            labelColor={colors.DARK_GRAY}
          />
        </View>
        <View style={styles.regulationsErrorMessageContainer}>
          <FErrorMessage error={filterErrorMessages(errors, userMessages.YOU_HAVE_TO_ACCEPT_REGULATIONS) || ''} />
        </View>
      </View>
      <View style={styles.buttonsContainer}>
        <FButton
          backgroundColor={colors.PRIMARY}
          color={colors.WHITE}
          iconSize={sizes.ICON_20}
          titleWeight={fonts.HEADING_WEIGHT_BOLD}
          titleSize={fonts.HEADING_NORMAL}
          title={locales.REGISTER}
          type={buttonTypes.BUTTON_WITH_ICON_AND_TEXT}
          icon={icons.PAW}
          onPress={onSubmit}
        />
        <View style={{ marginTop: sizes.MARGIN_20 }}>
          <FButton
            color={colors.DARK_GRAY}
            titleWeight={fonts.HEADING_WEIGHT_BOLD}
            titleSize={fonts.HEADING_NORMAL}
            title={locales.HAVE_ACCOUNT_ALREADY}
            type={buttonTypes.LINK_BUTTON}
            onPress={onSubmit}
            navigation={navigation}
            to={stackNavigatorNames.LOGIN}
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonsContainer: {
    alignItems: placements.CENTER,
    marginTop: Dimensions.get('window').height < 800 ? Dimensions.get('window').height * 0.02 : sizes.MARGIN_40,
  },
  regulationsContainer: {
    flexDirection: 'row',
    alignItems: placements.CENTER,
  },
  regulationsErrorMessageContainer: {
    marginTop: sizes.MARGIN_5,
  },
});
