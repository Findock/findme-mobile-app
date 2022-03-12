import { FRegistrationForm } from 'components/Forms/FRegistrationForm';
import images from 'constants/images';
import locales from 'constants/locales';
import { FWelcomeLayout } from 'layouts/FWelcome.layout';
import sizes from 'themes/sizes';
import React from 'react';
import { Dimensions } from 'react-native';

export const RegistrationScreen = () => (
  <FWelcomeLayout
    headingTitle={locales.CREATE_ACCOUNT}
    imagePath={images.REGISTRATION()}
    imageHeight={Dimensions.get('window').height * 0.25}
    imageWidth={sizes.WIDTH_FULL}
  >
    <FRegistrationForm />
  </FWelcomeLayout>
);
