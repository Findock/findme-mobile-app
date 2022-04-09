import { FBadge } from 'components/Composition/FBadge';
import { FInput } from 'components/Inputs/FInput';
import inputTypes from 'constants/components/inputs/inputTypes';
import placeholders from 'constants/components/inputs/placeholders';
import React from 'react';
import { View, Keyboard, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import colors from 'themes/colors';
import sizes from 'themes/sizes';
import { useNavigation } from '@react-navigation/native';
import stackNavigatorNames from 'constants/stackNavigatorNames';
import PropTypes from 'prop-types';

export const FMultiSelectInputWithSelectedOptions = ({ options, style }) => {
  const selectedOptions = useSelector((state) => state.selectedOptions.selectedOptions);
  const navigation = useNavigation();

  const drawSelectedOptions = () => selectedOptions && selectedOptions.map((selectedOption) => (
    <FBadge
      isFill
      key={selectedOption.namePl}
      color={colors.PRIMARY}
      title={selectedOption.namePl}
      style={{
        paddingVertical: sizes.PADDING_10,
        marginRight: sizes.MARGIN_10,
        marginBottom: sizes.MARGIN_10,
      }}
    />
  ));

  return (
    <View style={{ ...style }}>
      <View style={styles.selectedOptionsContainer}>
        {drawSelectedOptions()}
      </View>
      <FInput
        type={inputTypes.TEXT}
        width={sizes.WIDTH_FULL}
        placeholder={placeholders.SEARCH}
        marginBottom={0}
        showSoftInputOnFocus={false}
        caretHidden
        onPress={() => {
          Keyboard.dismiss();
          navigation.push(stackNavigatorNames.MULTI_SELECT, {
            options,
          });
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  selectedOptionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

FMultiSelectInputWithSelectedOptions.propTypes = {
  options: PropTypes.shape({
    key: PropTypes.number.isRequired,
    namePl: PropTypes.string.isRequired,
  }).isRequired,
};
