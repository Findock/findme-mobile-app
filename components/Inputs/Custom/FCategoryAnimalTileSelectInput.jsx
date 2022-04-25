import { FErrorMessage } from 'components/Composition/FErrorMessage';
import { FSpinner } from 'components/Composition/FSpinner';
import { FTileSelectInput } from 'components/Inputs/FTileSelectInput';
import images from 'constants/images';
import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { getCategoriesService } from 'services/announcement/getCategories.service';
import sizes from 'themes/sizes';
import PropTypes from 'prop-types';

export const FCategoryAnimalTileSelectInput = ({
  setDataForm, dataForm, style, errorMessage,
}) => {
  const [
    loadingCategories,
    setLoadingCategories,
  ] = useState(false);
  const [
    categories,
    setCategories,
  ] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoadingCategories(true);
      const res = await getCategoriesService();
      setCategories(res.data);
      setLoadingCategories(false);
    } catch (error) {
      setLoadingCategories(false);
    }
  };

  const drawCategoryAnimalTileInputs = () => {
    const categoriesIcons = [
      {
        iconDefault: images.RABBIT_BLACK(),
        iconPressed: images.RABBIT_WHITE(),
      },
      {
        iconDefault: images.CAT_BLACK(),
        iconPressed: images.CAT_WHITE(),
      },
      {
        iconDefault: images.DOG_BLACK(),
        iconPressed: images.DOG_WHITE(),
      },
      {
        iconDefault: images.PIGEON_BLACK(),
        iconPressed: images.PIGEON_WHITE(),
      },
      {
        iconDefault: images.TURTLE_BLACK(),
        iconPressed: images.TURTLE_WHITE(),
      },
    ];
    return categories && categories.map((category, index) => (
      <FTileSelectInput
        key={index}
        height={sizes.HEIGHT_80}
        width={sizes.WIDTH_80}
        iconSize={sizes.ICON_50}
        iconDefault={categoriesIcons[category.id - 1].iconDefault}
        iconPressed={categoriesIcons[category.id - 1].iconPressed}
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
  };

  if (loadingCategories) return <FSpinner />;
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
