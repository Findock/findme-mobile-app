import locales from 'constants/locales';

export const parseLocation = (street, city) => {
  if (street && city) return `${street}, ${city}`;
  if (street && !city) return street;
  if (!street && city) return city;
  return locales.UNKNOWN_LOCALIZATION;
};
