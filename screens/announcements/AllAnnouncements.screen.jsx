import { useDrawerStatus } from '@react-navigation/drawer';
import { useNavigation, useRoute } from '@react-navigation/native';
import { FButton } from 'components/Buttons/FButton';
import { FInput } from 'components/Inputs/FInput';
import { FSelectInput } from 'components/Inputs/Select/FSelectInput';
import { FAnnouncementsList } from 'components/Scoped/Announcement/FAnnouncementsList';
import buttonTypes from 'constants/components/buttonTypes';
import inputTypes from 'constants/components/inputs/inputTypes';
import placeholders from 'constants/components/inputs/placeholders';
import locales from 'constants/locales';
import React, { useEffect, useState } from 'react';
import {
  TouchableWithoutFeedback, View, Dimensions,
} from 'react-native';
import colors from 'themes/colors';
import fonts from 'themes/fonts';
import icons from 'themes/icons';
import placements from 'themes/placements';
import sizes from 'themes/sizes';

export const AllAnnouncementsScreen = () => {
  const drawerStatus = useDrawerStatus();
  const navigation = useNavigation();
  const route = useRoute();
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

  useEffect(() => {
    if (route?.params && Object.keys(route?.params?.filters).length > 0) {
      setFilters({ ...route.params?.filters });
    }
  }, [route.params?.filters]);

  return (
    <View style={{
      height: Dimensions.get('screen').height,
      backgroundColor: colors.WHITE,
      paddingHorizontal: sizes.PADDING_15,
      paddingVertical: sizes.PADDING_30,
      flexGrow: 0,
    }}
    >
      <TouchableWithoutFeedback
        style={{ flex: 1 }}
        onPress={() => {
          if (drawerStatus === 'open') navigation.closeDrawer();
        }}
      >
        <>
          <View style={{ marginTop: sizes.MARGIN_30 }}>
            <FInput
              rounded={false}
              placeholder={placeholders.SEARCH}
              type={inputTypes.TEXT}
              icon={icons.PAW}
              iconPlacement={placements.LEFT}
              width={sizes.WIDTH_FULL}
              marginBottom={sizes.MARGIN_10}
            />
            <FInput
              rounded={false}
              placeholder={placeholders.SEARCH}
              type={inputTypes.TEXT}
              icon={icons.PAW}
              iconPlacement={placements.LEFT}
              width={sizes.WIDTH_FULL}
            />
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
                defaultOption={{
                  id: 1,
                  label: 'Ostatnio dodane',
                }}
                options={[
                  {
                    id: 1,
                    label: 'Ostatnio dodane',
                  },
                ]}
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
            />
          </View>
        </>
      </TouchableWithoutFeedback>
    </View>
  );
};
