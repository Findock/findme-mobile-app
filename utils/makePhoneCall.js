import { Linking } from 'react-native';

export const makePhoneCall = (phoneNumber) => {
  Linking.openURL(`tel:${phoneNumber}`);
};
