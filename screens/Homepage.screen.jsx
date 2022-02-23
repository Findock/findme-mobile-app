import { FHeading } from 'components/Composition/FHeading';
import { StyleSheet, View } from 'react-native';
import colors from 'themes/colors';
import fonts from 'themes/fonts';
import placements from 'themes/placements';

export const HomepageScreen = () => (
  <View style={styles.screen}>
    <FHeading
      title="Witaj"
      align={placements.CENTER}
      color={colors.DARK_GREEN}
      size={fonts.HEADING_EXTRA_LARGE}
      weight={fonts.HEADING_WEIGHT_BOLD}
    />
  </View>
);

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: placements.CENTER,
    alignItems: placements.CENTER,
  },
});
