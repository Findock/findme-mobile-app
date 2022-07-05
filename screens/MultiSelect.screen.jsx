import { FMultiSelectOptions } from 'components/Inputs/MultiSelect/FMultiSelectOptions';
import React, { useEffect } from 'react';
import { View } from 'react-native';
import sizes from 'themes/sizes';
import colors from 'themes/colors';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery } from 'store/multi-select/multiSelectSlice';

export const MultiSelectScreen = () => {
  const options = useSelector((state) => state.multiSelect.options);
  const searchQuery = useSelector((state) => state.multiSelect.searchQuery);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchQuery(''));
  }, []);

  return (
    <View style={{
      flexGrow: 2,
      backgroundColor: colors.WHITE,
      paddingHorizontal: sizes.PADDING_30,
      paddingVertical: sizes.PADDING_30,
    }}
    >
      <FMultiSelectOptions
        options={options}
        search={searchQuery}
        setSearch={(value) => dispatch(setSearchQuery(value))}
      />
    </View>
  );
};
