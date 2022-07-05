import React from 'react';
import { ScrollView } from 'react-native';
import colors from 'themes/colors';
import PropTypes from 'prop-types';
import { FContainer } from 'layouts/components/FContainer';
import sizes from 'themes/sizes';

export const FDefaultLayout = ({
  children,
  scrollRef,
}) => (
  <ScrollView
    style={{
      backgroundColor: colors.WHITE,
      marginTop: sizes.MARGIN_1,
    }}
    ref={scrollRef}
  >
    <FContainer>
      {children}
    </FContainer>
  </ScrollView>

);

FDefaultLayout.propTypes = {
  scrollRef: PropTypes.objectOf(PropTypes.any),
};
