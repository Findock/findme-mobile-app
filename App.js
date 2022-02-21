import Constants from 'expo-constants';
import { Navigation } from 'navigation/Navigation';
import { Provider } from 'react-redux';
import store from 'store/store';

import storybook from './storybook';

const App = () => (
  <Provider store={store}>
    <Navigation />
  </Provider>
);

export default Constants.manifest.extra.storybookMode ? storybook : App;
