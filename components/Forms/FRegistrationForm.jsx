import locales from 'constants/locales';
import React, { useState } from 'react';
import {
  View, StyleSheet,
} from 'react-native';
import icons from 'themes/icons';
import placements from 'themes/placements';
import inputTypes from 'constants/inputTypes';
import { FButton } from 'components/Buttons/FButton';
import colors from 'themes/colors';
import sizes from 'themes/sizes';
import fonts from 'themes/fonts';
import buttonTypes from 'constants/buttonTypes';
import errorMessages from 'constants/errorMessages';
import { createUserService } from 'services/createUser.service';
import { FSpinner } from 'components/Composition/FSpinner';
import { FInput } from '../Inputs/FInput';
import { filterErrorMessages } from '../../utils/filterErrorMessages';

export const FRegistrationForm = () => {
  const [
    dataForm,
    setDataForm,
  ] = useState({
    email: '',
    password: '',
    name: '',
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

  const checkFormValidation = () => {
    let isValid = true;
    const errs = [];
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!dataForm.email || !emailRegex.test(dataForm.email)) {
      errs.push(errorMessages.INVALID_EMAIL);
      isValid = false;
    }
    if (!dataForm.name) {
      errs.push(errorMessages.NAME_CANNOT_BE_EMPTY);
      isValid = false;
    }
    if (dataForm.password.length < 6) {
      errs.push(errorMessages.PASSWORD_MUST_BE_LONGER_OR_EQUAL_TO_6);
      isValid = false;
    }
    setErrors([...errs]);
    return isValid;
  };

  const onSubmit = async () => {
    try {
      if (checkFormValidation()) {
        setLoading(true);
        await createUserService(dataForm);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      setErrors([...errors, error.response.data.error]);
    }
  };

  return (
    <>
      {loading && <FSpinner />}
      <View style={{ position: 'relative' }}>
        <View>
          <FInput
            placeholder={locales.EMAIL}
            value={dataForm.email}
            icon={icons.MAIL_OUTLINE}
            iconPlacement={placements.LEFT}
            onChangeText={emailInputHandler}
            type={inputTypes.EMAIL}
            width={sizes.WIDTH_310}
            errorMessage={filterErrorMessages(errors, errorMessages.INVALID_EMAIL)
              || filterErrorMessages(errors, errorMessages.USER_ALREADY_EXISTS)}
          />
          <FInput
            placeholder={`${locales.NAME} ${locales.SURNAME}`}
            value={dataForm.name}
            icon={icons.PERSON_OUTLINE}
            iconPlacement={placements.LEFT}
            onChangeText={nameInputHandler}
            type={inputTypes.TEXT}
            width={sizes.WIDTH_310}
            errorMessage={filterErrorMessages(errors, errorMessages.NAME_CANNOT_BE_EMPTY)}
          />
          <FInput
            placeholder={locales.PASSWORD}
            value={dataForm.password}
            icon={icons.LOCK_CLOSED_OUTLINE}
            iconPlacement={placements.LEFT}
            onChangeText={passwordInputHandler}
            type={inputTypes.PASSWORD}
            maxLength={64}
            width={sizes.WIDTH_310}
            errorMessage={filterErrorMessages(errors, errorMessages.PASSWORD_MUST_BE_LONGER_OR_EQUAL_TO_6)}
          />
        </View>
        <View style={styles.buttonContainer}>
          <FButton
            backgroundColor={colors.GREEN}
            color={colors.WHITE}
            iconSize={sizes.ICON_20}
            titleWeight={fonts.HEADING_WEIGHT_BOLD}
            titleSize={fonts.HEADING_NORMAL}
            title={locales.REGISTER}
            type={buttonTypes.BUTTON_WITH_ICON_AND_TEXT}
            icon={icons.PAW}
            width={sizes.WIDTH_310}
            onPress={onSubmit}
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: placements.CENTER,
    marginTop: sizes.MARGIN_20,
  },
});
