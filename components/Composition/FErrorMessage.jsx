import { FHeading } from 'components/Composition/FHeading';
import React from 'react';
import colors from 'themes/colors';
import fonts from 'themes/fonts';
import PropTypes from 'prop-types';

export const FErrorMessage = ({ error, style }) => (
  <FHeading
    title={error}
    color={colors.DANGER}
    size={fonts.HEADING_EXTRA_SMALL}
    weight={fonts.HEADING_WEIGHT_MEDIUM}
    style={style}
  />
);

FErrorMessage.propTypes = {
  error: PropTypes.string.isRequired,
};
