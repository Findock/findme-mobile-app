import { FBadge } from 'components/Composition/FBadge';
import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import colors from 'themes/colors';
import sizes from 'themes/sizes';

export const FBadgeSelectInput = ({
  value, setValue, badgeStyle, containerStyle, title,
}) => (
  <TouchableOpacity
    onPress={setValue}
    style={{
      ...containerStyle,
      ...styles.container,
    }}
  >
    <FBadge
      style={{
        ...badgeStyle,
        ...styles.badge,
      }}
      isFill={value}
      color={colors.PRIMARY}
      title={title}
    />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    paddingRight: sizes.PADDING_5,
  },
  badge: {
    paddingVertical: sizes.PADDING_10,
  },
});

FBadgeSelectInput.propTypes = {
  value: PropTypes.bool.isRequired,
  setValue: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};
