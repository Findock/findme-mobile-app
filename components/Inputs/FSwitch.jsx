import React from 'react';
import { View, Switch } from 'react-native';
import colors from 'themes/colors';

export const FSwitch = ({
  isDisabled, value, onValueChange, disabledColor = colors.DARK_GRAY,
}) => {
  const toggleSwitch = () => onValueChange((previousState) => !previousState);

  return (
    <View>
      <Switch
        trackColor={{
          false: disabledColor,
          true: colors.SUCCESS,
        }}
        onValueChange={toggleSwitch}
        thumbColor={colors.WHITE}
        value={value}
        ios_backgroundColor={colors.LIGHT_GRAY}
        disabled={isDisabled}
      />
    </View>
  );
};
