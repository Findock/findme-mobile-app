import { FSpinner } from 'components/Composition/FSpinner';
import { FInput } from 'components/Inputs/FInput';
import { FMultiSelectOption } from 'components/Inputs/MultiSelect/FMultiSelectOption';
import inputTypes from 'constants/components/inputs/inputTypes';
import locales from 'constants/locales';
import React, { useState } from 'react';
import { FlatList, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedOptions } from 'store/multi-select/multiSelectSlice';
import sizes from 'themes/sizes';
import PropTypes from 'prop-types';

export const FMultiSelectOptions = ({
  options,
}) => {
  const dispatch = useDispatch();
  const selectedOptions = useSelector((state) => state.selectedOptions.selectedOptions);
  const [
    search,
    setSearch,
  ] = useState('');

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
    <FlatList
      scrollEnabled
      data={options}
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={false}
      renderItem={drawMultiSelectOptions}
      stickyHeaderIndices={[1]}
      StickyHeaderComponent={(
        <View style={{
          // marginTop: sizes.MARGIN_10,
          marginTop: 50,

        }}
        >
          <FInput
            placeholder={locales.SEARCH}
            type={inputTypes.TEXT}
            value={search}
            onChangeText={searchInputHandler}
            width={sizes.WIDTH_FULL}
          />
        </View>
      )}
      ItemSeparatorComponent={() => (
        <View style={{
          width: sizes.WIDTH_FULL,
          paddingTop: sizes.PADDING_14,
        }}
        />
      )}
    />
  );
};

FMultiSelectOptions.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.number.isRequired,
    namePl: PropTypes.string.isRequired,
  })).isRequired,
};
