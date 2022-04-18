import { FButton } from 'components/Buttons/FButton';
import buttonTypes from 'constants/components/buttonTypes';
import locales from 'constants/locales';
import React from 'react';
import colors from 'themes/colors';
import fonts from 'themes/fonts';
import { View, StyleSheet } from 'react-native';
import { FSettingsRow } from 'components/Scoped/Settings/FSettingsRow';
import { FHeading } from 'components/Composition/FHeading';
import sizes from 'themes/sizes';
import placements from 'themes/placements';
import { useLocationPermission } from 'hooks/permissions/useLocationPermission';
import { useCameraPermission } from 'hooks/permissions/useCameraPermission';
import { useCameraRollPermission } from 'hooks/permissions/useCameraRollPermission';
import stackNavigatorNames from 'constants/stackNavigatorNames';
import PropTypes from 'prop-types';
import { FDefaultLayout } from 'layouts/FDefault.layout';

export const FSettingsScreen = ({ me, setIsForm, scrollRef }) => {
  const { handleChangeLocationPermission, granted: locationStatus } = useLocationPermission();
  const { handleChangeCameraPermission, granted: cameraStatus } = useCameraPermission();
  const { handleChangeCameraRollPermission, granted: cameraRollStatus } = useCameraRollPermission();

  return (
    <FDefaultLayout scrollRef={scrollRef}>
      <View>
        <FHeading
          title={locales.GENERAL_SETTINGS}
          color={colors.PRIMARY}
          size={fonts.HEADING_LARGE}
          weight={fonts.HEADING_WEIGHT_SEMIBOLD}
          align={placements.LEFT}
        />
        <FSettingsRow
          isForm={false}
          withSwitch
          label={locales.LOCALIZATION_SERVICE}
          value={locationStatus ? locales.TURN_ON : locales.TURN_OFF}
          style={styles.headerSpace}
          onSwitchValueChange={handleChangeLocationPermission}
          switchValue={locationStatus}
          isDisabled={false}
        />
        <FSettingsRow
          isForm={false}
          withSwitch
          label={locales.CAMERA_PERMISSION}
          value={cameraStatus ? locales.TURN_ON : locales.TURN_OFF}
          style={styles.headerSpace}
          onSwitchValueChange={handleChangeCameraPermission}
          switchValue={cameraStatus}
          isDisabled={false}
        />
        <FSettingsRow
          isForm={false}
          withSwitch
          label={locales.CAMERA_ROLL_PERMISSION}
          value={cameraRollStatus ? locales.TURN_ON : locales.TURN_OFF}
          style={styles.headerSpace}
          onSwitchValueChange={handleChangeCameraRollPermission}
          switchValue={cameraRollStatus}
          isDisabled={false}

        />
        <View style={styles.buttonContainer}>
          <FButton
            title={locales.CHANGE_PASSWORD}
            titleWeight={fonts.HEADING_WEIGHT_BOLD}
            titleSize={fonts.HEADING_NORMAL}
            type={buttonTypes.LINK_BUTTON}
            to={stackNavigatorNames.PASSWORD_CHANGE}
            isUnderline
          />
        </View>
      </View>
      <View style={{ marginTop: sizes.MARGIN_50 }}>
        <FHeading
          title={locales.ACCOUNT_SETTINGS}
          color={colors.PRIMARY}
          size={fonts.HEADING_LARGE}
          weight={fonts.HEADING_WEIGHT_SEMIBOLD}
          align={placements.LEFT}
        />
        <FSettingsRow
          isForm={false}
          withSwitch={false}
          label={locales.NAME}
          value={me.name}
          style={styles.headerSpace}
        />
        <FSettingsRow
          isForm={false}
          withSwitch={false}
          label={locales.PHONE}
          value={me.phoneNumber}
          style={styles.settingRowSpace}
        />
        <FSettingsRow
          isForm={false}
          withSwitch={false}
          label={locales.STREET}
          value={!me.street ? locales.NO_INFORMATION : me.street}
          style={styles.settingRowSpace}
        />
        <FSettingsRow
          isForm={false}
          withSwitch={false}
          label={locales.CITY}
          value={!me.city ? locales.NO_INFORMATION : me.city}
          style={styles.settingRowSpace}
        />
        <FSettingsRow
          isForm={false}
          withSwitch={false}
          label={locales.BIO}
          value={!me.bio ? locales.NONE : me.bio}
          style={styles.settingRowSpace}
        />
      </View>
      <View style={styles.buttonContainer}>
        <FButton
          title={locales.EDIT}
          type={buttonTypes.OUTLINE_TEXT_BUTTON}
          color={colors.PRIMARY}
          titleWeight={fonts.HEADING_WEIGHT_BOLD}
          titleSize={fonts.HEADING_MEDIUM}
          onPress={() => setIsForm(true)}
        />
      </View>
    </FDefaultLayout>
  );
};

const styles = StyleSheet.create({
  headerSpace: {
    marginTop: sizes.MARGIN_25,
  },
  settingRowSpace: {
    marginTop: sizes.MARGIN_20,
  },
  buttonContainer: {
    marginTop: sizes.MARGIN_30,
    alignItems: 'flex-start',
    width: sizes.WIDTH_FULL,
  },
});

FSettingsScreen.propTypes = {
  me: PropTypes.objectOf(PropTypes.any),
  setIsForm: PropTypes.func.isRequired,
  scrollRef: PropTypes.objectOf(PropTypes.any),
};
