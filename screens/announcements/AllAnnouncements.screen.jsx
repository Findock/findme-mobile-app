import { useDrawerStatus } from '@react-navigation/drawer';
import { useNavigation, useRoute } from '@react-navigation/native';
import { FButton } from 'components/Buttons/FButton';
import { FInput } from 'components/Inputs/FInput';
import { FSelectInput } from 'components/Inputs/Select/FSelectInput';
import { FAnnouncementsList } from 'components/Scoped/Announcement/FAnnouncementsList';
import buttonTypes from 'constants/components/buttonTypes';
import inputTypes from 'constants/components/inputs/inputTypes';
import placeholders from 'constants/components/inputs/placeholders';
import selectOptions from 'constants/components/inputs/select-options/selectOptions';
import locales from 'constants/locales';
import AnnouncementSortingModeEnum from 'enums/AnnouncementSortingModeEnum';
import React, { useEffect, useState } from 'react';
import {
  TouchableWithoutFeedback, View, Dimensions, Keyboard, StyleSheet,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectInput } from 'store/select/selectSlice';
import colors from 'themes/colors';
import fonts from 'themes/fonts';
import icons from 'themes/icons';
import placements from 'themes/placements';
import sizes from 'themes/sizes';

export const AllAnnouncementsScreen = () => {
  const drawerStatus = useDrawerStatus();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const route = useRoute();
  const sortingModeSelectedOption = useSelector((state) => state.select.selectInputs
    .find((x) => x.id === 'announcement_sorting_mode')?.selectedOption);
  const locationRangeSelectedOption = useSelector((state) => state.select.selectInputs
    .find((x) => x.id === 'location_range')?.selectedOption);

  const [
    search,
    setSearch,
  ] = useState('');
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

  const getSortingModeOptions = () => (
    [
      {
        id: AnnouncementSortingModeEnum.BY_NEWEST,
        label: selectOptions.NEWEST,
      },
      {
        id: AnnouncementSortingModeEnum.BY_OLDEST,
        label: selectOptions.OLDEST,
      },
    ]
  );

  useEffect(() => {
    dispatch(setSelectInput({
      id: 'announcement_sorting_mode',
      selectedOption: {
        id: AnnouncementSortingModeEnum.BY_NEWEST,
        label: selectOptions.NEWEST,
      },
    }));
    dispatch(setSelectInput({
      id: 'location_range',
      selectedOption: {
        id: 1,
        label: '10 km',
      },
    }));
  }, []);

  useEffect(() => {
    if (route?.params && Object.keys(route?.params?.filters).length > 0) {
      setFilters({ ...route.params?.filters });
    }
  }, [route.params?.filters]);

  return (
    <TouchableWithoutFeedback
      style={{ flex: 1 }}
      onPress={() => {
        if (drawerStatus === 'open') navigation.closeDrawer();
        Keyboard.dismiss();
      }}
    >
      <View style={{
        height: Dimensions.get('screen').height,
        backgroundColor: colors.WHITE,
        paddingHorizontal: sizes.PADDING_15,
        paddingVertical: sizes.PADDING_30,
        flexGrow: 0,
      }}
      >
        <>
          <View>
            <FInput
              rounded={false}
              placeholder={placeholders.SEARCH}
              type={inputTypes.TEXT}
              icon={icons.PAW}
              iconPlacement={placements.LEFT}
              width={sizes.WIDTH_FULL}
              marginBottom={sizes.MARGIN_10}
              value={search}
              onChangeText={setSearch}
              onBlur={() => {}}
            />
            <View style={{
              ...styles.rowContainer,
              marginBottom: sizes.MARGIN_20,
            }}
            >
              <FInput
                rounded={false}
                placeholder={placeholders.LOCALIZATION}
                type={inputTypes.TEXT}
                icon={icons.LOCATION_OUTLINE}
                iconPlacement={placements.LEFT}
                width={sizes.BASIS_65_PERCENTAGES}
                marginBottom={0}
                value=""
                onChangeText={() => {}}
              />
              <View style={{
                flex: 1,
                marginLeft: sizes.MARGIN_3,
              }}
              >
                <FSelectInput
                  width={sizes.WIDTH_FULL}
                  icon={icons.ADD_OUTLINE}
                  iconPlacement={placements.LEFT}
                  inputSelectId="location_range"
                  defaultOption={{
                    id: 1,
                    label: '10 km',
                  }}
                  selectedOption={locationRangeSelectedOption}
                  options={[
                    {
                      id: 1,
                      label: '10 km',
                    },
                    {
                      id: 2,
                      label: '20 km',
                    },
                  ]}
                />
              </View>
            </View>
            <View style={{ marginBottom: sizes.MARGIN_20 }}>
              <FButton
                type={buttonTypes.TEXT_BUTTON}
                backgroundColor={colors.PRIMARY}
                title={locales.SEARCH}
                color={colors.WHITE}
                titleSize={fonts.HEADING_MEDIUM}
                titleWeight={fonts.HEADING_WEIGHT_MEDIUM}
                onPress={() => navigation.openDrawer()}
              />
            </View>
            <View style={{
              width: sizes.WIDTH_FULL,
              marginBottom: sizes.MARGIN_20,
            }}
            >
              <FSelectInput
                rounded
                defaultOption={{
                  id: AnnouncementSortingModeEnum.BY_NEWEST,
                  label: selectOptions.NEWEST,
                }}
                inputSelectId="announcement_sorting_mode"
                selectedOption={sortingModeSelectedOption}
                options={getSortingModeOptions()}
                width={sizes.WIDTH_HALF}
              />
            </View>
          </View>
          <View style={{ flex: 1 }}>
            <FAnnouncementsList
              getAll
              horizontal={false}
              isMe={false}
              numColumns={2}
              onlyFavorites={false}
              onlyActive
              filters={filters}
              sortingMode={sortingModeSelectedOption?.id}
            />
          </View>
        </>
      </View>
    </TouchableWithoutFeedback>

  );
};

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    alignItems: placements.CENTER,
    width: sizes.WIDTH_FULL,
  },
});
