import { FMultiSelectOptions } from 'components/Inputs/MultiSelect/FMultiSelectOptions';
import { FDefaultLayout } from 'layouts/FDefault.layout';
import React, { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';

export const MultiSelectScreen = () => {
  const route = useRoute();
  const [
    options,
    setOptions,
  ] = useState([]);

  useEffect(() => {
    if (route.params.options) setOptions(route.params.options);
  }, [route.params.options]);
  return (
    <FDefaultLayout>
      <FMultiSelectOptions options={options} />
    </FDefaultLayout>
  );
};
