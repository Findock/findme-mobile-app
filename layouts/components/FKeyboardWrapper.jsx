import React from 'react';
import PropTypes from 'prop-types';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import colors from 'themes/colors';

export const FKeyboardWrapper = ({ children, scrollRef }) => (
  <KeyboardAwareScrollView
    style={{ backgroundColor: colors.WHITE }}
    ref={scrollRef}
  >
    {children}
  </KeyboardAwareScrollView>
);

FKeyboardWrapper.propTypes = {
  scrollRef: PropTypes.objectOf(PropTypes.any),
};
