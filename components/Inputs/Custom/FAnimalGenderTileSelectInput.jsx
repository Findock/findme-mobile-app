import { FTileSelectInput } from 'components/Inputs/FTileSelectInput';
import images from 'constants/images';
import locales from 'constants/locales';
import GenderEnum from 'enums/GenderEnum';
import React from 'react';
import sizes from 'themes/sizes';
import { ScrollView } from 'react-native';

export const FAnimalGenderTileSelectInput = ({ dataForm, setDataForm, style }) => {
  const drawGenderAnimalTileInputs = () => {
    const animalGenders = [
      {
        iconDefault: images.MALE_BLACK(),
        iconPressed: images.MALE_WHITE(),
        label: locales.MALE,
        value: GenderEnum.MALE,
      },
      {
        iconDefault: images.FEMALE_BLACK(),
        iconPressed: images.FEMALE_WHITE(),
        label: locales.FEMALE,
        value: GenderEnum.FEMALE,
      },
      {
        iconDefault: images.UNKNOWN_BLACK(),
        iconPressed: images.UNKNOWN_WHITE(),
        label: locales.UNKNOW,
        value: GenderEnum.UNKNOW,
      },
    ];
    return animalGenders.map((animalGender, index) => (
      <FTileSelectInput
        key={index}
        height={sizes.HEIGHT_80}
        width={sizes.WIDTH_80}
        iconSize={sizes.ICON_40}
        iconDefault={animalGender.iconDefault}
        iconPressed={animalGender.iconPressed}
        label={animalGender.label}
        style={{
          paddingLeft: index === 0 ? 0 : sizes.PADDING_10,
          paddingRight: index === animalGender.length - 1 ? 0 : sizes.PADDING_10,
        }}
        setValue={() => setDataForm({
          ...dataForm,
          gender: animalGender.value,
        })}
        value={dataForm.gender === animalGender.value}
      />
    ));
  };
  return (
    <ScrollView
      style={style}
      horizontal
    >
      {drawGenderAnimalTileInputs()}
    </ScrollView>
  );
};
