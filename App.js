import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Constants from 'expo-constants';
import { FRegistrationForm } from 'components/Forms/FRegistrationForm';
import storybook from './storybook';

const App = () => (
  <View style={styles.container}>
    <FRegistrationForm />
  </View>

);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Constants.manifest.extra.storybookMode ? storybook : App;
