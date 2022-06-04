import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';
import PropTypes from 'prop-types';
import {
  Keyboard, StyleSheet, TouchableOpacity, View,
} from 'react-native';
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
import { useDispatch, useSelector } from 'react-redux';
import { FInput } from 'components/Inputs/FInput';
import placeholders from 'constants/components/inputs/placeholders';
import inputTypes from 'constants/components/inputs/inputTypes';
import { FCommentActionsModal } from 'components/Scoped/Comments/FCommentActionsModal';
import modalsMessages from 'constants/components/modals/modalsMessages';
import { useErrorModal } from 'hooks/modals/useErrorModal';
import { useCameraRollPermission } from 'hooks/permissions/useCameraRollPermission';
import { pickImageFromCameraRoll } from 'utils/pickImageFromCameraRoll';
import { appendFileToFormData } from 'utils/appendFileToFormData';
import { useCameraPermission } from 'hooks/permissions/useCameraPermission';
import { takePhotoWithCamera } from 'utils/takePhotoWithCamera';
import { useLocationPermission } from 'hooks/permissions/useLocationPermission';
import * as Location from 'expo-location';
import { setComments, setCommentToUpdate } from 'store/comments/commentsSlice';
import { updateCommentService } from 'services/comment/updateComment.service';
import { addCommentService } from 'services/comment/addComment.service';
import { FSpinner } from 'components/Composition/FSpinner';
import { useSuccessModal } from 'hooks/modals/useSuccessModal';
import { useConfirmationModal } from 'hooks/modals/useConfirmationModal';
import { uploadPhotoCommentService } from 'services/comment/uploadCommentPhoto.service';
import { deleteCommentService } from 'services/comment/deleteComment.service';

