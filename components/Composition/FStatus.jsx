import statusTypes from 'constants/components/statusTypes';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import colors from 'themes/colors';
import sizes from 'themes/sizes';

export const FStatus = ({ status, style }) => {
  const getStatusBgColorByStatus = () => {
    switch (status) {
    case statusTypes.ACTIVE:
      return colors.SUCCESS;
    case statusTypes.NEW_MESSAGE:
      return colors.WARNING;
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
    width: sizes.WIDTH_15,
    height: sizes.HEIGHT_15,
    borderRadius: Math.ceil(sizes.RADIUS_15 / 2),
  },
});
