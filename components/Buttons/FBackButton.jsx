import { useNavigation } from '@react-navigation/native';
import { FButton } from 'components/Buttons/FButton';
import buttonTypes from 'constants/buttonTypes';
import locales from 'constants/locales';
import React from 'react';
import { Platform } from 'react-native';
import colors from 'themes/colors';
import fonts from 'themes/fonts';
import icons from 'themes/icons';
import placements from 'themes/placements';
import sizes from 'themes/sizes';

export const FBackButton = ({ navigateTo }) => {
  const navigation = useNavigation();
  return (
    <FButton
      type={buttonTypes.BUTTON_WITH_ICON_AND_TEXT}
      title={locales.GO_BACK}
      icon={Platform.OS === 'android' ? icons.ARROW_BACK : icons.CHEVRON_BACK_OUTLINE}
      iconSize={sizes.ICON_22}
      iconPlacement={placements.LEFT}
      titleSize={fonts.HEADING_MEDIUM}
      color={colors.BLACK}
      iconColor={colors.BLACK}
      onPress={() => navigation.navigate(navigateTo)}
    />
  );
};