export const FComment = ({
  createMode,
  isCommentCreator,
  isUserCreator,
  announcementId,
  commentedAnnouncement,
}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const me = useSelector((state) => state.me.me);
  const comments = useSelector((state) => state.comments.comments);
  const commentToUpdate = useSelector((state) => state.comments.commentToUpdate);
  const successfulModalTitle = useRef('');

  const [
    loading,
    setLoading,
  ] = useState(false);
  const [
    isAddPhotoButtonDisabled,
    setIsAddPhotoButtonDisabled,
  ] = useState(false);
  const [
    isLocationButtonDisabled,
    setIsLocationButtonDisabled,
  ] = useState(false);
  const [
    isCreateCommentButtonDisabled,
    setIsCreateCommentButtonDisabled,
  ] = useState(false);

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
    tryToAskForLocationPermissionsIfIsNotGranted,
    granted: locationStatus,
    drawNoPermissionsModal: drawNoLocationPermissionModal,
  } = useLocationPermission();

  const [
    showMore,
    setShowMore,
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
    latitude: 0,
    longitude: 0,
  });
  const [
    photos,
    setPhotos,
  ] = useState([]);

  useEffect(() => {
    if (photos.length === 0 && !comment && !isCreateCommentButtonDisabled) {
      setIsCreateCommentButtonDisabled(true);
    } else if (isCreateCommentButtonDisabled && (photos.length > 0 || comment)) setIsCreateCommentButtonDisabled(false);
  }, [comment, photos.length]);

  useEffect(() => {
    if (commentToUpdate) {
      setComment(commentToUpdate.comment);
      setPhotos([...commentToUpdate.photos]);
      if (commentToUpdate.locationLat !== 0 && commentToUpdate.locationLon !== 0) {
        setLocation({
          longitude: commentToUpdate.locationLon,
          latitude: commentToUpdate.locationLat,
        });
      }
    } else {
      resetCommentData();
    }
  }, [commentToUpdate]);

  const checkIfHasMoreLines = useCallback((e) => {
    if (e.nativeEvent.lines.length >= 4) {
      setHasMoreLines(true);
    }
  }, []);

  const commentHandler = (newComment) => {
    setComment(newComment);
  };

  const resetCommentData = () => {
    setComment('');
    setPhotos([]);
    setLocation({
      longitude: 0,
      latitude: 0,
    });
    setIsLocationButtonDisabled(false);
    setIsCreateCommentButtonDisabled(true);
    setIsAddPhotoButtonDisabled(false);
  };

  const submitCommentHandler = async () => {
    try {
      let newCommentData = {
        commentedAnnouncementId: announcementId,
        comment,
        photosIds: photos.map((photo) => photo.id),
      };
      if (location.latitude !== 0 && location.longitude !== 0) {
        newCommentData = {
          ...newCommentData,
          locationLat: location.latitude,
          locationLon: location.longitude,
        };
      }
      if (commentToUpdate) {
        const res = await updateCommentService(commentToUpdate.id, newCommentData);
        const newComments = [...comments];
        newComments[newComments.indexOf(commentToUpdate)] = { ...res.data };
        dispatch(setComments(newComments));
        dispatch(setCommentToUpdate(null));
        successfulModalTitle.current = modalsMessages.COMMENT_HAS_BEEN_UPDATED;
        setShowSuccessModal(true);
      } else {
        const res = await addCommentService(newCommentData);
        dispatch(setComments([res.data, ...comments]));
        successfulModalTitle.current = modalsMessages.COMMENT_HAS_BEEN_ADDED;
        setShowSuccessModal(true);
      }
      Keyboard.dismiss();
      resetCommentData();
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
      setIsAddPhotoButtonDisabled(false);
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
          setLoading(true);
          await pickImageFromCameraRoll(async (result) => {
            setLoading(true);
            const formData = appendFileToFormData(result, 'announcement-comment-image.jpg');
            const res = await uploadPhotoCommentService(formData);
            setPhotos([
              ...photos, {
                id: res.id,
                url: res.url,
              },
            ]);
            if (photos.length >= 2) setIsAddPhotoButtonDisabled(true);
          }, {
            allowsEditing: true,
          });
        }
      } else if (source === 'camera') {
        if (cameraStatus && status) {
          await takePhotoWithCamera(async (result) => {
            const formData = appendFileToFormData(result, 'announcement-comment-image.jpg');
            const res = await uploadPhotoCommentService(formData);
            setPhotos([
              ...photos, {
                id: res.id,
                url: res.url,
              },
            ]);
            if (photos.length >= 2) setIsAddPhotoButtonDisabled(true);
          }, {
            allowsEditing: true,
          });
        }
      }
      setLoading(false);
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
      setIsLocationButtonDisabled(true);
      successfulModalTitle.current = modalsMessages.LOCATION_HAS_BEEN_SHARED;
      setShowSuccessModal(true);
    }
  };

  const drawPhotos = (commentPhotos) => commentPhotos.map((photo) => (
    <FImage
      key={photo.id}
      networkImageUrl={photo.url}
      imagePath=""
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

  const editHandler = () => {
    dispatch(setCommentToUpdate(commentedAnnouncement));
  };

  const deleteHandler = async () => {
    try {
      await deleteCommentService(commentedAnnouncement.id);
      const newComments = [...comments];
      newComments.splice(newComments.indexOf(commentedAnnouncement), 1);
      dispatch(setComments(newComments));
      navigation.setParams({
        successfulDeletedComment: true,
      });
      setShowSuccessModal(true);
    } catch (error) {
      setShowErrorModal(true);
    }
  };

  const redirectToUserProfile = () => {
    if (commentedAnnouncement.creator.id === me.id) {
      navigation.navigate(stackNavigatorNames.USER_PROFILE);
    } else {
      navigation.navigate(stackNavigatorNames.USER_PROFILE_PREVIEW, { userId: commentedAnnouncement.creator.id });
    }
  };

  const {
    setShowSuccessModal,
    drawSuccessModal,
  } = useSuccessModal(successfulModalTitle.current);
  const {
    setShowConfirmationModal,
    drawConfirmationModal,
  } = useConfirmationModal(modalsMessages.DELETE_COMMENT, deleteHandler);

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
              {loading && <FSpinner />}
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
                  isDisabled={isAddPhotoButtonDisabled}
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
                  isDisabled={isAddPhotoButtonDisabled}
                  onPress={() => uploadPhoto('camera')}
                />
                <FButton
                  type={buttonTypes.ICON_BUTTON}
                  iconSize={sizes.ICON_27}
                  icon={icons.LOCATION_OUTLINE}
                  color={colors.PRIMARY}
                  buttonViewStyles={{ padding: 0 }}
                  isDisabled={isLocationButtonDisabled}
                  onPress={shareCurrentLocation}
                />
              </View>
              <FButton
                type={buttonTypes.ICON_BUTTON}
                iconSize={sizes.ICON_35}
                icon={icons.SEND_OUTLINE}
                color={colors.PRIMARY}
                buttonViewStyles={{ padding: 0 }}
                isDisabled={isCreateCommentButtonDisabled}
                onPress={submitCommentHandler}
              />
            </View>
            {(location.latitude !== 0 && location.longitude !== 0)
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
                    onPress={() => {
                      setLocation({
                        latitude: 0,
                        longitude: 0,
                      });
                      setIsLocationButtonDisabled(false);
                    }}
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
          <TouchableOpacity onPress={redirectToUserProfile}>
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
                size={fonts.HEADING_EXTRA_SMALL}
                align={placements.RIGHT}
                weight={fonts.HEADING_WEIGHT_REGULAR}
                color={colors.DARK_GRAY}
              />
              {commentedAnnouncement.locationLat !== 0 && commentedAnnouncement.locationLon !== 0 && (
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
              )}
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
              onPress={() => setShowCommentActionsModal(true)}
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
        onEdit={editHandler}
        onDelete={() => setShowConfirmationModal(true)}
      />
      {drawSuccessModal()}
      {drawConfirmationModal()}
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
