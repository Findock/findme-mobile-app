import { Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';
import React from 'react';

export const FKeyboardWrapper = ({ children }) => (
  <KeyboardAvoidingView
    behavior="position"
    keyboardVerticalOffset={-150}
    contentContainerStyle={{
      flex: 1,
    }}
    style={{
      flex: 1,
    }}
  >
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      {children}
    </TouchableWithoutFeedback>
  </KeyboardAvoidingView>
);
