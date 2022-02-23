import { FButton } from 'components/Buttons/FButton';
import { FHeading } from 'components/Composition/FHeading';
import buttonTypes from 'constants/buttonTypes';
import locales from 'constants/locales';
import { StyleSheet, View } from 'react-native';
import colors from 'themes/colors';
import fonts from 'themes/fonts';
import placements from 'themes/placements';
import sizes from 'themes/sizes';

export const HomepageScreen = () => (
  <View style={styles.screen}>
    <FHeading
      title="Witaj"
      align={placements.CENTER}
      color={colors.DARK_GREEN}
      size={fonts.HEADING_EXTRA_LARGE}
      weight={fonts.HEADING_WEIGHT_BOLD}
    />
    <View style={styles.buttonContainer}>
      <FButton
        title={locales.LOG_OUT}
        color={colors.WHITE}
        backgroundColor={colors.GREEN}
        type={buttonTypes.TEXT_BUTTON}
        titleSize={fonts.HEADING_NORMAL}
        titleWeight={fonts.HEADING_WEIGHT_MEDIUM}
      />
    </View>
  </View>
);

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: placements.CENTER,
    alignItems: placements.CENTER,
  },
  buttonContainer: {
    marginTop: sizes.MARGIN_30,
  },
});
