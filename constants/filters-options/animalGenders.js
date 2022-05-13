import images from 'constants/images';
import locales from 'constants/locales';
import GenderEnum from 'enums/GenderEnum';

export default [
  {
    iconDefault: images.INFINITY_BLACK(),
    iconPressed: images.INFINITY_WHITE(),
    label: locales.ALL_FEMALE,
    value: '',
  },
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
    value: GenderEnum.UNKNOWN,
  },
];
