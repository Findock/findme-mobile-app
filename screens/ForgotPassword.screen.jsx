import React from 'react';
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

export const ForgotPasswordScreen = () => (
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
          name={icons.LOCK_CLOSED_OUTLINE}
          size={sizes.ICON_100}
          color={colors.PRIMARY}
        />
      </View>
      <FHeading
        title={locales.FORGOT_YOUR_PASSWORD}
        color={colors.PRIMARY}
        align={placements.CENTER}
        size={fonts.HEADING_EXTRA_LARGE}
        weight={fonts.HEADING_WEIGHT_SEMIBOLD}
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
      />
      <View style={styles.buttonContainer}>
        <FButton
          title={locales.RESET_PASSWORD}
          type={buttonTypes.TEXT_BUTTON}
          backgroundColor={colors.PRIMARY}
          color={colors.WHITE}
          titleWeight={fonts.HEADING_WEIGHT_BOLD}
          titleSize={fonts.HEADING_MEDIUM}
        />
      </View>
    </View>
  </FDefaultLayout>
);

const styles = {
  imageContainer: {
    width: sizes.WIDTH_FULL,
    alignItems: placements.CENTER,
    marginVertical: sizes.MARGIN_10,
  },
  buttonContainer: {
    alignItems: placements.CENTER,
    marginVertical: sizes.MARGIN_20,
  },
  marginTop: {
    marginTop: sizes.MARGIN_10,
  },
};
