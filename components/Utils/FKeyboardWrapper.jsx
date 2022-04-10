import {
  Keyboard, TouchableWithoutFeedback,
} from 'react-native';
import React from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export const FKeyboardWrapper = ({ children, scrollRef }) => (
  <KeyboardAwareScrollView
    ref={scrollRef}
    enableOnAndroid={false}
  >
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      {children}
    </TouchableWithoutFeedback>
  </KeyboardAwareScrollView>
);
