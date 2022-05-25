import React, { useState } from 'react';
import { FDefaultLayout } from 'layouts/FDefault.layout';
import { View, StyleSheet } from 'react-native';
import { FButton } from 'components/Buttons/FButton';
import buttonTypes from 'constants/components/buttonTypes';
import sizes from 'themes/sizes';
import placements from 'themes/placements';
import images from 'constants/images';
import colors from 'themes/colors';
import defaultBoxShadow from 'styles/defaultBoxShadow';
import locales from 'constants/locales';
import fonts from 'themes/fonts';
import { FLogo } from 'components/Composition/FLogo';
import { FHeading } from 'components/Composition/FHeading';
import { FAnnouncementsList } from 'components/Scoped/Announcement/FAnnouncementsList';
import stackNavigatorNames from 'constants/stackNavigatorNames';
import { useNavigation } from '@react-navigation/native';
import AnnouncementTypeEnum from 'enums/AnnouncementTypeEnum';

export const HomepageScreen = () => {
  const navigation = useNavigation();
  const [
    viewedAnnouncementsLength,
    setViewedAnnouncementsLength,
  ] = useState(0);
  const [
    recentlyCreatedAnnouncementsLength,
    setRecentlyCreatedAnnouncementsLength,
  ] = useState(0);

  return (
    <FDefaultLayout>
      <View style={{
        marginTop: sizes.MARGIN_30,
        ...styles.columnContainer,
      }}
      >
        <FLogo
          fill={false}
          color={colors.PRIMARY}
          iconSize={sizes.ICON_40}
          titleSize={fonts.HEADING_EXTRA_LARGE}
        />
        <FHeading
          align={placements.LEFT}
          size={fonts.HEADING_LARGE}
          title={locales.HELP_TO_FIND_US}
          style={{ marginTop: sizes.MARGIN_5 }}
          weight={fonts.HEADING_WEIGHT_REGULAR}
        />
      </View>
      <View style={{
        width: sizes.WIDTH_FULL,
        marginTop: sizes.MARGIN_40,
      }}
      >
        <View style={styles.rowContainer}>
          <View style={{
            ...styles.halfContainer,
            marginRight: sizes.MARGIN_10,
          }}
          >
            <FButton
              type={buttonTypes.BUTTON_WITH_TEXT_AND_IMAGE}
              iconPlacement={placements.CENTER}
              imagePath={images.LOST_ANIMAL()}
              imageSize={sizes.WIDTH_52}
              backgroundColor={colors.PRIMARY}
              color={colors.WHITE}
              buttonViewStyles={{
                ...defaultBoxShadow,
                paddingVertical: sizes.PADDING_30,
              }}
              title={`${locales.HAVE_YOU_LOST}\n${locales.ANIMAL}`}
              titleSize={fonts.HEADING_LARGE}
              titleWeight={fonts.HEADING_WEIGHT_MEDIUM}
              onPress={() => navigation.navigate(stackNavigatorNames.ADD_ANNOUNCEMENT, {
                announcementType: AnnouncementTypeEnum.LOST,
              })}
            />
          </View>
          <View style={styles.halfContainer}>
            <FButton
              type={buttonTypes.BUTTON_WITH_TEXT_AND_IMAGE}
              iconPlacement={placements.CENTER}
              imagePath={images.FOUND_ANIMAL()}
              imageSize={sizes.WIDTH_52}
              color={colors.WHITE}
              backgroundColor={colors.PRIMARY}
              buttonViewStyles={{
                ...defaultBoxShadow,
                paddingVertical: sizes.PADDING_30,
              }}
              title={`${locales.HAVE_YOU_FOUND}\n${locales.ANIMAL}`}
              titleSize={fonts.HEADING_LARGE}
              titleWeight={fonts.HEADING_WEIGHT_MEDIUM}
              onPress={() => navigation.navigate(stackNavigatorNames.ADD_ANNOUNCEMENT, {
                announcementType: AnnouncementTypeEnum.FOUND,
              })}
            />
          </View>
        </View>
        <View style={{
          ...styles.rowContainer,
          marginTop: sizes.MARGIN_10,
        }}
        >
          <View style={{
            ...styles.halfContainer,
            marginRight: sizes.MARGIN_10,
          }}
          >
            <FButton
              type={buttonTypes.BUTTON_WITH_TEXT_AND_IMAGE}
              iconPlacement={placements.CENTER}
              imagePath={images.ALL_ANNOUNCEMENTS()}
              imageSize={sizes.WIDTH_52}
              backgroundColor={colors.PRIMARY}
              color={colors.WHITE}
              buttonViewStyles={{
                ...defaultBoxShadow,
                paddingVertical: sizes.PADDING_30,
              }}
              title={`${locales.ALL_FEMALE}\n${locales.ANNOUNCEMENTS}`}
              titleSize={fonts.HEADING_LARGE}
              titleWeight={fonts.HEADING_WEIGHT_MEDIUM}
              onPress={() => navigation.navigate(stackNavigatorNames.ALL_ANNOUNCEMENTS)}
            />
          </View>
          <View style={styles.halfContainer}>
            <FButton
              type={buttonTypes.BUTTON_WITH_TEXT_AND_IMAGE}
              iconPlacement={placements.CENTER}
              imagePath={images.LOCATION()}
              imageSize={sizes.WIDTH_52}
              color={colors.WHITE}
              backgroundColor={colors.PRIMARY}
              buttonViewStyles={{
                ...defaultBoxShadow,
                paddingVertical: sizes.PADDING_30,
              }}
              title={`${locales.IN_YOUR}\n${locales.SURROUNDINGS}`}
              titleSize={fonts.HEADING_LARGE}
              titleWeight={fonts.HEADING_WEIGHT_MEDIUM}
            />
          </View>
        </View>
        <View style={{ marginTop: sizes.MARGIN_25 }}>
          <FHeading
            align={placements.LEFT}
            size={fonts.HEADING_LARGE}
            title={locales.RECENTLY_CREATED}
            style={{
              marginTop: sizes.MARGIN_5,
              marginBottom: sizes.MARGIN_10,
            }}
            weight={fonts.HEADING_WEIGHT_REGULAR}
          />
          <View>
            <FAnnouncementsList
              getAll={false}
              horizontal
              lastViewed={false}
              isMe={false}
              onlyFavorites={false}
              numColumns={1}
              setAnnouncementsLength={setRecentlyCreatedAnnouncementsLength}
              recentlyCreated
            />
          </View>
          {recentlyCreatedAnnouncementsLength > 6
              && (
                <FButton
                  title={locales.SHOW_ALL}
                  color={colors.PRIMARY}
                  backgroundColor={colors.LIGHT_GRAY}
                  type={buttonTypes.TEXT_BUTTON}
                  titleSize={fonts.HEADING_NORMAL}
                  titleWeight={fonts.HEADING_WEIGHT_BOLD}
                  onPress={() => navigation.navigate(stackNavigatorNames.RECENTLY_CREATED_ANNOUNCEMENTS)}
                  buttonViewStyles={{ marginTop: sizes.MARGIN_20 }}
                />
              )}
        </View>
        <View style={{ marginTop: sizes.MARGIN_25 }}>
          <FHeading
            align={placements.LEFT}
            size={fonts.HEADING_LARGE}
            title={locales.LAST_VIEWED}
            style={{
              marginTop: sizes.MARGIN_5,
              marginBottom: sizes.MARGIN_10,
            }}
            weight={fonts.HEADING_WEIGHT_REGULAR}
          />
          <View>
            <FAnnouncementsList
              getAll={false}
              horizontal
              lastViewed
              isMe={false}
              onlyFavorites={false}
              numColumns={1}
              setAnnouncementsLength={setViewedAnnouncementsLength}
              recentlyCreated={false}
            />
          </View>
          {viewedAnnouncementsLength > 6
              && (
                <FButton
                  title={locales.SHOW_ALL}
                  color={colors.PRIMARY}
                  backgroundColor={colors.LIGHT_GRAY}
                  type={buttonTypes.TEXT_BUTTON}
                  titleSize={fonts.HEADING_NORMAL}
                  titleWeight={fonts.HEADING_WEIGHT_BOLD}
                  onPress={() => navigation.navigate(stackNavigatorNames.LAST_VIEWED_ANNOUNCEMENTS)}
                  buttonViewStyles={{ marginTop: sizes.MARGIN_20 }}
                />
              )}
        </View>
      </View>
    </FDefaultLayout>
  );
};

const styles = StyleSheet.create({
  columnContainer: {
    flexDirection: 'column',
    width: sizes.WIDTH_FULL,
  },
  rowContainer: {
    flexDirection: 'row',
    width: sizes.WIDTH_FULL,
    justifyContent: 'center',
  },
  halfContainer: {
    flexBasis: sizes.BASIS_50_PERCENTAGES,
  },
});
