import { FRegistrationForm } from 'components/Forms/FRegistrationForm';
import images from 'constants/images';
import locales from 'constants/locales';
import { FWelcomeLayout } from 'layouts/FWelcome.layout';
import sizes from 'themes/sizes';

export const RegistrationScreen = () => (
  <FWelcomeLayout
    headingTitle={locales.CREATE_ACCOUNT}
    imagePath={images.REGISTRATION()}
    imageHeight={sizes.HEIGHT_210}
    imageWidth={sizes.WIDTH_FULL}
  >
    <FRegistrationForm />
  </FWelcomeLayout>
);
