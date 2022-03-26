import React from 'react';
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
import { View, StyleSheet, Platform } from 'react-native';
import { FImage } from 'components/Composition/FImage';
import images from 'constants/images';
import { FKeyboardWrapper } from '../components/Utils/FKeyboardWrapper';

export const ChangePasswordScreen = () => (
  <FDefaultLayout
    hasFlatList={false}
    withLogo={false}
  >
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
        />
        <FInput
          iconPlacement={placements.LEFT}
          type={inputTypes.PASSWORD}
          icon={icons.LOCK_CLOSED_OUTLINE}
          placeholder={locales.PASS_NEW_PASSWORD}
        />
        <FInput
          iconPlacement={placements.LEFT}
          type={inputTypes.PASSWORD}
          icon={icons.LOCK_CLOSED_OUTLINE}
          placeholder={locales.REPEAT_NEW_PASSWORD}
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
      </>
    </FKeyboardWrapper>
  </FDefaultLayout>
);

const styles = StyleSheet.create({
  imageContainer: {
    width: sizes.WIDTH_FULL,
    alignItems: placements.CENTER,
    marginVertical: Platform.OS === 'ios' ? sizes.MARGIN_30 : 0,
  },
  buttonContainer: {
    alignItems: placements.CENTER,
    marginVertical: sizes.MARGIN_20,
  },
});
