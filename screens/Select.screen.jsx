import React, { useEffect, useState } from 'react';
import { Dimensions, View } from 'react-native';
import colors from 'themes/colors';
import sizes from 'themes/sizes';
import { FSelectOptions } from 'components/Inputs/Select/FSelectOptions';
import { useRoute } from '@react-navigation/native';

export const SelectScreen = () => {
  const route = useRoute();

  const [
    options,
    setOptions,
  ] = useState([]);
  const [
    inputSelectId,
    setInputSelectId,
  ] = useState();

  useEffect(() => {
    if (route.params.options.length > 0) {
      setOptions([...route.params.options]);
    }
  }, [route.params?.options]);

  useEffect(() => {
    if (route.params.id) {
      setInputSelectId(route.params.id);
    }
  }, [route.params?.id]);

  return (
    <View style={{
      height: Dimensions.get('screen').height,
      backgroundColor: colors.WHITE,
      paddingHorizontal: sizes.PADDING_30,
      paddingVertical: sizes.PADDING_30,
      flexGrow: 0,
    }}
    >
      <FSelectOptions
        options={options}
        selectInputId={inputSelectId}
      />
    </View>
  );
};
