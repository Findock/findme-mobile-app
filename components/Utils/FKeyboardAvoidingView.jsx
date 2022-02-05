import { KeyboardAvoidingView, Platform } from 'react-native';

export const FKeyboardAvoidingView = ({ children }) => (
  <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
    {children}
  </KeyboardAvoidingView>
);
