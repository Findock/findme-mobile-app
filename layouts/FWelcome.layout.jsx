import { FHeading } from 'components/Composition/FHeading';
import { FImage } from 'components/Composition/FImage';
import { FLogo } from 'components/Composition/FLogo';
import { View, StyleSheet } from 'react-native';
import colors from 'themes/colors';
import fonts from 'themes/fonts';
import placements from 'themes/placements';
import sizes from 'themes/sizes';

export const FWelcomeLayout = ({
  imagePath, headingTitle, imageHeight, imageWidth, children,
}) => (
  <View>
    <View style={styles.logoContainer}>
      <FLogo
        fill={false}
        color={colors.GREEN}
      />
    </View>
    <View>
      <FImage
        imagePath={imagePath}
        height={imageHeight}
        width={imageWidth}
      />
    </View>
    <View style={{ marginVertical: sizes.MARGIN_20 }}>
      <FHeading
        title={headingTitle}
        color={colors.DARK_GREEN}
        align={placements.CENTER}
        size={fonts.HEADING_EXTRA_LARGE}
        weight={fonts.HEADING_WEIGHT_MEDIUM}
      />
    </View>
    <View>
      {children}
    </View>
  </View>
);

const styles = StyleSheet.create({
  logoContainer: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    marginBottom: sizes.MARGIN_50,
    width: sizes.WIDTH_FULL,
  },
});