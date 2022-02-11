import Constants from 'expo-constants';
import { RegistrationScreen } from 'screens/Registration.screen';

import storybook from './storybook';

const App = () => (
  <RegistrationScreen />
);

export default Constants.manifest.extra.storybookMode ? storybook : App;
