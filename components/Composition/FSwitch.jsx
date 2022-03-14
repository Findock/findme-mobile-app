import React, { useState } from 'react';
import { View, Switch } from 'react-native';
import colors from 'themes/colors';

const FSwitch = () => {
  const [
    isEnabled,
    setIsEnabled,
  ] = useState(false);

  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  return (
    <View>
      <Switch
        trackColor={{
          false: colors.GREEN,
          true: colors.GRAY,
        }}
        onValueChange={toggleSwitch}
        thumbColor={colors.WHITE}
        value={isEnabled}
        ios_backgroundColor={colors.GREEN}
      />
    </View>
  );
};

export default FSwitch;
