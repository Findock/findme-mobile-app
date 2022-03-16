import React from 'react';
import locales from 'constants/locales';
import colors from 'themes/colors';
import placements from 'themes/placements';
import fonts from 'themes/fonts';
import { FHeading } from 'components/Composition/FHeading';
import { FImage } from 'components/Composition/FImage';
import { FButton } from 'components/Buttons/FButton';
import buttonTypes from 'constants/buttonTypes';
import { FInput } from 'components/Inputs/FInput';
import inputTypes from 'constants/inputTypes';
import icons from 'themes/icons';
import images from 'constants/images';
import sizes from 'themes/sizes';
import { FDefaultLayout } from 'layouts/FDefault.layout';
import { View } from 'react-native';

export const ForgotPasswordScreen = () => (
  <FDefaultLayout style={style.container}>
    <FImage
      imagePath={images.RESET_PASSWORD_LOCK()}
      resizeMode={sizes.CONTAIN}
      height={sizes.HEIGHT_80}
      style={style.image}
    />

    <FHeading
      title={locales.FORGOT_YOUR_PASSWORD}
      color={colors.DARK_GREEN}
      align={placements.CENTER}
      size={fonts.HEADING_EXTRA_LARGE}
      weight={fonts.HEADING_WEIGHT_MEDIUM}
    />
    <FHeading
      title="Wprowadź email na który wyślemy wiadmość z linkiem do utworzenia nowego hasła."
      align={placements.CENTER}
      size={fonts.HEADING_SMALL}
      weight={fonts.HEADING_WEIGHT_REGULAR}
    />
    <View style={style.inputContainer}>
      <FInput
        iconPlacement={placements.LEFT}
        type={inputTypes.EMAIL}
        icon={icons.MAIL_OUTLINE}
        placeholder={locales.EMAIL}
      />
    </View>
    <View style={style.buttonContainer}>
      <FButton
        title={locales.RESET_PASSWORD}
        type={buttonTypes.TEXT_BUTTON}
        backgroundColor={colors.GREEN}
        color={colors.WHITE}
        titleWeight={fonts.HEADING_WEIGHT_BOLD}
        titleSize={fonts.HEADING_MEDIUM}
        buttonViewStyles={
          style.button
        }
      />
    </View>
  </FDefaultLayout>
);

const style = {
  image: {
    marginVertical: sizes.MARGIN_10,
  },
  inputContainer: {
    marginVertical: sizes.MARGIN_5,
  },
  button: {
    width: sizes.WIDTH_HALF,
  },
  buttonContainer: {
    width: sizes.WIDTH_FULL,
    alignItems: placements.CENTER,
  },

};
