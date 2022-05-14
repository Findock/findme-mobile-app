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
import React, { useEffect, useRef } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import colors from 'themes/colors';
import fonts from 'themes/fonts';
import icons from 'themes/icons';
import placements from 'themes/placements';
import sizes from 'themes/sizes';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { useDrawerStatus } from '@react-navigation/drawer';
import { FBadgeSelectInput } from '../../Inputs/FBadgeSelectInput';

export const FAnnouncementFiltersDrawer = () => {
  const navigation = useNavigation();
  const drawerStatus = useDrawerStatus();
  const categories = useSelector((state) => state.filtersOptions.animalCategories);
  const coatColors = useSelector((state) => state.filtersOptions.coatColors);
  const categoriesScrollViewRef = useRef();
  const gendersScrollViewRef = useRef();
  const coatColorsScrollViewRef = useRef();
  const announcementTypesScrollViewRef = useRef();

  useEffect(() => {
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

  const drawAnimalCategories = () => categories && categories.map((category, index) => (
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
      color={coatColor.hex}
      readOnly={false}
    />
  ));

  return (
    <ScrollView
      scrollEnabled
      showsVerticalScrollIndicator={false}
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
            ref={announcementTypesScrollViewRef}
          >
            <FBadgeSelectInput
              title={locales.ALL_FEMALE}
              containerStyle={{ paddingLeft: 0 }}
            />
            <FBadgeSelectInput title={locales.FOUND} />
            <FBadgeSelectInput
              title={locales.LOST}
              containerStyle={{ paddingRight: 0 }}
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
          />
          <FButton
            type={buttonTypes.OUTLINE_TEXT_BUTTON}
            title={locales.RESET}
            titleSize={fonts.HEADING_MEDIUM}
            titleWeight={fonts.HEADING_WEIGHT_SEMIBOLD}
            color={colors.PRIMARY}
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
