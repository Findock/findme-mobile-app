import { FHeadingWithIcon } from 'components/Composition/FHeadingWithIcon';
import { FSpinner } from 'components/Composition/FSpinner';
import { FSlider } from 'components/Composition/Slider/FSlider';
import React, { useEffect, useState } from 'react';
import {
  View, StyleSheet, ScrollView, Dimensions,
} from 'react-native';
import icons from 'themes/icons';
import colors from 'themes/colors';
import sizes from 'themes/sizes';
import { parseDate } from 'utils/parseDate';
import dateFormatTypes from 'constants/dateFormatTypes';
import fonts from 'themes/fonts';
import { FHeading } from 'components/Composition/FHeading';
import placements from 'themes/placements';
import { FCard } from 'components/Composition/FCard';
import { FButton } from 'components/Buttons/FButton';
import buttonTypes from 'constants/components/buttonTypes';
import { FAnnouncementHeading } from 'components/Scoped/Announcement/FAnnouncementHeading';
import locales from 'constants/locales';
import GenderEnum from 'enums/GenderEnum';
import images from 'constants/images';
import { FImage } from 'components/Composition/FImage';
import { FBadge } from 'components/Composition/FBadge';
import { FColorSelect } from 'components/Inputs/FColorSelect';
import { FMapView } from 'components/Inputs/Map/FMapView';
import { getHalfBorderRadius } from 'styles/utils/getHalfBorderRadius';
import { FAvatar } from 'components/Composition/FAvatar';
import { FPhoneNumber } from 'components/Utils/FPhoneNumber';
import opacities from 'themes/opacities';
import { useErrorModal } from 'hooks/useErrorModal';
import { useRoute } from '@react-navigation/native';
import { getAnnouncementService } from 'services/announcement/getAnnouncement.service';

