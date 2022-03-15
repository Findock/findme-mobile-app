import React, { useState } from 'react';
import { View, Switch } from 'react-native';
import colors from 'themes/colors';

const FSwitch = ({ colorOn, isDisabled }) => {
  const [
    isEnabled,
    setIsEnabled,
  ] = useState(false);

  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  return (
    <View>
      <Switch
        trackColor={{
          false: colors.DARK_GRAY,
          true: colorOn,
        }}
        onValueChange={toggleSwitch}
        thumbColor={colors.WHITE}
        value={isEnabled}
        ios_backgroundColor={colors.DARK_GRAY}
        disabled={isDisabled}
      />
    </View>
  );
};

export default FSwitch;
