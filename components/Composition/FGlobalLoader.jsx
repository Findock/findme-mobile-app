import { FLogo } from 'components/Composition/FLogo';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import colors from 'themes/colors';
import placements from 'themes/placements';

export const FGlobalLoader = () => (
  <View style={styles.screen}>
    <FLogo
      color={colors.GREEN}
      fill={false}
    />
  </View>
);

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: placements.CENTER,
    justifyContent: placements.CENTER,
    zIndex: 10,
  },
});
