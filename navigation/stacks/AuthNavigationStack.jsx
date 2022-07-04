import { createNativeStackNavigator } from '@react-navigation/native-stack';
import stackNavigatorNames from 'constants/stackNavigatorNames';
import { RegistrationScreen } from 'screens/Registration.screen';
import { LoginScreen } from 'screens/Login.screen';
import { ForgotPasswordScreen } from 'screens/user/ForgotPassword.screen';
import defaultHeaderOptions from 'navigation/styles/defaultHeaderOptions';
import locales from 'constants/locales';

export const AuthNavigationStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      id="auth-stack-navigator"
      initialRouteName={stackNavigatorNames.LOGIN}
    >
      <Stack.Screen
        name={stackNavigatorNames.LOGIN}
        component={LoginScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={stackNavigatorNames.REGISTRATION}
        component={RegistrationScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={stackNavigatorNames.FORGOT_PASSWORD}
        component={ForgotPasswordScreen}
        options={{
          ...defaultHeaderOptions,
          title: locales.PASSWORD_RECOVERY,
        }}
      />
    </Stack.Navigator>
  );
};
