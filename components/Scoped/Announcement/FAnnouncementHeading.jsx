import { FHeading } from 'components/Composition/FHeading';
import React from 'react';
import colors from 'themes/colors';
import fonts from 'themes/fonts';
import placements from 'themes/placements';
import sizes from 'themes/sizes';

export const FAnnouncementHeading = ({ title }) => (
  <FHeading
    title={title.toUpperCase()}
    color={colors.DARK_GRAY}
    weight={fonts.HEADING_WEIGHT_BOLD}
    size={fonts.HEADING_NORMAL}
    align={placements.LEFT}
    style={{ marginBottom: sizes.MARGIN_8 }}
  />
);
