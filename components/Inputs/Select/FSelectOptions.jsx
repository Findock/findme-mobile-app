import React from 'react';
import { FSpinner } from 'components/Composition/FSpinner';
import {
  FlatList, View,
} from 'react-native';
import sizes from 'themes/sizes';
import PropTypes from 'prop-types';
import { FSelectOption } from 'components/Inputs/Select/FSelectOption';
import { useDispatch } from 'react-redux';
import { setSelectedOption } from 'store/select/selectSlice';
import { useNavigation } from '@react-navigation/native';

export const FSelectOptions = ({
  options,
}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const drawOptions = ({ item }) => (
    <FSelectOption
      key={item.id}
      label={item.label}
      selectOption={() => {
        dispatch(setSelectedOption({
          id: item.id,
          label: item.label,
        }));
        navigation.goBack();
      }}
    />
  );

  if (!options) return <FSpinner />;
  return (
    <View>
      <FlatList
        scrollEnabled
        data={options}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={1}
        renderItem={drawOptions}
        contentContainerStyle={{
          paddingBottom: sizes.PADDING_200,
        }}
      />
    </View>
  );
};

FSelectOptions.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
  })).isRequired,
};