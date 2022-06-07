import { FSpinner } from 'components/Composition/FSpinner';
import React, { useEffect, useRef, useState } from 'react';
import {
  Dimensions, ScrollView, StyleSheet, View,
} from 'react-native';
import icons from 'themes/icons';
import colors from 'themes/colors';
import sizes from 'themes/sizes';
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
import { FBadge } from 'components/Composition/FBadge';
import { FColorSelect } from 'components/Inputs/FColorSelect';
import { FAvatar } from 'components/Composition/FAvatar';
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
import { FSlider } from 'components/Composition/Slider/FSlider';
import { FTile } from 'components/Composition/Slider/FTile';
import tileTypes from 'constants/components/tileTypes';
import { parseDate } from 'utils/parseDate';
import dateFormatTypes from 'constants/dateFormatTypes';
import { FMapView } from 'components/Inputs/Map/FMapView';
import { parsePhoneNumber } from 'utils/parsePhoneNumber';
import { FActionsModal } from 'components/Composition/FActionsModal';
import { makePhoneCall } from 'utils/makePhoneCall';
import AnnouncementTypeEnum from '../../enums/AnnouncementTypeEnum';

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
  const [
    showContactActionsModal,
    setShowContactActionsModal,
  ] = useState(false);
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

  const getGenderTitle = () => {
    switch (announcement.gender) {
    case GenderEnum.FEMALE:
      return locales.FEMALE;
    case GenderEnum.MALE:
      return locales.MALE;
    case GenderEnum.UNKNOWN:
      return locales.UNKNOW;
    default:
    }
  };

  const getAnimalCategoryIcon = () => {
    switch (announcement.category.id) {
    case 1:
      return images.RABBIT_BLACK();
    case 2:
      return images.CAT_BLACK();
    case 3:
      return images.DOG_BLACK();
    case 4:
      return images.PIGEON_BLACK();
    case 5:
      return images.TURTLE_BLACK();
    default:
    }
  };

  const getAnnouncementTypeIcon = () => {
    switch (announcement.type) {
    case AnnouncementTypeEnum.LOST:
      return images.LOST_ANIMAL_BLACK();
    case AnnouncementTypeEnum.FOUND:
      return images.FOUND_ANIMAL_BLACK();
    default:
    }
  };

  const getAnnouncementTypeTitle = () => {
    switch (announcement.type) {
    case AnnouncementTypeEnum.LOST:
      return locales.LOST;
    case AnnouncementTypeEnum.FOUND:
      return locales.FOUND;
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

  const modalActions = [
    {
      actionName: parsePhoneNumber(announcement?.creator?.phoneNumber) || '',
      actionIcon: icons.CALL,
      action: () => makePhoneCall(announcement?.creator?.phoneNumber),
      visible: true,
    },
    {
      actionName: locales.WRITE_MESSAGE,
      actionIcon: icons.MAIL_OUTLINE,
      action: () => {
      },
      visible: true,
    },
  ];

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
      <FActionsModal
        setVisible={setShowContactActionsModal}
        visible={showContactActionsModal}
        actions={modalActions}
      />
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
          isChildrenInside
        >
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
        </FSlider>
        <FCard
          paddingHorizontal={sizes.PADDING_30}
          paddingVertical={sizes.PADDING_30}
          style={{ borderRadius: 0 }}
          width={sizes.WIDTH_FULL}
        >
          <View>
            <FHeading
              title={announcement.locationName}
              color={colors.DARK_GRAY}
              weight={fonts.HEADING_WEIGHT_MEDIUM}
              size={fonts.HEADING_NORMAL}
              style={{ marginBottom: sizes.MARGIN_5 }}
            />
            <FHeading
              title={parseDate(dateFormatTypes.DATE_TIME, announcement.createDate)}
              color={colors.DARK_GRAY}
              weight={fonts.HEADING_WEIGHT_MEDIUM}
              size={fonts.HEADING_NORMAL}
              style={{ marginBottom: sizes.MARGIN_5 }}
            />
          </View>
          <View style={{
            width: sizes.WIDTH_FULL,
            marginTop: sizes.MARGIN_20,
          }}
          >
            <FHeading
              title={announcement.title}
              size={fonts.HEADING_EXTRA_LARGE}
              weight={fonts.HEADING_WEIGHT_MEDIUM}
            />
          </View>
          <ScrollView
            horizontal
            contentContainerStyle={{ padding: sizes.PADDING_5 }}
            style={{
              marginTop: sizes.MARGIN_20,
            }}
          >
            <FTile
              type={tileTypes.IMAGE_AND_TEXT_TILE}
              image={getGenderIcon()}
              width={sizes.WIDTH_80}
              height={sizes.HEIGHT_80}
              imageSize={sizes.WIDTH_35}
              title={getGenderTitle()}
              titleWeight={fonts.HEADING_WEIGHT_MEDIUM}
              titleSize={fonts.HEADING_EXTRA_SMALL}
              titleStyle={{ marginTop: sizes.MARGIN_3 }}
              titleColor={colors.DARK_GRAY}
              style={{
                marginRight: sizes.MARGIN_20,
              }}
            />
            <FTile
              type={tileTypes.IMAGE_AND_TEXT_TILE}
              image={getAnimalCategoryIcon()}
              width={sizes.WIDTH_80}
              height={sizes.HEIGHT_80}
              imageSize={sizes.WIDTH_35}
              title={announcement.category.namePl}
              titleWeight={fonts.HEADING_WEIGHT_MEDIUM}
              titleSize={fonts.HEADING_EXTRA_SMALL}
              titleStyle={{ marginTop: sizes.MARGIN_3 }}
              titleColor={colors.DARK_GRAY}
              style={{ marginRight: sizes.MARGIN_20 }}
            />
            <FTile
              type={tileTypes.IMAGE_AND_TEXT_TILE}
              image={getAnnouncementTypeIcon()}
              width={sizes.WIDTH_80}
              height={sizes.HEIGHT_80}
              imageSize={sizes.WIDTH_35}
              title={getAnnouncementTypeTitle()}
              titleWeight={fonts.HEADING_WEIGHT_MEDIUM}
              titleSize={fonts.HEADING_EXTRA_SMALL}
              titleStyle={{ marginTop: sizes.MARGIN_3 }}
              titleColor={colors.DARK_GRAY}
              style={{ marginRight: sizes.MARGIN_20 }}
            />
          </ScrollView>
          {announcement.distinctiveFeatures.length > 0 && (
            <View style={{ marginTop: sizes.MARGIN_25 }}>
              <FAnnouncementHeading title={locales.DISTINCTIVE_FEATURES} />
              <View style={styles.wrapContainer}>
                {drawDistinctiveFeatures()}
              </View>
            </View>
          )}
          <View style={{ marginTop: sizes.MARGIN_25 }}>
            <FAnnouncementHeading title={locales.COAT_COLORS} />
            <ScrollView horizontal>
              {drawCoatColors()}
            </ScrollView>
          </View>
          <View style={{
            marginTop: sizes.MARGIN_20,
            height: sizes.HEIGHT_200,
            width: sizes.WIDTH_FULL,
          }}
          >
            <FMapView
              doNotLoadCoordinatesFromLocation
              isInteractive={false}
              lat={+announcement.locationLat}
              lon={+announcement.locationLon}
              height={sizes.HEIGHT_200}
              width={sizes.WIDTH_FULL}
              onChangeLocation={() => {
              }}
              onChangeCoordinates={() => {
              }}
              onChangeLocationDescription={() => {
              }}
            />
          </View>
          <FButton
            type={buttonTypes.LINK_BUTTON}
            title={locales.ZOOM}
            titleSize={fonts.HEADING_NORMAL}
            titleWeight={fonts.HEADING_WEIGHT_MEDIUM}
            buttonViewStyles={{ marginTop: sizes.MARGIN_10 }}
            color={colors.PRIMARY}
            navigationParams={{
              location: {
                longitude: announcement.locationLon,
                latitude: announcement.locationLat,
                name: announcement.locationName,
              },
            }}
            to={stackNavigatorNames.MAP_PREVIEW_MODAL}
          />
          <View style={{ marginTop: sizes.MARGIN_25 }}>
            <View style={{
              flexDirection: 'row',
              width: sizes.WIDTH_FULL,
              justifyContent: 'space-between',
            }}
            />
            {!announcement.isUserCreator && (
              <View style={{
                flexBasis: sizes.BASIS_50_PERCENTAGES,
                marginBottom: sizes.MARGIN_20,
              }}
              >
                <View style={styles.userContainer}>
                  <TouchableOpacity onPress={redirectToUserPreview}>
                    <FAvatar
                      imageUrl={announcement.creator.profileImageUrl}
                      size={sizes.WIDTH_45}
                      isEditable={false}
                    />
                  </TouchableOpacity>
                  <View style={{ marginLeft: sizes.MARGIN_10 }}>
                    <TouchableOpacity onPress={redirectToUserPreview}>
                      <FHeading
                        title={announcement.creator.name}
                        size={fonts.HEADING_NORMAL}
                        weight={fonts.HEADING_WEIGHT_SEMIBOLD}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
            <FHeading
              title={announcement.description}
              size={fonts.HEADING_NORMAL}
              weight={fonts.HEADING_WEIGHT_REGULAR}
              style={{
                marginBottom: sizes.MARGIN_40,
              }}
            />
          </View>
          <View style={{ marginBottom: sizes.MARGIN_100 }}>
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
        height: sizes.HEIGHT_120,
        paddingVertical: sizes.PADDING_15,
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
            <View style={styles.buttonsContainer}>
              <FButton
                type={buttonTypes.ICON_BUTTON}
                icon={announcement.isInFavorites ? icons.HEART : icons.HEART_OUTLINE}
                backgroundColor={colors.PRIMARY}
                iconSize={sizes.ICON_30}
                buttonViewStyles={{
                  borderRadius: sizes.RADIUS_20,
                  paddingVertical: 15,
                }}
                color={colors.WHITE}
                onPress={() => {
                  if (announcement.isInFavorites) {
                    removeAnnouncementFromFavouritesHandler();
                  } else {
                    addAnnouncementToFavouritesHandler();
                  }
                }}
              />
              <FButton
                type={buttonTypes.TEXT_BUTTON}
                title={locales.CONTACT}
                titleSize={fonts.HEADING_LARGE}
                titleWeight={fonts.HEADING_WEIGHT_MEDIUM}
                backgroundColor={colors.PRIMARY}
                color={colors.WHITE}
                buttonViewStyles={{
                  width: sizes.WIDTH_FULL,
                  paddingVertical: 18,
                }}
                onPress={() => setShowContactActionsModal(true)}
              />
            </View>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: sizes.WIDTH_FULL,
  },
  statusContainer: {
    marginTop: sizes.MARGIN_20,
    paddingRight: sizes.PADDING_20,
    width: sizes.WIDTH_FULL,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  stickyContainer: {
    width: Dimensions.get('window').width,
    position: 'absolute',
    justifyContent: 'center',
    bottom: 0,
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
  buttonsContainer: {
    flexDirection: 'row',
    width: sizes.WIDTH_FULL,
    justifyContent: 'space-between',
  },
});
