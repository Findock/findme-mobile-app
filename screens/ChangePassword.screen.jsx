import React from 'react';
import { FDefaultLayout } from 'layouts/FDefault.layout';
import icons from 'themes/icons';
import sizes from 'themes/sizes';
import colors from 'themes/colors';
import locales from 'constants/locales';
import placements from 'themes/placements';
import fonts from 'themes/fonts';
import { FHeading } from 'components/Composition/FHeading';
import inputTypes from 'constants/inputTypes';
import { FInput } from 'components/Inputs/FInput';
import buttonTypes from 'constants/buttonTypes';
import { FButton } from 'components/Buttons/FButton';
import { View } from 'react-native';
import { FImage } from 'components/Composition/FImage';
import images from 'constants/images';

export const ChangePasswordScreen = () => (
  <FDefaultLayout
    hasFlatList={false}
    withLogo={false}
  >
    <View style={styles.imageContainer}>
      <FImage
        imagePath={images.CHANGE_PASSWORD()}
        width={sizes.WIDTH_120}
        height={sizes.HEIGHT_120}
      />
    </View>
    <FHeading
      title={locales.PASS_OLD_PASSWORD}
      align={placements.LEFT}
      size={fonts.HEADING_NORMAL}
      weight={fonts.HEADING_WEIGHT_SEMIBOLD}
      color={colors.DARK_GRAY}
      marginBottom={sizes.MARGIN_20}
    />
    <FInput
      iconPlacement={placements.LEFT}
      type={inputTypes.PASSWORD}
      icon={icons.LOCK_CLOSED_OUTLINE}
      placeholder={locales.OLD_PASSWORD}
    />
    <FHeading
      title={locales.PASS_NEW_PASSWORD}
      align={placements.LEFT}
      size={fonts.HEADING_NORMAL}
      weight={fonts.HEADING_WEIGHT_SEMIBOLD}
      color={colors.DARK_GRAY}
      marginBottom={sizes.MARGIN_20}
    />
    <FInput
      iconPlacement={placements.LEFT}
      type={inputTypes.PASSWORD}
      icon={icons.LOCK_CLOSED_OUTLINE}
      placeholder={locales.NEW_PASSWORD}
    />
    <FHeading
      title={locales.REPEAT_NEW_PASSWORD}
      align={placements.LEFT}
      size={fonts.HEADING_NORMAL}
      weight={fonts.HEADING_WEIGHT_SEMIBOLD}
      color={colors.DARK_GRAY}
      marginBottom={sizes.MARGIN_20}
    />
    <FInput
      iconPlacement={placements.LEFT}
      type={inputTypes.PASSWORD}
      icon={icons.LOCK_CLOSED_OUTLINE}
      placeholder={locales.NEW_PASSWORD}
    />
    <View style={styles.buttonContainer}>
      <FButton
        title={locales.CHANGE_PASSWORD}
        type={buttonTypes.TEXT_BUTTON}
        backgroundColor={colors.DARK_PRIMARY}
        color={colors.WHITE}
        titleWeight={fonts.HEADING_WEIGHT_BOLD}
        titleSize={fonts.HEADING_MEDIUM}
      />
    </View>
  </FDefaultLayout>
);

const styles = {
  imageContainer: {
    width: sizes.WIDTH_FULL,
    alignItems: placements.CENTER,
    marginVertical: sizes.MARGIN_30,
  },
  buttonContainer: {
    alignItems: placements.CENTER,
    marginVertical: sizes.MARGIN_20,
  },
};
