import { FHeading } from 'components/Composition/FHeading';
import locales from 'constants/locales';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import colors from 'themes/colors';
import fonts from 'themes/fonts';
import placements from 'themes/placements';
import sizes from 'themes/sizes';

export const FLoginHistoryListItem = ({
  deviceName, location, isActiveSession, date,
}) => (
  <View style={styles.container}>
    <FHeading
      title={deviceName}
      color={colors.BLACK}
      size={fonts.HEADING_NORMAL}
      weight={fonts.HEADING_WEIGHT_BOLD}
      align={placements.LEFT}
    />
    <View style={styles.bottomBox}>
      <View style={styles.bottomBoxInner}>
        <FHeading
          title={isActiveSession ? locales.ACTIVE_SESSION : date}
          color={isActiveSession ? colors.GREEN : colors.DARK_GRAY}
          size={fonts.HEADING_NORMAL}
          weight={fonts.HEADING_WEIGHT_MEDIUM}
          align={placements.LEFT}
        />
      </View>
      <View style={styles.bottomBoxInner}>
        <FHeading
          title={location}
          color={colors.DARK_GRAY}
          size={fonts.HEADING_NORMAL}
          weight={fonts.HEADING_WEIGHT_MEDIUM}
          align={placements.RIGHT}
        />
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: sizes.WIDTH_FULL,
  },
  bottomBox: {
    flexDirection: 'row',
    marginTop: sizes.MARGIN_5,
    justifyContent: 'space-between',
    alignItems: placements.CENTER,
  },
  bottomBoxInner: {
    width: sizes.WIDTH_HALF,
  },
});
