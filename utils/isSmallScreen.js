import { Dimensions } from 'react-native';

export const isSmallScreen = () => Dimensions.get('window').height < 700;
