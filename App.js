import Constants from 'expo-constants';
import { Navigation } from 'navigation/Navigation';

import storybook from './storybook';

const App = () => (
  <Navigation />
);

export default Constants.manifest.extra.storybookMode ? storybook : App;
