import { FHeading } from 'components/Composition/FHeading';
import { FStatus } from 'components/Composition/FStatus';
import locales from 'constants/locales';
import statusTypes from 'constants/statusTypes';
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
    <View style={styles.topBox}>
      <View>
        <FHeading
          title={deviceName}
          color={colors.BLACK}
          size={fonts.HEADING_NORMAL}
          weight={fonts.HEADING_WEIGHT_BOLD}
          align={placements.LEFT}
        />
      </View>
      {isActiveSession && (
        <FStatus
          status={statusTypes.ACTIVE}
          style={styles.status}
        />
      )}
    </View>
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
    justifyContent: placements.CENTER,
    marginTop: sizes.MARGIN_30,
  },
  topBox: {
    flexDirection: 'row',
    alignItems: placements.CENTER,
  },
  status: {
    marginLeft: sizes.MARGIN_10,
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
