import statusTypes from 'constants/components/statusTypes';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import colors from 'themes/colors';
import sizes from 'themes/sizes';
import PropTypes from 'prop-types';
import { getHalfBorderRadius } from 'styles/utils/getHalfBorderRadius';

export const FStatus = ({
  status,
  style,
}) => {
  const getStatusBgColorByStatus = () => {
    switch (status) {
    case statusTypes.ACTIVE:
      return colors.SUCCESS;
    default:
      return '';
    }
  };

  return (
    <View style={{
      ...styles.status,
      ...style,
      backgroundColor: getStatusBgColorByStatus(),
    }}
    />
  );
};
const styles = StyleSheet.create({
  status: {
    width: sizes.WIDTH_12,
    height: sizes.HEIGHT_12,
    borderRadius: getHalfBorderRadius(sizes.RADIUS_15),
  },
});

FStatus.propTypes = {
  status: PropTypes.oneOf(['new-message', 'active']).isRequired,
};
