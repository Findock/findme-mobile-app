import { FLoginForm } from 'components/Forms/FLoginForm';
import images from 'constants/images';
import locales from 'constants/locales';
import { FWelcomeLayout } from 'layouts/FWelcome.layout';
import React from 'react';
import { Dimensions } from 'react-native';
import sizes from 'themes/sizes';

export const LoginScreen = ({ navigation }) => (
  <FWelcomeLayout
    headingTitle={locales.LOGIN}
    imagePath={images.LOGIN()}
    imageHeight={Dimensions.get('window').height * 0.25}
    imageWidth={sizes.WIDTH_FULL}
  >
    <FLoginForm navigation={navigation} />
  </FWelcomeLayout>
);
