import { FButton } from 'components/Buttons/FButton';
import { FBigSwitch } from 'components/Inputs/FBigSwitch';
import { FInput } from 'components/Inputs/FInput';
import { FMapView } from 'components/Inputs/Map/FMapView';
import { FAnnouncementHeading } from 'components/Scoped/Announcement/FAnnouncementHeading';
import buttonTypes from 'constants/components/buttonTypes';
import inputTypes from 'constants/components/inputs/inputTypes';
import placeholders from 'constants/components/inputs/placeholders';
import locales from 'constants/locales';
import AnnouncementEnum from 'enums/AnnouncementEnum';
import { useErrorModal } from 'hooks/useErrorModal';
import React, { useState, useEffect } from 'react';
import {
  View, StyleSheet,
} from 'react-native';
import colors from 'themes/colors';
import fonts from 'themes/fonts';
import icons from 'themes/icons';
import placements from 'themes/placements';
import sizes from 'themes/sizes';
import { FDistinctiveFeaturesMultiSelectInput } from 'components/Inputs/Custom/FDistinctiveFeaturesMultiSelectInput';
import { FCategoryAnimalTileSelectInput } from 'components/Inputs/Custom/FCategoryAnimalTileSelectInput';
import { FImageSelectInput } from 'components/Inputs/Custom/FImageSelectInput';
import { FAnimalGenderTileSelectInput } from 'components/Inputs/Custom/FAnimalGenderTileSelectInput';
import { FAnimalCoatColorSelectInput } from 'components/Inputs/Custom/FAnimalCoatColorSelectInput';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedOptions } from 'store/multi-select/multiSelectSlice';
import { useNavigation } from '@react-navigation/native';
import { createAnnouncementService } from 'services/announcement/createAnnouncement.service';
import announcementMessages from 'constants/components/inputs/errorMessages/announcementMessages';
import { filterErrorMessages } from 'utils/filterErrorMessages';
import { FModal } from 'components/Composition/FModal';
import modalTypes from 'constants/components/modalTypes';

