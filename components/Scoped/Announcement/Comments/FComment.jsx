import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { FAvatar } from 'components/Composition/FAvatar';
import sizes from 'themes/sizes';
import { FHeading } from 'components/Composition/FHeading';
import fonts from 'themes/fonts';
import placements from 'themes/placements';
import colors from 'themes/colors';
import { parseDate } from 'utils/parseDate';
import dateFormatTypes from 'constants/dateFormatTypes';
import { useNavigation } from '@react-navigation/native';
import { FButton } from 'components/Buttons/FButton';
import buttonTypes from 'constants/components/buttonTypes';
import locales from 'constants/locales';
import { FImage } from 'components/Composition/FImage';
import icons from 'themes/icons';
import stackNavigatorNames from 'constants/stackNavigatorNames';
import { useSelector } from 'react-redux';
import { FInput } from 'components/Inputs/FInput';
import placeholders from 'constants/components/inputs/placeholders';
import inputTypes from 'constants/components/inputs/inputTypes';
import { FCommentActionsModal } from 'components/Scoped/Announcement/Comments/FCommentActionsModal';
import { addCommentForAnnouncement } from 'services/comment/addCommentForAnnouncement.service';
import { FModal } from 'components/Composition/FModal';
import modalTypes from 'constants/components/modals/modalTypes';
import modalsMessages from 'constants/components/modals/modalsMessages';
import { useErrorModal } from 'hooks/useErrorModal';
import { useCameraRollPermission } from 'hooks/permissions/useCameraRollPermission';
import { pickImageFromCameraRoll } from 'utils/pickImageFromCameraRoll';
import { appendFileToFormData } from 'utils/appendFileToFormData';
import { uploadPhotoForAnnouncementComment } from 'services/comment/uploadPhotoForAnnouncementComment.service';
import { useCameraPermission } from 'hooks/permissions/useCameraPermission';
import images from 'constants/images';
import { takePhotoWithCamera } from 'utils/takePhotoWithCamera';
import { useLocationPermission } from 'hooks/permissions/useLocationPermission';
import * as Location from 'expo-location';

