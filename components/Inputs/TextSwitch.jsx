import React from 'react';
import SwitchSelector from 'react-native-switch-selector';
import colors from 'themes/colors';
import locales from 'constants/locales';
import fonts from 'themes/fonts';

export const TextSwitch = ({ setDataForm, dataForm }) => (
  <SwitchSelector
    initial={0}
    onPress={(value) => setDataForm({
      ...dataForm,
      switchValue: value,
    })}
    textColor={colors.BLACK}
    selectedColor={colors.WHITE}
    buttonColor={colors.PRIMARY}
    borderColor={colors.PRIMARY}
    backgroundColor={colors.WHITE}
    textStyle={{ fontWeight: fonts.HEADING_WEIGHT_SEMIBOLD }}
    selectedTextStyle={{ fontWeight: fonts.HEADING_WEIGHT_SEMIBOLD }}
    borderWidth={2}
    valuePadding={0}
    hasPadding
    options={[
      {
        label: locales.FOUND,
        value: 0,
      },
      {
        label: locales.LOST,
        value: 1,
      },
    ]}
  />
);
