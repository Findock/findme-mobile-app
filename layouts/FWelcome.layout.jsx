import { FHeading } from 'components/Composition/FHeading';
import { FImage } from 'components/Composition/FImage';
import { FLogo } from 'components/Composition/FLogo';
import {
  View, StyleSheet,
  SafeAreaView,
} from 'react-native';
import colors from 'themes/colors';
import fonts from 'themes/fonts';
import placements from 'themes/placements';
import sizes from 'themes/sizes';
import React from 'react';
import PropTypes from 'prop-types';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export const FWelcomeLayout = ({
  imagePath, headingTitle, imageHeight, imageWidth, children,
}) => (
  <SafeAreaView style={{
    backgroundColor: colors.WHITE,
    flex: 1,
  }}
  >
    <KeyboardAwareScrollView style={{ backgroundColor: colors.WHITE }}>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <FLogo
            fill={false}
            color={colors.PRIMARY}
          />
        </View>
        <View>
          <FImage
            networkImageUrl=""
            imagePath={imagePath}
            height={imageHeight}
            width={imageWidth}
            imageHeight={sizes.HEIGHT_FULL}
            imageWidth={sizes.WIDTH_FULL}
            resizeMode={sizes.CONTAIN}
            isChildrenInside={false}
          />
        </View>
        <View style={{ marginVertical: sizes.MARGIN_20 }}>
          <FHeading
            title={headingTitle}
            color={colors.PRIMARY}
            align={placements.CENTER}
            size={fonts.HEADING_EXTRA_LARGE}
            weight={fonts.HEADING_WEIGHT_MEDIUM}
          />
        </View>
        <View>
          {children}
        </View>
      </View>
    </KeyboardAwareScrollView>
  </SafeAreaView>

);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: sizes.PADDING_30,
    paddingVertical: sizes.PADDING_30,
    flex: 1,
  },
  logoContainer: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    marginBottom: sizes.MARGIN_50,
    width: sizes.WIDTH_FULL,
  },
});

FWelcomeLayout.propTypes = {
  imagePath: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  headingTitle: PropTypes.string.isRequired,
  imageHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  imageWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};
