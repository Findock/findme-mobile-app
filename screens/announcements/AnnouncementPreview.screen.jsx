import { FHeadingWithIcon } from 'components/Composition/FHeadingWithIcon';
import { FSpinner } from 'components/Composition/FSpinner';
import { FSlider } from 'components/Composition/Slider/FSlider';
import React, { useEffect, useRef, useState } from 'react';
import {
  Dimensions, ScrollView, StyleSheet, View,
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
import { useErrorModal } from 'hooks/modals/useErrorModal';
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import { getAnnouncementService } from 'services/announcement/getAnnouncement.service';
import stackNavigatorNames from 'constants/stackNavigatorNames';
import modalsMessages from 'constants/components/modals/modalsMessages';
import AnnouncementStatusEnum from 'enums/AnnouncementStatusEnum';
import { useChangeAnnouncementStatus } from 'hooks/announcement/useChangeAnnouncementStatus';
import { useFavouriteAnnouncementManagement } from 'hooks/announcement/useFavouriteAnnouncementManagement';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { setUpdatedAnnouncement } from 'store/announcement/announcementSlice';
import { getCommentsService } from 'services/comment/getComments.service';
import { FSimpleComment } from 'components/Scoped/Comments/FSimpleComment';
import { setComments, setCommentToUpdate } from 'store/comments/commentsSlice';
import { useConfirmationModal } from 'hooks/modals/useConfirmationModal';
import { useSuccessModal } from 'hooks/modals/useSuccessModal';

export const AnnouncementPreviewScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.comments.comments);

  const successfulModalTitle = useRef('');
  const [
    announcement,
    setAnnouncement,
  ] = useState(null);
  const [
    confirmationModalTitle,
    setConfirmationModalTitle,
  ] = useState('');
  const {
    resolveAnnouncement,
    makeAnnouncementActive,
    archiveAnnouncement,
    drawChangeStatusErrorModal,
    drawSuccessfullyChangeAnnouncementStatusModal,
  } = useChangeAnnouncementStatus(announcement);
  const {
    addAnnouncementToFavourites,
    removeAnnouncementFromFavourites,
    drawFavouriteAnnouncementErrorModal,
    drawSuccessfulModal,
  } = useFavouriteAnnouncementManagement(announcement);
  const {
    setShowErrorModal,
    drawErrorModal,
  } = useErrorModal(true);

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      fetchAnnouncement();
      dispatch(setCommentToUpdate(null));
      fetchAnnouncementComments();
    }
  }, [isFocused]);

  useEffect(() => {
    if (announcement && route.params.isNew === false) {
      dispatch(setUpdatedAnnouncement({ ...announcement }));
    }
  }, [announcement?.isInFavorites]);

  useEffect(() => {
    if (announcement && route.params.isNew === false) {
      dispatch(setUpdatedAnnouncement({ ...announcement }));
    }
  }, [announcement?.status]);

  useEffect(() => {
    if (route.params?.announcementEditedSuccessfullyModalVisible) {
      successfulModalTitle.current = modalsMessages.SAVED_SUCCESSFULLY;
      setShowSuccessModal(true);
      navigation.setParams({ announcementEditedSuccessfullyModalVisible: false });
    }
  }, [route.params?.announcementEditedSuccessfullyModalVisible]);

  useEffect(() => {
    if (route.params?.announcementAddedSuccessfullyModalVisible) {
      successfulModalTitle.current = modalsMessages.ANNOUNCEMENT_ADDED_SUCCESSFULLY;
      setShowSuccessModal(true);
      navigation.setParams({ announcementAddedSuccessfullyModalVisible: false });
    }
  }, [route.params?.announcementAddedSuccessfullyModalVisible]);

  const fetchAnnouncement = async () => {
    try {
      const res = await getAnnouncementService(route.params?.id);
      setAnnouncement(res.data);
    } catch (error) {
      setShowErrorModal(true);
    }
  };

  const fetchAnnouncementComments = async () => {
    try {
      const res = await getCommentsService(route.params?.id);
      dispatch(setComments(res.data));
    } catch (error) {
      setShowErrorModal(true);
    }
  };

  const confirmationHandler = () => {
    if (confirmationModalTitle === modalsMessages.ARCHIVE_ANNOUNCEMENT_CONFIRMATION) {
      archiveAnnouncementHandler();
    } else if (confirmationModalTitle === modalsMessages.MAKE_ANNOUNCEMENT_ACTIVE_CONFIRMATION) {
      makeAnnouncementActiveHandler();
    } else if (confirmationModalTitle === modalsMessages.RESOLVE_ANNOUNCEMENT_CONFIRMATION) resolveAnnouncementHandler();
  };

  const addAnnouncementToFavouritesHandler = async () => {
    await addAnnouncementToFavourites();
    fetchAnnouncement();
  };

  const removeAnnouncementFromFavouritesHandler = async () => {
    await removeAnnouncementFromFavourites();
    fetchAnnouncement();
  };

  const archiveAnnouncementHandler = async () => {
    await archiveAnnouncement();
    fetchAnnouncement();
  };

  const makeAnnouncementActiveHandler = async () => {
    await makeAnnouncementActive();
    fetchAnnouncement();
  };

  const resolveAnnouncementHandler = async () => {
    await resolveAnnouncement();
    fetchAnnouncement();
  };

  const redirectToUserPreview = () => {
    navigation.navigate(stackNavigatorNames.USER_PROFILE_PREVIEW, { userId: announcement.creator.id });
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

  const {
    setShowSuccessModal,
    drawSuccessModal,
  } = useSuccessModal(successfulModalTitle.current);

  const drawDistinctiveFeatures = () => {
    if (announcement.distinctiveFeatures.length > 0) {
      return announcement.distinctiveFeatures.map((distinctiveFeature) => (
        <FBadge
          key={distinctiveFeature.id}
          isFill={false}
          color={colors.PRIMARY}
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

  const {
    setShowConfirmationModal,
    drawConfirmationModal,
  } = useConfirmationModal(confirmationModalTitle, confirmationHandler);

  if (!announcement && (route.params.isNew !== null || route.params.isNew !== undefined)) return <FSpinner />;
  return (
    <View style={{ flex: 1 }}>
      {drawErrorModal()}
      {drawFavouriteAnnouncementErrorModal()}
      {drawChangeStatusErrorModal()}
      {drawSuccessfullyChangeAnnouncementStatusModal()}
      {drawFavouriteAnnouncementErrorModal()}
      {drawSuccessfulModal()}
      {drawConfirmationModal()}
      {drawSuccessModal()}
      <ScrollView
        style={{
          backgroundColor: colors.WHITE,
        }}
        showsVerticalScrollIndicator={false}
      >
        <FSlider
          photos={announcement.photos.map((photo) => photo.url)}
          height={sizes.HEIGHT_400}
          imageResizeMode={sizes.COVER}
        />
        <FCard
          paddingHorizontal={sizes.PADDING_30}
          paddingVertical={sizes.PADDING_30}
          style={{ borderRadius: 0 }}
          width={sizes.WIDTH_FULL}
        >
          <View style={styles.headerWithStatusContainer}>
            <View style={{ flexBasis: Dimensions.get('window').width < sizes.WIDTH_330 ? sizes.WIDTH_FULL : sizes.BASIS_50_PERCENTAGES }}>
              <FHeading
                title={parseDate(dateFormatTypes.DATE_TIME, announcement.createDate)}
                color={colors.DARK_GRAY}
                weight={fonts.HEADING_WEIGHT_MEDIUM}
                size={fonts.HEADING_NORMAL}
                style={{ marginBottom: sizes.MARGIN_5 }}
              />
              <FHeadingWithIcon
                icon={icons.EYE_OUTLINE}
                iconColor={colors.PRIMARY}
                iconSize={sizes.ICON_20}
                title={`${locales.VIEWS_AMOUNT} ${announcement.viewsAmount}`}
                titleColor={colors.DARK_GRAY}
                titleWeight={fonts.HEADING_WEIGHT_MEDIUM}
                titleSize={fonts.HEADING_NORMAL}
                iconPlacement={placements.LEFT}
                iconStyle={{ marginRight: sizes.MARGIN_5 }}
              />
            </View>
            {(announcement.status === AnnouncementStatusEnum.ARCHIVED || announcement.status === AnnouncementStatusEnum.NOT_ACTIVE)
              && (
                <View style={styles.statusContainer}>
                  <FBadge
                    isFill
                    color={announcement.status === AnnouncementStatusEnum.ARCHIVED ? colors.DANGER : colors.SUCCESS}
                    title={announcement.status === AnnouncementStatusEnum.ARCHIVED ? locales.FINISHED_NONE : locales.FOUND_NONE}
                    style={{
                      paddingVertical: sizes.PADDING_10,
                      paddingHorizontal: sizes.PADDING_10,
                    }}
                  />
                </View>
              )}
          </View>
          <View style={styles.headerContainer}>
            <View style={{ flexBasis: !announcement.isUserCreator ? sizes.BASIS_80_PERCENTAGES : sizes.WIDTH_FULL }}>
              <FHeading
                title={announcement.title}
                size={fonts.HEADING_EXTRA_LARGE}
                weight={fonts.HEADING_WEIGHT_MEDIUM}
              />
            </View>
            {!announcement.isUserCreator && (
              <View style={{
                flexBasis: sizes.BASIS_20_PERCENTAGES,
                alignItems: 'flex-end',
              }}
              >
                <FButton
                  type={buttonTypes.ICON_BUTTON}
                  icon={announcement.isInFavorites ? icons.STAR : icons.STAR_OUTLINE}
                  backgroundColor={colors.PRIMARY}
                  color={colors.WHITE}
                  iconSize={sizes.ICON_40}
                  style={{
                    padding: sizes.PADDING_5,
                    borderRadius: getHalfBorderRadius(sizes.ICON_40 + sizes.PADDING_10),
                  }}
                  onPress={() => {
                    if (announcement.isInFavorites) {
                      removeAnnouncementFromFavouritesHandler();
                    } else {
                      addAnnouncementToFavouritesHandler();
                    }
                  }}
                />
              </View>
            )}
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
              isChildrenInside={false}
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
          <View style={{ marginTop: sizes.MARGIN_25 }}>
            <FAnnouncementHeading title={locales.LOCATION} />
            <FHeadingWithIcon
              icon={icons.LOCATION_OUTLINE}
              iconColor={colors.PRIMARY}
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
                marginTop: sizes.MARGIN_5,
              }}
            />
            <FMapView
              height={sizes.HEIGHT_400}
              onChangeLocation={() => {
              }}
              onChangeCoordinates={() => {
              }}
              onChangeLocationDescription={() => {
              }}
              isInteractive={false}
              lat={+announcement.locationLat}
              lon={+announcement.locationLon}
              doNotLoadCoordinatesFromLocation
            />
          </View>
          <View style={{ marginBottom: announcement.isUserCreator ? sizes.MARGIN_100 : sizes.MARGIN_150 }}>
            <FSimpleComment
              commentsAmount={comments ? comments.length : 0}
              comment={comments ? comments.find((x) => x.comment)?.comment : ''}
              creator={comments ? comments.find((x) => x.comment)?.creator : ''}
              showComments={() => navigation.navigate(stackNavigatorNames.COMMENTS_MODAL, {
                announcementId: announcement.id,
                isUserCreator: announcement.isUserCreator,
              })}
            />
          </View>
        </FCard>
      </ScrollView>
      <View style={{
        ...styles.stickyContainer,
        height: announcement.isUserCreator ? sizes.HEIGHT_120 : sizes.HEIGHT_170,
        paddingVertical: announcement.isUserCreator ? sizes.PADDING_15 : sizes.PADDING_30,
      }}
      >
        {announcement.isUserCreator ? (
          <View style={styles.buttonsContainer}>
            <FButton
              type={buttonTypes.ICON_BUTTON_WITH_LABEL}
              icon={announcement.status === AnnouncementStatusEnum.NOT_ACTIVE
                ? icons.ARROW_UNDO : icons.CHECKMARK_OUTLINE}
              backgroundColor={colors.PRIMARY}
              iconViewSize={sizes.WIDTH_60}
              iconSize={sizes.ICON_30}
              color={colors.WHITE}
              title={announcement.status === AnnouncementStatusEnum.NOT_ACTIVE ? locales.ACTIVATE : locales.FINISH}
              isDisabled={announcement.status === AnnouncementStatusEnum.ARCHIVED}
              onPress={() => {
                if (announcement.status === AnnouncementStatusEnum.ACTIVE) {
                  setConfirmationModalTitle(modalsMessages.RESOLVE_ANNOUNCEMENT_CONFIRMATION);
                  setShowConfirmationModal(true);
                } else if (announcement.status === AnnouncementStatusEnum.NOT_ACTIVE) {
                  setConfirmationModalTitle(modalsMessages.MAKE_ANNOUNCEMENT_ACTIVE_CONFIRMATION);
                  setShowConfirmationModal(true);
                }
              }}
            />
            <FButton
              type={buttonTypes.ICON_BUTTON_WITH_LABEL}
              icon={icons.PENCIL}
              backgroundColor={colors.WARNING}
              iconViewSize={sizes.WIDTH_60}
              iconSize={sizes.ICON_30}
              color={colors.WHITE}
              title={locales.EDIT}
              isDisabled={announcement.status === AnnouncementStatusEnum.NOT_ACTIVE
                || announcement.status === AnnouncementStatusEnum.ARCHIVED}
              onPress={() => {
                navigation.navigate(stackNavigatorNames.EDIT_ANNOUNCEMENT, { id: announcement.id });
                setAnnouncement(null);
              }}
            />
            <FButton
              type={buttonTypes.ICON_BUTTON_WITH_LABEL}
              icon={announcement.status === AnnouncementStatusEnum.ARCHIVED
                ? icons.ARROW_UNDO : icons.FILE_TRAY_FULL}
              backgroundColor={colors.SECONDARY}
              iconViewSize={sizes.WIDTH_60}
              iconSize={sizes.ICON_30}
              color={colors.WHITE}
              title={announcement.status === AnnouncementStatusEnum.ARCHIVED ? locales.ACTIVATE : locales.ARCHIVE}
              isDisabled={announcement.status === AnnouncementStatusEnum.NOT_ACTIVE}
              onPress={() => {
                if (announcement.status === AnnouncementStatusEnum.ACTIVE) {
                  setConfirmationModalTitle(modalsMessages.ARCHIVE_ANNOUNCEMENT_CONFIRMATION);
                  setShowConfirmationModal(true);
                } else if (announcement.status === AnnouncementStatusEnum.ARCHIVED) {
                  setConfirmationModalTitle(modalsMessages.MAKE_ANNOUNCEMENT_ACTIVE_CONFIRMATION);
                  setShowConfirmationModal(true);
                }
              }}
            />
          </View>
        ) : (
          <>
            <View style={styles.userContainer}>
              <TouchableOpacity onPress={redirectToUserPreview}>
                <FAvatar
                  imageUrl={announcement.creator.profileImageUrl}
                  size={sizes.WIDTH_45}
                  isEditable={false}
                />
              </TouchableOpacity>
              <View style={{ marginLeft: sizes.MARGIN_5 }}>
                <TouchableOpacity onPress={redirectToUserPreview}>
                  <FHeading
                    title={announcement.creator.name}
                    size={fonts.HEADING_NORMAL}
                    weight={fonts.HEADING_WEIGHT_SEMIBOLD}
                  />
                </TouchableOpacity>
                <FPhoneNumber
                  phoneNumber={announcement.creator.phoneNumber}
                  size={fonts.HEADING_MEDIUM}
                  weight={fonts.HEADING_WEIGHT_SEMIBOLD}
                  color={colors.DARK_GRAY}
                  isUnderline
                />
              </View>
            </View>
            <View style={styles.buttonContainer}>
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
          </>
        )}
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
  headerWithStatusContainer: {
    width: sizes.WIDTH_FULL,
    flexDirection: Dimensions.get('window').width < sizes.WIDTH_330 ? 'column-reverse' : 'row',
    justifyContent: 'space-between',
  },
  wrapContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: sizes.WIDTH_FULL,
  },
  statusContainer: {
    flexBasis: Dimensions.get('window').width < sizes.WIDTH_330 ? sizes.WIDTH_FULL : sizes.BASIS_50_PERCENTAGES,
    alignItems: Dimensions.get('window').width < sizes.WIDTH_330 ? 'baseline' : 'flex-end',
    marginBottom: Dimensions.get('window').width < sizes.WIDTH_330 ? sizes.MARGIN_20 : 0,
  },
  stickyContainer: {
    width: Dimensions.get('window').width,
    position: 'absolute',
    bottom: 0,
    height: sizes.HEIGHT_170,
    backgroundColor: colors.WHITE,
    paddingHorizontal: sizes.PADDING_30,
    shadowColor: colors.BLACK,
    shadowOffset: {
      width: 0,
      height: sizes.HEIGHT_10,
    },
    shadowOpacity: opacities.SHADOW_OPACITY_051,
    shadowRadius: sizes.SHADOW_RADIUS_13_16,
    elevation: sizes.ELEVATION_20,
  },
  userContainer: {
    flexDirection: 'row',
    width: sizes.WIDTH_FULL,
    alignItems: placements.CENTER,
  },
  buttonContainer: {
    width: sizes.WIDTH_FULL,
    marginTop: sizes.MARGIN_12,
  },
  buttonsContainer: {
    flexDirection: 'row',
    width: sizes.WIDTH_FULL,
    justifyContent: 'space-between',
  },
});
