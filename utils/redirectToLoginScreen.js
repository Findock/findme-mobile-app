import { removeToken } from 'store/auth/authSlice';
import * as SecureStore from 'expo-secure-store';
import stackNavigatorNames from 'constants/stackNavigatorNames';

export const redirectToLoginScreen = async (dispatch, navigation, navigationParams) => {
  await SecureStore.deleteItemAsync('Authorization');
  await dispatch(removeToken());
  navigation.navigate(stackNavigatorNames.LOGIN, navigationParams);
};
