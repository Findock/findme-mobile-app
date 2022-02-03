import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import storybook from './storybook';
import Constants from 'expo-constants';

const App = () => {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


export default Constants.manifest.extra.storybookMode ? storybook : App;

