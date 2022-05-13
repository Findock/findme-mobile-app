import React from 'react';
import { ScrollView, View } from 'react-native';
import { FColorSelect } from 'components/Inputs/FColorSelect';
import sizes from 'themes/sizes';
import { FErrorMessage } from 'components/Composition/FErrorMessage';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

export const FAnimalCoatColorSelectInput = ({
  style, dataForm, setDataForm, errorMessage,
}) => {
  const coatColors = useSelector((state) => state.filtersOptions.coatColors);

  const coatColorsHandler = (coatColorId) => {
    const existingCoatColorId = dataForm.coatColorsIds.find((coatColor) => coatColor === coatColorId);
    if (existingCoatColorId) {
      const newCoatColors = [...dataForm.coatColorsIds];
      newCoatColors.splice(newCoatColors.indexOf(existingCoatColorId), 1);
      setDataForm({
        ...dataForm,
        coatColorsIds: [...newCoatColors],
      });
    } else {
      setDataForm({
        ...dataForm,
        coatColorsIds: [...dataForm.coatColorsIds, coatColorId],
      });
    }
  };

  const drawCoatColorsInputs = () => coatColors && coatColors.map((coatColor) => (
    <FColorSelect
      key={coatColor.id}
      size={sizes.WIDTH_50}
      color={coatColor.hex}
      setValue={() => coatColorsHandler(coatColor.id)}
      value={dataForm.coatColorsIds.includes(coatColor.id)}
      readOnly={false}
    />
  ));

  return (
    <View>
      <ScrollView
        style={{
          ...style,
          marginBottom: !errorMessage ? sizes.MARGIN_20 : 0,
        }}
        horizontal
      >
        {drawCoatColorsInputs()}
      </ScrollView>
      {errorMessage && (
        <FErrorMessage
          error={errorMessage}
          style={{ marginBottom: sizes.MARGIN_20 }}
        />
      )}
    </View>
  );
};

FAnimalCoatColorSelectInput.propTypes = {
  dataForm: PropTypes.object.isRequired,
  setDataForm: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
};
