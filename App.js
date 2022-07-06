import Constants from 'expo-constants';
import { Navigation } from 'navigation/Navigation';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { SafeAreaView, StatusBar } from 'react-native';
import store from 'store/store';
import storybook from './storybook';

const App = () => (
  <GestureHandlerRootView style={{ flex: 1 }}>
    <Provider store={store}>
      <SafeAreaView>
        <StatusBar
          barStyle="dark-content"
        />
      </SafeAreaView>
      <Navigation />
    </Provider>
  </GestureHandlerRootView>
);

export default Constants.manifest.extra.storybookMode ? storybook : App;
