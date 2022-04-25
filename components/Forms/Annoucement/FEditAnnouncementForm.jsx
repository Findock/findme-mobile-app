import { useNavigation, useRoute } from '@react-navigation/native';
import { FSpinner } from 'components/Composition/FSpinner';
import { FAnnouncementForm } from 'components/Forms/Annoucement/FAnnouncementForm';
import stackNavigatorNames from 'constants/stackNavigatorNames';
import { useAnnouncementForm } from 'hooks/form/useAnnouncementForm';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getAnnouncementService } from 'services/announcement/getAnnouncement.service';
import { updateAnnouncementService } from 'services/announcement/updateAnnouncement.service';
import { setSelectedOptions } from 'store/multi-select/multiSelectSlice';
import { View } from 'react-native';

export const FEditAnnouncementForm = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();
  const [
    announcement,
    setAnnouncement,
  ] = useState(null);
  const [
    defaultPhotos,
    setDefaultPhotos,
  ] = useState(null);
  const {
    dataForm,
    setDataForm,
    errors,
    checkFormValidation,
    inputHandler,
    setShowErrorModal,
    drawErrorModal,
    setAnnouncementType,
    loading,
    setLoading,
    announcementType,
  } = useAnnouncementForm();

  useEffect(() => {
    fetchAnnouncement();
  }, []);

  useEffect(() => {
    if (announcement) {
      dispatch(setSelectedOptions(announcement.distinctiveFeatures));
      setDefaultPhotos([
        ...announcement.photos.map((photo) => ({
          id: photo.id,
          url: photo.url,
        })).concat((new Array(6 - announcement.photos.length).fill({
          id: null,
          url: '',
        }))),
      ]);
      setDataForm({
        title: announcement.title,
        description: announcement.description,
        gender: announcement.gender,
        categoryId: announcement.category.id,
        type: announcement.type,
        distinctiveFeaturesIds: announcement.distinctiveFeatures?.length > 0
          ? [...announcement?.distinctiveFeatures.map((distinctiveFeature) => distinctiveFeature.id)] : [],
        coatColorsIds: [...announcement?.coatColors.map((coatColor) => coatColor.id)],
        locationName: announcement.locationName,
        locationDescription: announcement.locationDescription || '',
        photosIds: [...announcement.photos.map((photo) => photo.id)],
        locationLat: +announcement.locationLat,
        locationLon: +announcement.locationLon,
      });
    }
  }, [announcement]);

  const fetchAnnouncement = async () => {
    try {
      const res = await getAnnouncementService(route.params.id);
      setAnnouncement(res.data);
    } catch (error) {
      setShowErrorModal(true);
    }
  };

  const onSubmit = async () => {
    try {
      setLoading(true);
      await updateAnnouncementService(announcement.id, { ...dataForm });
      setLoading(false);
      navigation.navigate(stackNavigatorNames.ANNOUNCEMENT_PREVIEW, {
        id: announcement.id,
        announcementEditedSuccessfullyModalVisible: true,
      });
    } catch (error) {
      if (error.response && error.response.data) checkFormValidation(error.response.data);
      setLoading(false);
    }
  };

  if (!announcement) {
    return (
      <View>
        <FSpinner />
      </View>
    );
  }
  return (
    <FAnnouncementForm
      announcementType={announcementType}
      errors={errors}
      dataForm={dataForm}
      setDataForm={setDataForm}
      defaultPhotos={defaultPhotos}
      checkFormValidation={checkFormValidation}
      inputHandler={inputHandler}
      drawErrorModal={drawErrorModal}
      setAnnouncementType={setAnnouncementType}
      loading={loading}
      setShowErrorModal={setShowErrorModal}
      setLoading={setLoading}
      onSubmit={onSubmit}
      isEdit
    />
  );
};