export const AnnouncementPreviewScreen = () => {
  const route = useRoute();
  const [
    announcement,
    setAnnouncement,
  ] = useState(null);

  const {
    setShowErrorModal,
    drawErrorModal,
  } = useErrorModal(true);

  useEffect(() => {
    fetchAnnouncement();
  }, []);

  const fetchAnnouncement = async () => {
    try {
      // to do: endpoints depeneding on isMine prop
      const res = await getAnnouncementService(route.params?.id);
      setAnnouncement(res.data);
    } catch (error) {
      setShowErrorModal(true);
    }
  };

  const getGenderIcon = () => {
    switch (announcement.gender) {
    case GenderEnum.FEMALE:
      return images.FEMALE_BLACK();
    case GenderEnum.MALE:
      return images.MALE_BLACK();
    case GenderEnum.UNKNOWN:
      return images.UNKNOWN_BLACK();
    default:
    }
  };

  const drawDistinctiveFeatures = () => {
    if (announcement.distinctiveFeatures) {
      return announcement.distinctiveFeatures.map((distinctiveFeature) => (
        <FBadge
          key={distinctiveFeature.id}
          isFill={false}
          color={colors.DARK_GRAY}
          title={distinctiveFeature.namePl}
          style={{
            paddingVertical: sizes.PADDING_8,
            marginRight: sizes.MARGIN_10,
            marginBottom: sizes.MARGIN_10,
          }}
        />
      ));
    }
    return (
      <FBadge
        isFill={false}
        color={colors.DARK_GRAY}
        title={locales.NONE}
        style={{ paddingVertical: sizes.PADDING_8 }}
      />
    );
  };

  const drawCoatColors = () => announcement.coatColors
      && announcement.coatColors.map((coatColor) => (
        <FColorSelect
          key={coatColor.id}
          readOnly
          size={sizes.WIDTH_45}
          color={coatColor.hex}
          style={{ paddingLeft: 0 }}
        />
      ));

  if (!announcement) return <FSpinner />;
  return (
    <View style={{ flex: 1 }}>
      {drawErrorModal()}
      <ScrollView
        style={{
          backgroundColor: colors.WHITE,
        }}
        showsVerticalScrollIndicator={false}
      >
        <FSlider photos={announcement.photos.map((photo) => photo.url)} />
        <FCard
          paddingHorizontal={sizes.PADDING_30}
          paddingVertical={sizes.PADDING_30}
          style={{ borderRadius: 0 }}
          width={sizes.WIDTH_FULL}
        >
          <View style={{ width: sizes.WIDTH_FULL }}>
            <FHeadingWithIcon
              icon={icons.LOCATION_OUTLINE}
              iconColor={colors.DARK_GRAY}
              iconSize={sizes.ICON_20}
              title={announcement.locationName}
              titleColor={colors.DARK_GRAY}
              titleWeight={fonts.HEADING_WEIGHT_MEDIUM}
              titleSize={fonts.HEADING_NORMAL}
              iconPlacement={placements.LEFT}
            />
            <FHeading
              title={parseDate(dateFormatTypes.DATE_TIME, announcement.createDate)}
              color={colors.DARK_GRAY}
              weight={fonts.HEADING_WEIGHT_MEDIUM}
              size={fonts.HEADING_NORMAL}
              style={{ marginTop: sizes.MARGIN_5 }}
            />
          </View>
          <View style={styles.headerContainer}>
            <View style={{ flexBasis: sizes.BASIS_70_PERCENTAGES }}>
              <FHeading
                title={announcement.title}
                size={fonts.HEADING_EXTRA_LARGE}
                weight={fonts.HEADING_WEIGHT_MEDIUM}
              />
            </View>
            <View style={{
              flexBasis: sizes.BASIS_30_PERCENTAGES,
              alignItems: 'flex-end',
            }}
            >
              <FButton
                type={buttonTypes.ICON_BUTTON}
                icon={icons.STAR}
                backgroundColor={colors.PRIMARY}
                color={colors.WHITE}
                iconSize={sizes.ICON_40}
                style={{
                  padding: sizes.PADDING_5,
                  borderRadius: getHalfBorderRadius(sizes.ICON_40 + sizes.PADDING_10),
                }}
              />
            </View>
          </View>
          <View style={{ marginTop: sizes.MARGIN_25 }}>
            <FAnnouncementHeading title={locales.GENDER} />
            <FImage
              width={sizes.WIDTH_30}
              height={sizes.HEIGHT_30}
              networkImageUrl=""
              imagePath={getGenderIcon()}
              resizeMode={sizes.CONTAIN}
              imageWidth={sizes.WIDTH_FULL}
              imageHeight={sizes.HEIGHT_FULL}
            />
          </View>
          <View style={{ marginTop: sizes.MARGIN_25 }}>
            <FAnnouncementHeading title={locales.DISTINCTIVE_FEATURES} />
            <View style={styles.wrapContainer}>
              {drawDistinctiveFeatures()}
            </View>
          </View>
          <View style={{ marginTop: sizes.MARGIN_25 }}>
            <FAnnouncementHeading title={locales.COAT_COLORS} />
            <ScrollView horizontal>
              {drawCoatColors()}
            </ScrollView>
          </View>
          <View style={{ marginTop: sizes.MARGIN_25 }}>
            <FAnnouncementHeading title={locales.DESCRIPTION} />
            <FHeading
              title={announcement.description}
              size={fonts.HEADING_NORMAL}
              weight={fonts.HEADING_WEIGHT_REGULAR}
            />
          </View>
          <View style={{
            marginTop: sizes.MARGIN_25,
            marginBottom: sizes.MARGIN_100,
          }}
          >
            <FAnnouncementHeading title={locales.LOCATION} />
            <FHeadingWithIcon
              icon={icons.LOCATION_OUTLINE}
              iconColor={colors.DARK_GRAY}
              iconSize={sizes.ICON_20}
              title={announcement.locationName}
              titleColor={colors.DARK_GRAY}
              titleWeight={fonts.HEADING_WEIGHT_MEDIUM}
              titleSize={fonts.HEADING_NORMAL}
              iconPlacement={placements.LEFT}
            />
            <FHeading
              title={announcement.locationDescription}
              size={fonts.HEADING_NORMAL}
              weight={fonts.HEADING_WEIGHT_REGULAR}
              style={{
                marginBottom: sizes.MARGIN_10,
                marginTop: sizes.MARGIN_5,
              }}
            />
            <FMapView
              height={sizes.HEIGHT_400}
              onChangeLocation={() => {}}
              onChangeCoordinates={() => {}}
              onChangeLocationDescription={() => { }}
              isInteractive={false}
              lat={+announcement.locationLat}
              lon={+announcement.locationLon}
            />
          </View>
        </FCard>
      </ScrollView>
      <View style={styles.stickyContainer}>
        <View style={styles.userContaier}>
          <FAvatar
            imageUrl={announcement.creator.profileImageUrl}
            size={sizes.WIDTH_45}
            isEditable={false}
          />
          <View style={{ marginLeft: sizes.MARGIN_5 }}>
            <FHeading
              title={announcement.creator.name}
              size={fonts.HEADING_NORMAL}
              weight={fonts.HEADING_WEIGHT_SEMIBOLD}
            />
            <FPhoneNumber
              phoneNumber={announcement.creator.phoneNumber}
              size={fonts.HEADING_MEDIUM}
              weight={fonts.HEADING_WEIGHT_SEMIBOLD}
              color={colors.DARK_GRAY}
              isUnderline
            />
          </View>
        </View>
        <View style={styles.buttonContaier}>
          <View>
            <FButton
              type={buttonTypes.BUTTON_WITH_ICON_AND_TEXT}
              backgroundColor={colors.PRIMARY}
              color={colors.WHITE}
              title={locales.WRITE_MESSAGE}
              icon={icons.PAW}
              iconSize={sizes.ICON_20}
              iconPlacement={placements.RIGHT}
              titleSize={fonts.HEADING_MEDIUM}
              titleWeight={fonts.HEADING_WEIGHT_MEDIUM}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: sizes.MARGIN_10,
    alignItems: placements.CENTER,
    width: sizes.WIDTH_FULL,
  },
  wrapContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: sizes.WIDTH_FULL,
  },
  stickyContainer: {
    width: Dimensions.get('window').width,
    position: 'absolute',
    bottom: 0,
    height: sizes.HEIGHT_170,
    backgroundColor: colors.WHITE,
    padding: sizes.PADDING_30,
    shadowColor: colors.BLACK,
    shadowOffset: {
      width: 0,
      height: sizes.HEIGHT_10,
    },
    shadowOpacity: opacities.SHADOW_OPACITY_051,
    shadowRadius: sizes.SHADOW_RADIUS_13_16,
    elevation: sizes.ELEVATION_20,
  },
  userContaier: {
    flexDirection: 'row',
    width: sizes.WIDTH_FULL,
    alignItems: placements.CENTER,
  },
  buttonContaier: {
    width: sizes.WIDTH_FULL,
    marginTop: sizes.MARGIN_12,
  },
});
