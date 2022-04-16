import {
  Keyboard, TouchableWithoutFeedback,
} from 'react-native';
import React from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import PropTypes from 'prop-types';

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

FKeyboardWrapper.propTypes = {
  scrollRef: PropTypes.objectOf(PropTypes.any),
};
