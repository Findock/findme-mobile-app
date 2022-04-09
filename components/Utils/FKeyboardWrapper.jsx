import {
  Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback, Platform,
} from 'react-native';
import React from 'react';

export const FKeyboardWrapper = ({ children }) => (
  <KeyboardAvoidingView
    behavior={Platform.OS === 'ios' ? 'position' : null}
    keyboardVerticalOffset={-50}
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