export const FAnnouncementForm = () => {
  const dispatch = useDispatch();
  const selectedOptions = useSelector((state) => state.multiSelect.selectedOptions);
  const navigation = useNavigation();
  const [
    finishCreateAnnouncementModalVisible,
    setFinishCreateAnnouncementModalVisible,
  ] = useState(false);
  const [
    loading,
    setLoading,
  ] = useState(false);
  const [
    errors,
    setErrors,
  ] = useState([]);
  const [
    dataForm,
    setDataForm,
  ] = useState({
    title: '',
    description: '',
    gender: '',
    categoryId: '',
    type: AnnouncementEnum.FOUND,
    distinctiveFeaturesIds: [],
    coatColorsIds: [],
    locationName: '',
    locationDescription: '',
    photosIds: [],
    locationLat: 0,
    locationLon: 0,
  });
  const {
    setShowErrorModal,
    drawErrorModal,
  } = useErrorModal();
  const [
    announcementType,
    setAnnouncementType,
  ] = useState(AnnouncementEnum.FOUND);

  useEffect(() => {
    dispatch(setSelectedOptions([]));
  }, []);

  useEffect(() => {
    clearDataFormErrors();
  }, [dataForm]);

  useEffect(() => {
    setDataForm({
      ...dataForm,
      type: announcementType,
    });
  }, [announcementType]);

  useEffect(() => {
    setDataForm({
      ...dataForm,
      distinctiveFeaturesIds: [...selectedOptions.map((option) => option.id)],
    });
  }, [selectedOptions]);

  const inputHandler = (name, value) => {
    setDataForm({
      ...dataForm,
      [name]: value,
    });
  };
  const clearDataForm = () => {
    setDataForm({
      title: '',
      description: '',
      gender: '',
      categoryId: '',
      type: announcementType,
      distinctiveFeaturesIds: [],
      coatColorsIds: [],
      locationName: '',
      locationDescription: '',
      photosIds: [],
      locationLat: 0,
      locationLon: 0,
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

  const checkFormValidation = (error) => {
    const { message, statusCode } = error;
    const errs = [];
    if (statusCode === 400) {
      if (message.join(' ').includes('title')) {
        errs.push(announcementMessages.TITLE_CANNOT_BE_EMPTY);
      }
      if (message.join(' ').includes('description')) {
        errs.push(announcementMessages.DESCRIPTION_CANNOT_BE_EMPTY);
      }
      if (message.join(' ').includes('gender')) {
        errs.push(announcementMessages.CHOOSE_GENDER);
      }
      if (message.join(' ').includes('categoryId')) {
        errs.push(announcementMessages.CHOOSE_CATEGORY);
      }
      if (message.join(' ').includes('photosIds')) {
        errs.push(announcementMessages.CHOOSE_AT_LEAST_ONE_PHOTO);
      }
      if (message.join(' ').includes('coatColorsIds')) {
        errs.push(announcementMessages.CHOOSE_AT_LEAST_ONE_COAT_COLOR);
      }
    }
    if (statusCode === 500) {
      setShowErrorModal(true);
    }
    setErrors([...errs]);
  };

  const onSubmit = async () => {
    try {
      await createAnnouncementService({ ...dataForm });
      setLoading(false);
      setFinishCreateAnnouncementModalVisible(true);
      clearDataForm();
    } catch (error) {
      if (error.response && error.response.data) checkFormValidation(error.response.data);
      setLoading(false);
    }
  };
  return (
    <View>
      {drawErrorModal()}
      {finishCreateAnnouncementModalVisible && (
        <FModal
          type={modalTypes.INFO_MODAL}
          title={locales.ANNOUNCEMEN_ADDED_SUCCESSFULLY}
          visible={finishCreateAnnouncementModalVisible}
          setVisible={setFinishCreateAnnouncementModalVisible}
        />
      )}
      <FImageSelectInput
        style={styles.horizontalScrollViewContainer}
        dataForm={dataForm}
        setShowErrorModal={setShowErrorModal}
        setDataForm={setDataForm}
        errorMessage={filterErrorMessages(errors, announcementMessages.CHOOSE_AT_LEAST_ONE_PHOTO)}
      />
      <FInput
        iconPlacement={placements.LEFT}
        icon={icons.PAW}
        placeholder={placeholders.ANNOUNCEMENT_TITLE}
        onChangeText={(e) => inputHandler('title', e)}
        value={dataForm.title}
        width={sizes.WIDTH_FULL}
        type={inputTypes.TEXT}
        errorMessage={filterErrorMessages(errors, announcementMessages.TITLE_CANNOT_BE_EMPTY)}
      />
      <View>
        <FAnnouncementHeading title={locales.CATEGORY} />
        <FCategoryAnimalTileSelectInput
          style={styles.horizontalScrollViewContainer}
          dataForm={dataForm}
          setDataForm={setDataForm}
          errorMessage={filterErrorMessages(errors, announcementMessages.CHOOSE_CATEGORY)}
        />
      </View>
      <View>
        <FAnnouncementHeading title={locales.GENDER} />
        <FAnimalGenderTileSelectInput
          style={styles.horizontalScrollViewContainer}
          dataForm={dataForm}
          setDataForm={setDataForm}
          errorMessage={filterErrorMessages(errors, announcementMessages.CHOOSE_GENDER)}
        />
      </View>
      <View>
        <FBigSwitch
          labels={[locales.FOUND, locales.LOST]}
          values={[AnnouncementEnum.FOUND.toString(), AnnouncementEnum.LOST.toString()]}
          value={announcementType}
          setValue={setAnnouncementType}
        />
      </View>
      <View style={{ marginTop: sizes.MARGIN_40 }}>
        <FDistinctiveFeaturesMultiSelectInput />
      </View>
      <View style={{ marginTop: sizes.MARGIN_20 }}>
        <FAnnouncementHeading title={locales.DESCRIPTION} />
        <FInput
          width={sizes.WIDTH_FULL}
          iconPlacement={placements.LEFT}
          icon={icons.PAW}
          placeholder={placeholders.ANNOUNCEMENT_DESCRIPTION}
          onChangeText={(e) => inputHandler('description', e)}
          value={dataForm.description}
          type={inputTypes.TEXTAREA}
          textAreaHeight={sizes.HEIGHT_140}
          errorMessage={filterErrorMessages(errors, announcementMessages.DESCRIPTION_CANNOT_BE_EMPTY)}
        />
      </View>
      <View style={{ marginTop: sizes.MARGIN_20 }}>
        <FAnnouncementHeading title={locales.COAT_COLORS} />
        <FAnimalCoatColorSelectInput
          style={styles.horizontalScrollViewContainer}
          dataForm={dataForm}
          setDataForm={setDataForm}
          errorMessage={filterErrorMessages(errors, announcementMessages.CHOOSE_AT_LEAST_ONE_COAT_COLOR)}
        />
      </View>
      <View>
        <FAnnouncementHeading title={locales.LOCATION} />
        <FMapView
          height={sizes.HEIGHT_400}
          isInteractive
          onChangeLocation={(locationName) => {
            setDataForm({
              ...dataForm,
              locationName,
            });
          }}
          onChangeCoordinates={(coordinates) => {
            setDataForm({
              ...dataForm,
              locationLat: coordinates.latitude,
              locationLon: coordinates.longitude,
            });
          }}
          location={{
            locationName: dataForm.locationName,
            locationDescription: dataForm.locationDescription,
          }}
          onChangeLocationDescription={(locationDescription) => {
            setDataForm({
              ...dataForm,
              locationDescription,
            });
          }}
        />
      </View>
      <View style={styles.buttonsContainer}>
        <FButton
          type={buttonTypes.OUTLINE_TEXT_BUTTON}
          color={colors.PRIMARY}
          title={locales.CANCEL}
          titleSize={fonts.HEADING_MEDIUM}
          titleWeight={fonts.HEADING_WEIGHT_MEDIUM}
          buttonViewStyles={{ paddingHorizontal: sizes.PADDING_35 }}
          onPress={() => navigation.goBack()}
        />
        <FButton
          type={buttonTypes.LOADING_BUTTON}
          title={locales.ADD}
          color={colors.WHITE}
          backgroundColor={colors.PRIMARY}
          titleSize={fonts.HEADING_MEDIUM}
          titleWeight={fonts.HEADING_WEIGHT_MEDIUM}
          buttonViewStyles={{ paddingHorizontal: sizes.PADDING_35 }}
          onPress={onSubmit}
          loading={loading}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  horizontalScrollViewContainer: {
    flexDirection: 'row',
  },
  buttonsContainer: {
    flexDirection: 'row',
    width: sizes.WIDTH_FULL,
    justifyContent: 'space-between',
    marginBottom: sizes.MARGIN_20,
  },
});
