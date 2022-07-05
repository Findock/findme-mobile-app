import React from 'react';
import PropTypes from 'prop-types';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import colors from 'themes/colors';
import sizes from 'themes/sizes';

export const FKeyboardWrapper = ({
  children,
  scrollRef,
}) => (
  <KeyboardAwareScrollView
    style={{
      backgroundColor: colors.WHITE,
      marginTop: sizes.MARGIN_1,
    }}
    ref={scrollRef}
  >
    {children}
  </KeyboardAwareScrollView>
);

FKeyboardWrapper.propTypes = {
  scrollRef: PropTypes.objectOf(PropTypes.any),
};
