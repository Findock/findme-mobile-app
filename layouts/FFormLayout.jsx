import { FContainer } from 'layouts/components/FContainer';
import { FKeyboardWrapper } from 'layouts/components/FKeyboardWrapper';
import React from 'react';
import PropTypes from 'prop-types';

export const FFormLayout = ({
  children,
  scrollRef,
}) => (
  <FKeyboardWrapper scrollRef={scrollRef}>
    <FContainer>
      {children}
    </FContainer>
  </FKeyboardWrapper>
);

FKeyboardWrapper.propTypes = {
  scrollRef: PropTypes.objectOf(PropTypes.any),
};
