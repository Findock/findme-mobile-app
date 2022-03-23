import React from 'react';
import { View, Switch } from 'react-native';
import colors from 'themes/colors';

export const FSwitch = ({
  isDisabled, value, onValueChange,
}) => {
  const toggleSwitch = () => onValueChange((previousState) => !previousState);

  return (
    <View>
      <Switch
        trackColor={{
          false: colors.DARK_GRAY,
          true: colors.SUCCESS,
        }}
        onValueChange={toggleSwitch}
        thumbColor={colors.WHITE}
        value={value}
        ios_backgroundColor={colors.DARK_GRAY}
        disabled={isDisabled}
      />
    </View>
  );
};
