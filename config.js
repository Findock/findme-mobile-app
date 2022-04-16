import Constants from 'expo-constants';

export default {
  backendUrl: `http://${Constants.manifest.debuggerHost.split(':').shift()}:3005/`,
};