export const FComment = ({
  createMode, isCommentCreator, isUserCreator, announcementId, commentedAnnouncement,
}) => {
  const navigation = useNavigation();
  const me = useSelector((state) => state.me.me);
  const {
    setShowErrorModal,
    drawErrorModal,
  } = useErrorModal();
  const {
    tryToAskForCameraRollPermissionsIfIsNotGranted,
    drawNoPermissionsModal,
    granted: status,
  } = useCameraRollPermission();
  const {
    tryToAskForCameraPermissionsIfIsNotGranted,
    drawNoPermissionsModal: drawNoCameraPermissionsModal,
    granted: cameraStatus,
  } = useCameraPermission();
  const {
    tryToAskForLocationPermissionsIfIsNotGranted, granted: locationStatus,
    drawNoPermissionsModal: drawNoLocationPermissionModal,
  } = useLocationPermission();

  const [
    showMore,
    setShowMore,
  ] = useState(false);
  const [
    showSharedLocationModal,
    setShowSharedLocationModal,
  ] = useState(false);
  const [
    hasMoreLines,
    setHasMoreLines,
  ] = useState(false);
  const [
    comment,
    setComment,
  ] = useState('');
  const [
    showCommentActionsModal,
    setShowCommentActionsModal,
  ] = useState(false);
  const [
    location,
    setLocation,
  ] = useState({
    latitude: null,
    longitude: null,
  });
  const [
    photos,
    setPhotos,
  ] = useState([]);
  const [
    showSuccessfulAddedCommentModal,
    setShowSuccessfulAddedCommentModal,
  ] = useState(false);

  const checkIfHasMoreLines = React.useCallback((e) => {
    if (e.nativeEvent.lines.length > 4) setHasMoreLines(true);
  });

  const commentHandler = (newComment) => {
    setComment(newComment);
  };
  const createCommentHandler = async () => {
    try {
      let newCommentData = {
        commentedAnnouncementId: announcementId,
        comment,
        photosIds: photos.map((photo) => photo.id),

      };
      if ((location.latitude && location.longitude) && (location.latitude !== 0 && location.longitude !== 0)) {
        newCommentData = {
          ...newCommentData,
          locationLat: location.latitude,
          locationLon: location.longitude,
        };
      }
      await addCommentForAnnouncement(newCommentData);
      setShowSuccessfulAddedCommentModal(true);
    } catch (error) {
      setShowErrorModal(true);
    }
  };

  const removeUploadedPhoto = (photoId) => {
    const existingPhotoId = photos.find((photo) => photo.id === photoId);
    if (existingPhotoId) {
      const newPhotos = [...photos];
      newPhotos.splice(photos.indexOf(existingPhotoId), 1);
      setPhotos([...newPhotos]);
    }
  };

  const uploadPhoto = async (source) => {
    if (source === 'camera-roll') {
      if (!status) tryToAskForCameraRollPermissionsIfIsNotGranted();
    } else if (source === 'camera') {
      if (!cameraStatus) tryToAskForCameraPermissionsIfIsNotGranted();
    }
    try {
      if (source === 'camera-roll') {
        if (status) {
          await pickImageFromCameraRoll(async (result) => {
            const formData = appendFileToFormData(result, 'announcement-comment-image.jpg');
            const res = await uploadPhotoForAnnouncementComment(formData);
            setPhotos([
              ...photos, {
                id: res.id,
                url: res.url,
              },
            ]);
          }, {
            allowsEditing: true,
          });
        }
      } else if (source === 'camera') {
        if (cameraStatus && status) {
          await takePhotoWithCamera(async (result) => {
            const formData = appendFileToFormData(result, 'announcement-comment-image.jpg');
            const res = await uploadPhotoForAnnouncementComment(formData);
            setPhotos([
              ...photos, {
                id: res.id,
                url: res.url,
              },
            ]);
          }, {
            allowsEditing: true,
          });
        }
      }
    } catch (error) {
      setShowErrorModal(true);
    }
  };

  const shareCurrentLocation = async () => {
    if (!locationStatus) tryToAskForLocationPermissionsIfIsNotGranted();
    if (locationStatus) {
      const position = await Location.getCurrentPositionAsync();
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
      setShowSharedLocationModal(true);
    }
  };

  const drawPhotos = (commentPhotos) => commentPhotos.map((photo) => (
    <FImage
      key={photo.id}
      networkImageUrl={photo.url}
      imagePath={images.DOG()}
      height={sizes.WIDTH_50}
      width={sizes.HEIGHT_50}
      imageHeight={sizes.HEIGHT_FULL}
      imageWidth={sizes.WIDTH_FULL}
      containerStyle={{
        marginRight: sizes.MARGIN_8,
      }}
      resizeMode={sizes.COVER}
      isChildrenInside={createMode}
    >
      {createMode && (
        <FButton
          type={buttonTypes.ICON_BUTTON}
          icon={icons.CLOSE_OUTLINE}
          iconSize={sizes.ICON_35}
          buttonViewStyles={{
            padding: 0,
            width: sizes.WIDTH_FULL,
            height: sizes.HEIGHT_FULL,
            alignItems: placements.CENTER,
            justifyContent: placements.CENTER,
          }}
          onPress={() => removeUploadedPhoto(photo.id)}
        />
      )}
    </FImage>
  ));

  const drawContent = () => {
    if (createMode) {
      return (
        <>
          <View style={{
            flexBasis: sizes.BASIS_10_PERCENTAGES,
            marginRight: sizes.MARGIN_10,
          }}
          >
            <TouchableOpacity onPress={() => navigation.navigate(stackNavigatorNames.USER_PROFILE)}>
              <FAvatar
                size={sizes.WIDTH_35}
                isEditable={false}
                imageUrl={me.profileImageUrl}
              />
            </TouchableOpacity>
          </View>
          <View style={{ flexBasis: sizes.BASIS_90_PERCENTAGES }}>
            <FInput
              placeholder={placeholders.ADD_COMMENT}
              width={sizes.WIDTH_FULL}
              type={inputTypes.TEXTAREA}
              textAreaHeight={sizes.HEIGHT_80}
              onChangeText={commentHandler}
              value={comment}
              marginBottom={sizes.MARGIN_12}
              transparent
              textAreaPaddingHorizontal={0}
            />
            <View style={{
              ...styles.photosContainer,
              marginBottom: sizes.MARGIN_10,
            }}
            >
              {drawPhotos(photos)}
            </View>

            <View style={{
              ...styles.rowContainer,
              justifyContent: 'space-between',
            }}
            >
              <View style={{ flexDirection: 'row' }}>
                <FButton
                  type={buttonTypes.ICON_BUTTON}
                  iconSize={sizes.ICON_30}
                  icon={icons.ATTACH_OUTLINE}
                  color={colors.PRIMARY}
                  buttonViewStyles={{
                    padding: 0,
                    marginRight: sizes.MARGIN_12,
                  }}
                  isDisabled={photos.length === 3}
                  onPress={() => uploadPhoto('camera-roll')}
                />
                <FButton
                  type={buttonTypes.ICON_BUTTON}
                  iconSize={sizes.ICON_30}
                  icon={icons.CAMERA_OUTLINE}
                  color={colors.PRIMARY}
                  buttonViewStyles={{
                    padding: 0,
                    marginRight: sizes.MARGIN_12,
                  }}
                  isDisabled={photos.length === 3}
                  onPress={() => uploadPhoto('camera')}
                />
                <FButton
                  type={buttonTypes.ICON_BUTTON}
                  iconSize={sizes.ICON_27}
                  icon={icons.LOCATION_OUTLINE}
                  color={colors.PRIMARY}
                  buttonViewStyles={{ padding: 0 }}
                  isDisabled={(location.latitude && location.longitude)
                    && (location.latitude !== 0 && location.longitude !== 0)}
                  onPress={shareCurrentLocation}
                />
              </View>
              <FButton
                type={buttonTypes.ICON_BUTTON}
                iconSize={sizes.ICON_35}
                icon={icons.SEND_OUTLINE}
                color={colors.PRIMARY}
                buttonViewStyles={{ padding: 0 }}
                isDisabled={photos.length === 0 && comment.length === 0}
                onPress={createCommentHandler}
              />
            </View>
            {(location.latitude && location.longitude)
                    && (location.latitude !== 0 && location.longitude !== 0)
            && (
              <View style={styles.rowContainer}>
                <FButton
                  type={buttonTypes.BUTTON_WITH_ICON_AND_TEXT}
                  icon={icons.CLOSE_OUTLINE}
                  color={colors.DANGER}
                  backgroundColor={colors.WHITE}
                  title={locales.DONT_SHARE_LOCATION}
                  iconPlacement={placements.LEFT}
                  iconSize={sizes.ICON_20}
                  buttonViewStyles={{
                    paddingVertical: 0,
                    paddingHorizontal: 0,
                  }}
                  titleSize={fonts.HEADING_SMALL}
                  titleWeight={fonts.HEADING_WEIGHT_MEDIUM}
                  onPress={() => setLocation({
                    latitude: null,
                    longitude: null,
                  })}
                />
              </View>
            )}
          </View>
        </>
      );
    }
    return (
      <>
        <View style={{
          flexBasis: sizes.BASIS_10_PERCENTAGES,
          marginRight: sizes.MARGIN_10,
        }}
        >
          <TouchableOpacity onPress={() => navigation.navigate(stackNavigatorNames.USER_PROFILE_PREVIEW, {
            userId: commentedAnnouncement.creator.id,
          })}
          >
            <FAvatar
              size={sizes.WIDTH_35}
              isEditable={false}
              imageUrl={commentedAnnouncement.creator.profileImageUrl}
            />
          </TouchableOpacity>
        </View>
        <View style={{ flexBasis: (isUserCreator || isCommentCreator) ? sizes.BASIS_80_PERCENTAGES : sizes.BASIS_90_PERCENTAGES }}>
          <View style={{
            ...styles.rowContainer,
            justifyContent: (isUserCreator || isCommentCreator) ? 'flex-start' : 'space-between',
          }}
          >
            <View style={{ flexBasis: sizes.BASIS_50_PERCENTAGES }}>
              <FHeading
                title={commentedAnnouncement.creator.name}
                size={fonts.HEADING_SMALL}
                align={placements.LEFT}
                weight={fonts.HEADING_WEIGHT_MEDIUM}
                numberOfLines={1}
                ellipsizeMode="tail"
              />
            </View>
            <View style={{
              flexBasis: sizes.BASIS_50_PERCENTAGES,
            }}
            >
              <FHeading
                title={parseDate(dateFormatTypes.DATE_TIME, commentedAnnouncement.createDate)}
                size={fonts.HEADING_SMALL}
                align={placements.RIGHT}
                weight={fonts.HEADING_WEIGHT_REGULAR}
                color={colors.DARK_GRAY}
              />
              <View style={{
                width: sizes.WIDTH_FULL,
                alignItems: 'flex-end',
              }}
              >
                <FButton
                  type={buttonTypes.LINK_BUTTON}
                  color={colors.PRIMARY}
                  titleSize={fonts.HEADING_NORMAL}
                  titleWeight={fonts.HEADING_WEIGHT_MEDIUM}
                  isUnderline
                  title={locales.SEE_LOCATION}
                  buttonViewStyles={{
                    paddingHorizontal: 0,
                    paddingVertical: 0,
                    marginTop: sizes.MARGIN_5,
                  }}
                />
              </View>
            </View>
          </View>
          <View style={{
            marginTop: sizes.MARGIN_10,
            alignItems: 'flex-start',
            width: sizes.WIDTH_FULL,
          }}
          >
            <FHeading
              title={commentedAnnouncement.comment}
              size={fonts.HEADING_NORMAL}
              align={placements.LEFT}
              weight={fonts.HEADING_WEIGHT_REGULAR}
              numberOfLines={showMore ? 0 : 4}
              ellipsizeMode="tail"
              onTextLayout={checkIfHasMoreLines}
            />
            {hasMoreLines && !showMore && (
              <FButton
                type={buttonTypes.TEXT_BUTTON}
                color={colors.DARK_GRAY}
                titleSize={fonts.HEADING_SMALL}
                titleWeight={fonts.HEADING_WEIGHT_MEDIUM}
                title={locales.SHOW_MORE}
                buttonViewStyles={{
                  paddingHorizontal: 0,
                  paddingVertical: 0,
                  marginTop: sizes.MARGIN_5,
                }}
                onPress={() => setShowMore(true)}
              />
            )}
          </View>
          <View style={styles.photosContainer}>
            {drawPhotos(commentedAnnouncement.photos)}
          </View>
        </View>
        {(isUserCreator || isCommentCreator) && (
          <View style={{
            flexBasis: sizes.BASIS_10_PERCENTAGES,
            alignItems: 'flex-end',
          }}
          >
            <FButton
              type={buttonTypes.ICON_BUTTON}
              color={colors.DARK_GRAY}
              icon={icons.ELLIPSIS_VERTICAL_OUTLINE}
              iconSize={sizes.ICON_25}
              buttonViewStyles={{
                paddingHorizontal: 0,
                paddingVertical: 0,
              }}
            />
          </View>
        )}
      </>
    );
  };

  return (
    <View style={styles.container}>
      <FCommentActionsModal
        canDelete={isUserCreator || isCommentCreator}
        canEdit={isCommentCreator}
        setVisible={setShowCommentActionsModal}
        visible={showCommentActionsModal}
      />
      {showSuccessfulAddedCommentModal && (
        <FModal
          type={modalTypes.INFO_SUCCESS_MODAL}
          title={modalsMessages.COMMENT_HAS_BEEN_ADDED}
          visible={showSuccessfulAddedCommentModal}
          setVisible={setShowSuccessfulAddedCommentModal}
        />
      )}
      {showSharedLocationModal && (
        <FModal
          type={modalTypes.INFO_SUCCESS_MODAL}
          title={modalsMessages.LOCATION_HAS_BEEN_SHARED}
          visible={showSharedLocationModal}
          setVisible={setShowSharedLocationModal}
        />
      )}
      {drawContent()}
      {drawErrorModal()}
      {drawNoCameraPermissionsModal()}
      {drawNoPermissionsModal()}
      {drawNoLocationPermissionModal()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: sizes.WIDTH_FULL,
    backgroundColor: colors.WHITE,
    borderBottomColor: colors.GRAY,
    borderBottomWidth: sizes.BORDER_1,
    flexDirection: 'row',
    padding: sizes.PADDING_20,
    justifyContent: placements.CENTER,
  },
  rowContainer: {
    flexDirection: 'row',
    width: sizes.WIDTH_FULL,
  },
  photosContainer: {
    flexDirection: 'row',
    width: sizes.WIDTH_FULL,
    marginTop: sizes.MARGIN_12,
  },
});

FComment.propTypes = {
  createMode: PropTypes.bool.isRequired,
  isUserCreator: PropTypes.bool.isRequired,
  isCommentCreator: PropTypes.bool.isRequired,
  announcementId: PropTypes.number.isRequired,
};
