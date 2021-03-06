import { FButton } from 'components/Buttons/FButton';
import buttonTypes from 'constants/components/buttonTypes';
import locales from 'constants/locales';
import React, { useState } from 'react';
import colors from 'themes/colors';
import fonts from 'themes/fonts';
import { StyleSheet, View } from 'react-native';
import { FSettingsRow } from 'components/Scoped/Settings/FSettingsRow';
import { FHeading } from 'components/Composition/FHeading';
import sizes from 'themes/sizes';
import placements from 'themes/placements';
import { filterErrorMessages } from 'utils/filterErrorMessages';
import { FSpinner } from 'components/Composition/FSpinner';
import { useDispatch } from 'react-redux';
import { setMe } from 'store/me/meSlice';
import { redirectToLoginScreen } from 'utils/redirectToLoginScreen';
import { useNavigation } from '@react-navigation/native';
import { useErrorModal } from 'hooks/modals/useErrorModal';
import { updateUserService } from 'services/user/updateUser.service';
import { deleteAccountService } from 'services/user/deleteAccount.service';
import { getMeService } from 'services/user/getMe.service';
import PropTypes from 'prop-types';
import userMessages from 'constants/components/inputs/errorMessages/userMessages';
import { FFormLayout } from 'layouts/FFormLayout';
import modalsMessages from 'constants/components/modals/modalsMessages';
import { useConfirmationModal } from 'hooks/modals/useConfirmationModal';

export const FSettingsFormScreen = ({
  me,
  setIsForm,
  scrollRef,
}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [
    dataForm,
    setDataForm,
  ] = useState({
    name: me.name,
    phoneNumber: me.phoneNumber,
    street: me.street,
    city: me.city,
    bio: me.bio,
  });
  const [
    loading,
    setLoading,
  ] = useState(false);
  const [
    errors,
    setErrors,
  ] = useState([]);

  const {
    setShowErrorModal,
    drawErrorModal,
  } = useErrorModal();

  const nameInputHandler = (newName) => {
    setDataForm({
      ...dataForm,
      name: newName,
    });
  };
  const streetInputHandler = (newStreet) => {
    setDataForm({
      ...dataForm,
      street: newStreet,
    });
  };
  const phoneInputHandler = (newPhone) => {
    setDataForm({
      ...dataForm,
      phoneNumber: newPhone,
    });
  };
  const cityInputHandler = (newCity) => {
    setDataForm({
      ...dataForm,
      city: newCity,
    });
  };
  const bioInputHandler = (newBio) => {
    setDataForm({
      ...dataForm,
      bio: newBio,
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
        .includes('phone')) {
        errs.push(userMessages.INVALID_PHONE_NUMBER);
      }
    }
    setErrors([...errs]);
  };

  const fetchMe = async () => {
    const res = await getMeService();
    dispatch(setMe(res.data));
  };

  const onUpdateUserProfile = async () => {
    try {
      setLoading(true);
      await updateUserService(dataForm);
      await fetchMe();
      setErrors([]);
      setIsForm(false);
    } catch (error) {
      if (error.response && error.response.data) {
        checkFormValidation(error.response.data);
        setLoading(false);
      }
    }
  };

  const onDeleteAccount = async () => {
    try {
      await deleteAccountService();
      redirectToLoginScreen(dispatch, navigation, {
        showDeleteAccountModal: true,
      });
    } catch (error) {
      setShowErrorModal(true);
    }
  };

  const {
    setShowConfirmationModal,
    drawConfirmationModal,
  } = useConfirmationModal(modalsMessages.DELETE_USER_ACCOUNT_CONFIRMATION, onDeleteAccount);

  return (
    <FFormLayout scrollRef={scrollRef}>
      {loading && <FSpinner />}
      {drawConfirmationModal()}
      {drawErrorModal()}
      <View />
      <FHeading
        title={locales.ACCOUNT_SETTINGS}
        color={colors.PRIMARY}
        size={fonts.HEADING_LARGE}
        weight={fonts.HEADING_WEIGHT_SEMIBOLD}
        align={placements.LEFT}
      />
      <FSettingsRow
        isForm
        withSwitch={false}
        label={locales.NAME}
        value={dataForm.name}
        style={styles.headerSpace}
        onChangeText={nameInputHandler}
      />
      <FSettingsRow
        isForm
        withSwitch={false}
        label={locales.PHONE}
        value={dataForm.phoneNumber}
        style={styles.settingRowSpace}
        onChangeText={phoneInputHandler}
        isPhoneInput
        errorMessage={filterErrorMessages(errors, userMessages.INVALID_PHONE_NUMBER)}
      />
      <FSettingsRow
        isForm
        withSwitch={false}
        label={locales.STREET}
        value={dataForm.street}
        style={styles.settingRowSpace}
        onChangeText={streetInputHandler}
      />
      <FSettingsRow
        isForm
        withSwitch={false}
        label={locales.CITY}
        value={dataForm.city}
        style={styles.settingRowSpace}
        onChangeText={cityInputHandler}
      />
      <FSettingsRow
        isForm
        withSwitch={false}
        label={locales.BIO}
        value={dataForm.bio}
        style={styles.settingRowSpace}
        onChangeText={bioInputHandler}
        maxLength={100}
        isTextarea
        numberOfLines={3}
      />
      <View style={{ marginTop: sizes.MARGIN_30 }}>
        <FButton
          title={locales.DELETE_ACCOUNT}
          type={buttonTypes.OUTLINE_TEXT_BUTTON}
          color={colors.DANGER}
          titleWeight={fonts.HEADING_WEIGHT_BOLD}
          titleSize={fonts.HEADING_MEDIUM}
          onPress={() => setShowConfirmationModal(true)}
        />
      </View>
      <View style={styles.buttonsContainer}>
        <FButton
          title={locales.CANCEL}
          type={buttonTypes.OUTLINE_TEXT_BUTTON}
          color={colors.PRIMARY}
          titleWeight={fonts.HEADING_WEIGHT_BOLD}
          titleSize={fonts.HEADING_MEDIUM}
          onPress={() => setIsForm(false)}
        />
        <FButton
          title={locales.SAVE}
          type={buttonTypes.TEXT_BUTTON}
          color={colors.WHITE}
          backgroundColor={colors.PRIMARY}
          titleWeight={fonts.HEADING_WEIGHT_BOLD}
          titleSize={fonts.HEADING_MEDIUM}
          onPress={() => onUpdateUserProfile()}
        />
      </View>
    </FFormLayout>
  );
};

const styles = StyleSheet.create({
  headerSpace: {
    marginTop: sizes.MARGIN_25,
  },
  settingRowSpace: {
    marginTop: sizes.MARGIN_20,
  },
  buttonsContainer: {
    marginTop: sizes.MARGIN_30,
    width: sizes.WIDTH_FULL,
    justifyContent: 'space-between',
    alignItems: placements.CENTER,
    flexDirection: 'row',
  },
});

FSettingsFormScreen.propTypes = {
  me: PropTypes.objectOf(PropTypes.any),
  setIsForm: PropTypes.func.isRequired,
  scrollRef: PropTypes.objectOf(PropTypes.any),
};
