import { FErrorMessage } from 'components/Composition/FErrorMessage';
import { FTileSelectInput } from 'components/Inputs/FTileSelectInput';
import React from 'react';
import { ScrollView, View } from 'react-native';
import sizes from 'themes/sizes';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import animalCategoriesIcons from 'constants/filters-options/animalCategoriesIcons';

export const FCategoryAnimalTileSelectInput = ({
  setDataForm, dataForm, style, errorMessage,
}) => {
  const categories = useSelector((state) => state.filtersOptions.animalCategories);

  const drawCategoryAnimalTileInputs = () => categories && categories.filter((_, index) => index > 0).map((category, index) => (
    <FTileSelectInput
      key={index}
      height={sizes.HEIGHT_80}
      width={sizes.WIDTH_80}
      iconSize={sizes.ICON_50}
      iconDefault={animalCategoriesIcons[category.id].iconDefault}
      iconPressed={animalCategoriesIcons[category.id].iconPressed}
      label={category.namePl}
      style={{
        paddingLeft: index === 0 ? 0 : sizes.PADDING_10,
        paddingRight: index === categories.length - 1 ? 0 : sizes.PADDING_10,
      }}
      setValue={() => setDataForm({
        ...dataForm,
        categoryId: category.id,
      })}
      value={dataForm.categoryId === category.id}
    />
  ));

  // if (loadingCategories) return <FSpinner />;
  return (
    <View>
      <ScrollView
        style={{
          ...style,
          marginBottom: !errorMessage ? sizes.MARGIN_20 : 0,
        }}
        horizontal
      >
        {drawCategoryAnimalTileInputs()}
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

FCategoryAnimalTileSelectInput.propTypes = {
  dataForm: PropTypes.object.isRequired,
  setDataForm: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
};
