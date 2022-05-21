import { FAnnouncementForm } from 'components/Forms/Annoucement/FAnnouncementForm';
import { useAnnouncementForm } from 'hooks/form/useAnnouncementForm';
import React, { useEffect, useState } from 'react';
import { createAnnouncementService } from 'services/announcement/createAnnouncement.service';
import { useNavigation } from '@react-navigation/native';
import stackNavigatorNames from 'constants/stackNavigatorNames';

export const FCreateAnnouncementForm = () => {
  const {
    dataForm,
    setDataForm,
    errors,
    checkFormValidation,
    clearDataForm,
    inputHandler,
    setShowErrorModal,
    drawErrorModal,
    setAnnouncementType,
    loading,
    setLoading,
    announcementType,
  } = useAnnouncementForm();
  const navigation = useNavigation();

  const [
    defaultPhotos,
    setDefaultPhotos,
  ] = useState(null);

  useEffect(() => {
    setDefaultPhotos(new Array(6).fill({
      id: null,
      url: '',
    }));
  }, []);

  const onSubmit = async () => {
    try {
      const res = await createAnnouncementService({ ...dataForm });
      setLoading(false);
      clearDataForm();
      navigation.reset({
        index: 0,
        routes: [{ name: stackNavigatorNames.HOMEPAGE }],
      });
      navigation.navigate(stackNavigatorNames.ANNOUNCEMENT_PREVIEW, {
        id: res.data.id,
        announcementAddedSuccessfullyModalVisible: true,
        isNew: true,
      });
    } catch (error) {
      if (error.response && error.response.data) checkFormValidation(error.response.data);
      setLoading(false);
    }
  };

  return (
    <FAnnouncementForm
      announcementType={announcementType}
      dataForm={dataForm}
      drawErrorModal={drawErrorModal}
      defaultPhotos={defaultPhotos}
      errors={errors}
      inputHandler={inputHandler}
      loading={loading}
      setAnnouncementType={setAnnouncementType}
      setDataForm={setDataForm}
      setShowErrorModal={setShowErrorModal}
      onSubmit={onSubmit}
      isEdit={false}
    />
  );
};
