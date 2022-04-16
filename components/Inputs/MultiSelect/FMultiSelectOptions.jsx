import { FSpinner } from 'components/Composition/FSpinner';
import { FInput } from 'components/Inputs/FInput';
import { FMultiSelectOption } from 'components/Inputs/MultiSelect/FMultiSelectOption';
import inputTypes from 'constants/components/inputs/inputTypes';
import React from 'react';
import {
  FlatList, View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedOptions } from 'store/multi-select/multiSelectSlice';
import sizes from 'themes/sizes';
import PropTypes from 'prop-types';
import placeholders from 'constants/components/inputs/placeholders';

export const FMultiSelectOptions = ({
  options, search, setSearch,
}) => {
  const dispatch = useDispatch();
  const selectedOptions = useSelector((state) => state.multiSelect.selectedOptions);

  const searchInputHandler = (newSerach) => {
    setSearch(newSerach);
  };
  const drawMultiSelectOptions = ({ item }) => (
    <FMultiSelectOption
      key={item.id}
      label={item.namePl}
      setValue={() => selectedOptionsHandler(item)}
      value={!!selectedOptions.find((selectedOption) => selectedOption.id === item.id)}
    />
  );
  const selectedOptionsHandler = (option) => {
    const existingOption = selectedOptions.find((o) => o.id === option.id);
    if (existingOption) {
      const newOptions = [...selectedOptions];
      newOptions.splice(selectedOptions.indexOf(existingOption), 1);
      dispatch(setSelectedOptions([...newOptions]));
    } else dispatch(setSelectedOptions([...selectedOptions, option]));
  };

  if (!options) return <FSpinner />;
  return (
    <View>
      <FInput
        placeholder={placeholders.SEARCH}
        type={inputTypes.TEXT}
        value={search}
        onChangeText={searchInputHandler}
        width={sizes.WIDTH_FULL}
      />
      <FlatList
        scrollEnabled
        data={options}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={1}
        renderItem={drawMultiSelectOptions}
        contentContainerStyle={{
          paddingBottom: sizes.PADDING_200,
        }}
        ItemSeparatorComponent={() => (
          <View style={{
            width: sizes.WIDTH_FULL,
            paddingTop: sizes.PADDING_14,
          }}
          />
        )}
      />
    </View>

  );
};

FMultiSelectOptions.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    namePl: PropTypes.string.isRequired,
  })).isRequired,
  search: PropTypes.string.isRequired,
  setSearch: PropTypes.func.isRequired,
};
