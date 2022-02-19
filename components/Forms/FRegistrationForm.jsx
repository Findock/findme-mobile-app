import locales from 'constants/locales';
import React, { useState } from 'react';
import {
  View, StyleSheet, Dimensions,
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
import { FInput } from 'components/Inputs/FInput';
import { filterErrorMessages } from 'utils/filterErrorMessages';
import { FCheckbox } from 'components/Inputs/FCheckbox';
import { FHeading } from 'components/Composition/FHeading';
import stackNavigatorNames from 'constants/stackNavigatorNames';

export const FRegistrationForm = ({ navigation }) => {
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
  const [
    acceptRegulations,
    setAcceptRegulations,
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
    if (!acceptRegulations) {
      errs.push(errorMessages.YOU_HAVE_TO_ACCEPT_REGULATIONS);
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
      setErrors([...errors, errorMessages.USER_ALREADY_EXISTS]);
    }
  };

  return (
    <>
      {loading && <FSpinner />}
      <View>
        <FInput
          placeholder={locales.EMAIL}
          value={dataForm.email}
          icon={icons.MAIL_OUTLINE}
          iconPlacement={placements.LEFT}
          onChangeText={emailInputHandler}
          type={inputTypes.EMAIL}
          width={sizes.WIDTH_FULL}
          errorMessage={filterErrorMessages(errors, errorMessages.INVALID_EMAIL)
              || filterErrorMessages(errors, errorMessages.USER_ALREADY_EXISTS)}
        />
        <FInput
          placeholder={locales.NAME}
          value={dataForm.name}
          icon={icons.PERSON_OUTLINE}
          iconPlacement={placements.LEFT}
          onChangeText={nameInputHandler}
          type={inputTypes.TEXT}
          width={sizes.WIDTH_FULL}
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
          width={sizes.WIDTH_FULL}
          errorMessage={filterErrorMessages(errors, errorMessages.PASSWORD_MUST_BE_LONGER_OR_EQUAL_TO_6)}
        />
      </View>
      <View>
        <View style={styles.regulationsContainer}>
          <FCheckbox
            style={styles.checkbox}
            iconColor={colors.WHITE}
            checkboxColor={colors.GREEN}
            setValue={setAcceptRegulations}
            value={acceptRegulations}
          />
          <FHeading
            title={locales.ACCEPT_REGULATIONS}
            size={fonts.HEADING_EXTRA_SMALL}
            weight={fonts.HEADING_WEIGHT_MEDIUM}
            color={colors.DARK_GREEN}
          />
        </View>
        <View style={styles.regulationsErrorMessageContainer}>
          <FHeading
            title={filterErrorMessages(errors, errorMessages.YOU_HAVE_TO_ACCEPT_REGULATIONS)}
            color={colors.RED}
            size={fonts.HEADING_EXTRA_SMALL}
          />
        </View>
      </View>
      <View style={styles.buttonsContainer}>
        <FButton
          backgroundColor={colors.GREEN}
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
  checkbox: {
    marginRight: sizes.MARGIN_10,
  },
});
