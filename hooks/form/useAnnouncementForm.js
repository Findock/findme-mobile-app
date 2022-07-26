import announcementMessages from 'constants/components/inputs/errorMessages/announcementMessages';
import AnnouncementTypeEnum from 'enums/AnnouncementTypeEnum';
import { useErrorModal } from 'hooks/modals/useErrorModal';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedOptions } from 'store/multi-select/multiSelectSlice';
import { FModal } from 'components/Composition/FModal';
import modalsMessages from 'constants/components/modals/modalsMessages';
import modalTypes from 'constants/components/modals/modalTypes';

export const useAnnouncementForm = (form = {
  title: '',
  description: '',
  gender: '',
  categoryId: '',
  type: AnnouncementTypeEnum.FOUND,
  distinctiveFeaturesIds: [],
  coatColorsIds: [],
  locationName: '',
  locationDescription: '',
  photosIds: [],
  photosUrls: [],
  locationLat: 0,
  locationLon: 0,
}) => {
  const dispatch = useDispatch();
  const selectedOptions = useSelector((state) => state.multiSelect.selectedOptions);

  const [
    dataForm,
    setDataForm,
  ] = useState(form);
  const [
    errors,
    setErrors,
  ] = useState([]);
  const [
    announcementType,
    setAnnouncementType,
  ] = useState(AnnouncementTypeEnum.FOUND);
  const [
    loading,
    setLoading,
  ] = useState(false);
  const [
    showInvalidFormDataModal,
    setShowInvalidFormDataModal,
  ] = useState(false);
  const {
    setShowErrorModal,
    drawErrorModal,
  } = useErrorModal();

  useEffect(() => {
    dispatch(setSelectedOptions([]));
  }, []);

  useEffect(() => {
    setDataForm({
      ...dataForm,
      distinctiveFeaturesIds: [...selectedOptions.map((option) => option.id)],
    });
  }, [selectedOptions]);

  useEffect(() => {
    clearDataFormErrors();
  }, [dataForm]);

  const inputHandler = (name, value) => {
    setDataForm({
      ...dataForm,
      [name]: value,
    });
  };

  const clearDataFormErrors = () => {
    const newErrors = [...errors];
    if (dataForm.title && errors.indexOf(announcementMessages.TITLE_CANNOT_BE_EMPTY) !== -1) {
      newErrors.splice(errors.indexOf(announcementMessages.TITLE_CANNOT_BE_EMPTY), 1);
    }
    if (dataForm.description && errors.indexOf(announcementMessages.DESCRIPTION_CANNOT_BE_EMPTY) !== -1) {
      newErrors.splice(errors.indexOf(announcementMessages.DESCRIPTION_CANNOT_BE_EMPTY), 1);
    }
    if (dataForm.gender && errors.indexOf(announcementMessages.CHOOSE_GENDER) !== -1) {
      newErrors.splice(errors.indexOf(announcementMessages.CHOOSE_GENDER), 1);
    }
    if (dataForm.categoryId && errors.indexOf(announcementMessages.CHOOSE_CATEGORY) !== -1) {
      newErrors.splice(errors.indexOf(announcementMessages.CHOOSE_CATEGORY), 1);
    }
    if (dataForm.photosIds.length > 0 && errors.indexOf(announcementMessages.CHOOSE_AT_LEAST_ONE_PHOTO) !== -1) {
      newErrors.splice(errors.indexOf(announcementMessages.CHOOSE_AT_LEAST_ONE_PHOTO), 1);
    }
    if (dataForm.coatColorsIds.length > 0 && errors.indexOf(announcementMessages.CHOOSE_AT_LEAST_ONE_COAT_COLOR) !== -1) {
      newErrors.splice(errors.indexOf(announcementMessages.CHOOSE_AT_LEAST_ONE_COAT_COLOR), 1);
    }
    setErrors([...newErrors]);
  };

  const clearDataForm = () => {
    setDataForm({
      title: '',
      description: '',
      gender: '',
      categoryId: '',
      type: AnnouncementTypeEnum.FOUND,
      distinctiveFeaturesIds: [],
      coatColorsIds: [],
      locationName: '',
      locationDescription: '',
      photosIds: [],
      photosUrls: [],
      locationLat: 0,
      locationLon: 0,
    });
    dispatch(setSelectedOptions([]));
    setAnnouncementType(AnnouncementTypeEnum.FOUND);
  };

  const checkFormValidation = (error) => {
    const {
      message,
      statusCode,
    } = error;
    const errs = [];
    if (statusCode === 400) {
      if (message.join(' ')
        .includes('title')) {
        errs.push(announcementMessages.TITLE_CANNOT_BE_EMPTY);
      }
      if (message.join(' ')
        .includes('description')) {
        errs.push(announcementMessages.DESCRIPTION_CANNOT_BE_EMPTY);
      }
      if (message.join(' ')
        .includes('gender')) {
        errs.push(announcementMessages.CHOOSE_GENDER);
      }
      if (message.join(' ')
        .includes('categoryId')) {
        errs.push(announcementMessages.CHOOSE_CATEGORY);
      }
      if (message.join(' ')
        .includes('photosIds')) {
        errs.push(announcementMessages.CHOOSE_AT_LEAST_ONE_PHOTO);
      }
      if (message.join(' ')
        .includes('coatColorsIds')) {
        errs.push(announcementMessages.CHOOSE_AT_LEAST_ONE_COAT_COLOR);
      }
      setShowInvalidFormDataModal(true);
    }
    if (statusCode === 500) {
      setShowErrorModal(true);
    }
    setErrors([...errs]);
  };

  const drawInvalidFormDataModal = () => (
    <FModal
      title={modalsMessages.INVALID_FORM_DATA}
      type={modalTypes.INFO_ERROR_MODAL}
      setVisible={setShowErrorModal}
      visible={showInvalidFormDataModal}
      onContinue={() => setShowInvalidFormDataModal(false)}
    />
  );

  return {
    dataForm,
    setDataForm,
    errors,
    loading,
    setLoading,
    announcementType,
    checkFormValidation,
    clearDataForm,
    inputHandler,
    setShowErrorModal,
    drawErrorModal,
    setAnnouncementType,
    drawInvalidFormDataModal,
  };
};
