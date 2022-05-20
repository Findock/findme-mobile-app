import { FButton } from 'components/Buttons/FButton';
import { FHeadingWithIcon } from 'components/Composition/FHeadingWithIcon';
import { FDistinctiveFeaturesMultiSelectInput } from 'components/Inputs/Custom/FDistinctiveFeaturesMultiSelectInput';
import { FColorSelect } from 'components/Inputs/FColorSelect';
import { FTileSelectInput } from 'components/Inputs/FTileSelectInput';
import { FAnnouncementHeading } from 'components/Scoped/Announcement/FAnnouncementHeading';
import buttonTypes from 'constants/components/buttonTypes';
import animalCategoriesIcons from 'constants/filters-options/animalCategoriesIcons';
import animalGenders from 'constants/filters-options/animalGenders';
import locales from 'constants/locales';
import React, { useEffect, useRef, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import colors from 'themes/colors';
import fonts from 'themes/fonts';
import icons from 'themes/icons';
import placements from 'themes/placements';
import sizes from 'themes/sizes';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { useDrawerStatus } from '@react-navigation/drawer';
import AnnouncementEnum from 'enums/AnnouncementEnum';
import { setSelectedOptions } from 'store/multi-select/multiSelectSlice';
import stackNavigatorNames from 'constants/stackNavigatorNames';
import { FBadgeSelectInput } from '../../Inputs/FBadgeSelectInput';

export const FAnnouncementFiltersDrawer = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const drawerStatus = useDrawerStatus();
  const categories = useSelector((state) => state.filtersOptions.animalCategories);
  const coatColors = useSelector((state) => state.filtersOptions.coatColors);
  const categoriesScrollViewRef = useRef();
  const gendersScrollViewRef = useRef();
  const coatColorsScrollViewRef = useRef();
  const announcementTypesScrollViewRef = useRef();
  const filtersDrawerScrollViewRef = useRef();
  const selectedDistinctiveFeatures = useSelector((state) => state.multiSelect.selectedOptions);

  const [
    filters,
    setFilters,
  ] = useState({
    categoriesIds: [],
    distinctiveFeaturesIds: [],
    type: null,
    coatColorsIds: [],
    genders: [],
  });
  const [
    distinctiveFeatures,
    setDistinctiveFeatures,
  ] = useState([]);

  useEffect(() => {
    setDistinctiveFeatures([...selectedDistinctiveFeatures]);
  }, [selectedDistinctiveFeatures]);

  useEffect(() => {
    setFilters({
      ...filters,
      distinctiveFeaturesIds: [...selectedDistinctiveFeatures.map((x) => x.id)],
    });
  }, [distinctiveFeatures]);

  useEffect(() => {
    filtersDrawerScrollViewRef.current?.scrollTo({
      y: 0,
      animated: true,
    });
    if (drawerStatus === 'closed') {
      categoriesScrollViewRef.current?.scrollTo({
        x: 0,
        animated: true,
      });
      gendersScrollViewRef.current?.scrollTo({
        x: 0,
        animated: true,
      });
      coatColorsScrollViewRef.current?.scrollTo({
        x: 0,
        animated: true,
      });
      announcementTypesScrollViewRef.current?.scrollTo({
        x: 0,
        animated: true,
      });
    }
  }, [drawerStatus]);

  const resetFilters = () => {
    setFilters({
      categoriesIds: [],
      distinctiveFeaturesIds: [],
      type: null,
      coatColorsIds: [],
      genders: [],
    });
    dispatch(setSelectedOptions([]));
  };

  const filterArrayHandler = (filterName, value) => {
    const existingValue = filters[filterName].find((filterValue) => filterValue === value);
    if (existingValue) {
      const newFilterArray = [...filters[filterName]];
      newFilterArray.splice(newFilterArray.indexOf(existingValue), 1);
      filters[filterName] = newFilterArray;
      setFilters({
        ...filters,
        [filterName]: newFilterArray,
      });
    } else if (value === 0 || value === '') {
      setFilters({
        ...filters,
        [filterName]: [],
      });
    } else {
      setFilters({
        ...filters,
        [filterName]: [...filters[filterName], value],
      });
    }
  };

  const selectedFilterArrayValuesHandler = (filterName, value) => {
    if (value === 0 || value === '') {
      if (filters[filterName].length === 0) return true;
    } else return filters[filterName].includes(value);
  };

  const drawAnimalCategories = () => categories && categories.map((category, index) => (
    <FTileSelectInput
      key={index}
      height={sizes.HEIGHT_80}
      width={sizes.WIDTH_80}
      iconSize={sizes.ICON_50}
      iconDefault={animalCategoriesIcons[category.id].iconDefault}
      iconPressed={animalCategoriesIcons[category.id].iconPressed}
      setValue={() => filterArrayHandler('categoriesIds', category.id)}
      value={selectedFilterArrayValuesHandler('categoriesIds', category.id)}
      label={category.namePl}
      style={{
        paddingLeft: index === 0 ? 0 : sizes.PADDING_10,
        paddingRight: index === categories.length - 1 ? 0 : sizes.PADDING_10,
      }}
    />
  ));
  const drawGenders = () => animalGenders.map((gender, index) => (
    <FTileSelectInput
      key={index}
      height={sizes.HEIGHT_80}
      width={sizes.WIDTH_80}
      iconSize={sizes.ICON_40}
      iconDefault={gender.iconDefault}
      iconPressed={gender.iconPressed}
      label={gender.label}
      setValue={() => filterArrayHandler('genders', gender.value)}
      value={selectedFilterArrayValuesHandler('genders', gender.value)}
      style={{
        paddingLeft: index === 0 ? 0 : sizes.PADDING_10,
        paddingRight: index === gender.length - 1 ? 0 : sizes.PADDING_10,
      }}
    />
  ));

  const drawCoatColors = () => coatColors && coatColors.map((coatColor) => (
    <FColorSelect
      key={coatColor.id}
      size={sizes.WIDTH_50}
      setValue={() => filterArrayHandler('coatColorsIds', coatColor.id)}
      value={selectedFilterArrayValuesHandler('coatColorsIds', coatColor.id)}
      color={coatColor.hex}
      readOnly={false}
    />
  ));

  return (
    <ScrollView
      scrollEnabled
      showsVerticalScrollIndicator={false}
      ref={filtersDrawerScrollViewRef}
    >
      <View style={styles.container}>
        <View style={styles.rowContainer}>
          <View>
            <FHeadingWithIcon
              title={locales.FILTERS}
              titleWeight={fonts.HEADING_WEIGHT_BOLD}
              titleSize={fonts.HEADING_LARGE}
              titleColor={colors.PRIMARY}
              iconPlacement={placements.LEFT}
              icon={icons.OPTIONS_OUTLINE}
              iconColor={colors.BLACK}
              iconSize={sizes.ICON_25}
              titleStyle={{ marginLeft: sizes.MARGIN_5 }}
            />
          </View>
          <FButton
            type={buttonTypes.ICON_BUTTON}
            icon={icons.CLOSE_OUTLINE}
            iconSize={sizes.ICON_30}
            buttonViewStyles={{
              padding: 0,
              marginRight: sizes.MARGIN_N6,
            }}
            onPress={() => navigation.dispatch(DrawerActions.closeDrawer())}
          />
        </View>
        <View style={{ marginTop: sizes.MARGIN_30 }}>
          <FAnnouncementHeading title={locales.CATEGORY} />
          <ScrollView
            horizontal
            ref={categoriesScrollViewRef}
          >
            {drawAnimalCategories()}
          </ScrollView>
        </View>
        <View style={{ marginTop: sizes.MARGIN_30 }}>
          <FAnnouncementHeading title={locales.GENDER} />
          <ScrollView
            horizontal
            ref={gendersScrollViewRef}
          >
            {drawGenders()}
          </ScrollView>
        </View>
        <View style={{ marginTop: sizes.MARGIN_30 }}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            ref={announcementTypesScrollViewRef}
          >
            <FBadgeSelectInput
              title={locales.ALL_FEMALE}
              containerStyle={{ paddingLeft: 0 }}
              value={filters.type === null}
              setValue={() => setFilters({
                ...filters,
                type: null,
              })}
            />
            <FBadgeSelectInput
              title={locales.FOUND}
              value={filters.type === AnnouncementEnum.FOUND}
              setValue={() => setFilters({
                ...filters,
                type: AnnouncementEnum.FOUND,
              })}
            />
            <FBadgeSelectInput
              title={locales.LOST}
              containerStyle={{ paddingRight: 0 }}
              value={filters.type === AnnouncementEnum.LOST}
              setValue={() => setFilters({
                ...filters,
                type: AnnouncementEnum.LOST,
              })}
            />
          </ScrollView>
        </View>
        <View style={{ marginTop: sizes.MARGIN_40 }}>
          <FDistinctiveFeaturesMultiSelectInput />
        </View>
        <View style={{ marginTop: sizes.MARGIN_30 }}>
          <FAnnouncementHeading title={locales.COAT_COLORS} />
          <ScrollView
            horizontal
            ref={coatColorsScrollViewRef}
          >
            {drawCoatColors()}
          </ScrollView>
        </View>
        <View style={styles.rowContainer}>
          <FButton
            type={buttonTypes.TEXT_BUTTON}
            backgroundColor={colors.PRIMARY}
            title={locales.SEARCH}
            titleSize={fonts.HEADING_MEDIUM}
            titleWeight={fonts.HEADING_WEIGHT_SEMIBOLD}
            color={colors.WHITE}
            buttonViewStyles={{
              width: sizes.WIDTH_90_PERCENTAGES,
              paddingVertical: sizes.PADDING_14,
            }}
            onPress={() => navigation.navigate(stackNavigatorNames.ALL_ANNOUNCEMENTS_DRAWER, {
              filters,
            })}
          />
          <FButton
            type={buttonTypes.OUTLINE_TEXT_BUTTON}
            title={locales.RESET}
            titleSize={fonts.HEADING_MEDIUM}
            titleWeight={fonts.HEADING_WEIGHT_SEMIBOLD}
            color={colors.PRIMARY}
            onPress={resetFilters}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: sizes.PADDING_30,
  },
  rowContainer: {
    flexDirection: 'row',
    width: sizes.WIDTH_FULL,
    alignItems: placements.CENTER,
    justifyContent: 'space-between',
    marginTop: sizes.MARGIN_30,
  },
});
