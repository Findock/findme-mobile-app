import { FHeading } from 'components/Composition/FHeading';
import { FImage } from 'components/Composition/FImage';
import { FLogo } from 'components/Composition/FLogo';
import { FKeyboardWrapper } from 'components/Utils/FKeyboardWrapper';
import {
  View, StyleSheet,
  ScrollView, Dimensions, SafeAreaView, Platform,
} from 'react-native';
import colors from 'themes/colors';
import fonts from 'themes/fonts';
import placements from 'themes/placements';
import sizes from 'themes/sizes';
import React from 'react';
import PropTypes from 'prop-types';

export const FWelcomeLayout = ({
  imagePath, headingTitle, imageHeight, imageWidth, children,
}) => (
  <SafeAreaView style={{
    flex: 1,
    backgroundColor: colors.BODY,
  }}
  >
    <ScrollView
      scrollEnabled={Dimensions.get('window').height < 700}
      style={{
        backgroundColor: colors.BODY,
      }}
    >
      <FKeyboardWrapper>
        <View style={styles.container}>
          <View style={styles.logoContainer}>
            <FLogo
              fill={false}
              color={colors.PRIMARY}
            />
          </View>
          <View>
            <FImage
              imagePath={imagePath}
              height={imageHeight}
              width={imageWidth}
              resizeMode={sizes.CONTAIN}
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
      </FKeyboardWrapper>
    </ScrollView>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: sizes.PADDING_30,
    paddingVertical: Platform.OS === 'android' ? 30 : 0,
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
