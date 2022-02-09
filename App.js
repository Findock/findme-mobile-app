import { StyleSheet, View } from 'react-native';
import Constants from 'expo-constants';
import { FWelcomeLayout } from 'layouts/FWelcome.layout';
import locales from 'constants/locales';
import images from 'constants/images';
import sizes from 'themes/sizes';
import storybook from './storybook';

const App = () => (
  <View style={styles.container}>
    <FWelcomeLayout
      headingTitle={locales.CREATE_ACCOUNT}
      imagePath={images.REGISTRATION()}
      imageHeight={sizes.HEIGHT_210}
      imageWidth={sizes.WIDTH_FULL}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: sizes.PADDING_30,
  },
});

export default Constants.manifest.extra.storybookMode ? storybook : App;
