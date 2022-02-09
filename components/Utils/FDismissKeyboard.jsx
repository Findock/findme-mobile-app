import { Keyboard, TouchableWithoutFeedback } from 'react-native';

export const FDismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback
    onPress={Keyboard.dismiss}
  >
    {children}
  </TouchableWithoutFeedback>
);
