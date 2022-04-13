import { Dimensions } from 'react-native';

export const coordsDelta = {
  latitudeDelta: 0.00022,
  longitudeDelta: (Dimensions.get('window').width / Dimensions.get('window').height) * 0.00250,
};

const warsawCoords = {
  latitude: 52.224665768,
  longitude: 21.006499974,
};

export const initialCoordinates = {
  ...coordsDelta,
  ...warsawCoords,
};
