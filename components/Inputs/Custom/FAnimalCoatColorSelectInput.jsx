import { FSpinner } from 'components/Composition/FSpinner';
import React, { useEffect, useState } from 'react';
import { getCoatColorsService } from 'services/announcement/getCoatColors.service';
import { ScrollView } from 'react-native';
import { FColorSelect } from 'components/Inputs/FColorSelect';
import sizes from 'themes/sizes';

export const FAnimalCoatColorSelectInput = ({ style, dataForm, setDataForm }) => {
  const [
    loadingCoatColors,
    setLoadingCoatColors,
  ] = useState(false);
  const [
    coatColors,
    setCoatColors,
  ] = useState([]);

  useEffect(() => {
    fetchCoatColors();
  }, []);

  const fetchCoatColors = async () => {
    try {
      setLoadingCoatColors(true);
      const res = await getCoatColorsService();
      setCoatColors(res.data);
      setLoadingCoatColors(false);
    } catch (error) {
      setLoadingCoatColors(false);
    }
  };

  const coatColorsHandler = (coatColorId) => {
    const existingCoatColorsId = dataForm.coatColors.find((coatColor) => coatColor === coatColorId);
    if (existingCoatColorsId) {
      const newCoatColors = [...dataForm.coatColors];
      newCoatColors.splice(newCoatColors.indexOf(existingCoatColorsId), 1);
      setDataForm({
        ...dataForm,
        coatColors: [...newCoatColors],
      });
    } else {
      setDataForm({
        ...dataForm,
        coatColors: [...dataForm.coatColors, coatColorId],
      });
    }
  };

  const drawCoatColorsInputs = () => coatColors && coatColors.map((coatColor) => (
    <FColorSelect
      key={coatColor.id}
      size={sizes.WIDTH_50}
      color={coatColor.hex}
      setValue={() => coatColorsHandler(coatColor.id)}
      value={dataForm.coatColors.includes(coatColor.id)}
    />
  ));

  if (loadingCoatColors) return <FSpinner />;
  return (
    <ScrollView
      style={style}
      horizontal
    >
      {drawCoatColorsInputs()}
    </ScrollView>
  );
};
