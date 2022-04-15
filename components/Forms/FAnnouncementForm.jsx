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
import { useDispatch } from 'react-redux';
import { setSelectedOptions } from 'store/multi-select/multiSelectSlice';

export const FAnnouncementForm = () => {
  const dispatch = useDispatch();
  const [
    dataForm,
    setDataForm,
  ] = useState({
    title: '',
    description: '',
    gender: '',
    category: '',
    type: announcementType,
    distinctiveFeatures: [],
    coatColors: [],
    locationName: '',
    locationDescription: '',
    photos: [],
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

  const inputHandler = (name, value) => {
    setDataForm({
      ...dataForm,
      [name]: value,
    });
  };

  return (
    <View>
      {drawErrorModal()}
      <FImageSelectInput
        style={styles.horizontalScrollViewContainer}
        dataForm={dataForm}
        setShowErrorModal={setShowErrorModal}
        setFormData={setDataForm}
      />
      <FInput
        iconPlacement={placements.LEFT}
        icon={icons.PAW}
        placeholder={placeholders.ANNOUNCEMENT_TITLE}
        onChangeText={(e) => inputHandler('title', e)}
        value={dataForm.title}
        width={sizes.WIDTH_FULL}
        type={inputTypes.TEXT}
      />
      <View>
        <FAnnouncementHeading title={locales.CATEGORY} />
        <FCategoryAnimalTileSelectInput
          style={styles.horizontalScrollViewContainer}
          dataForm={dataForm}
          setDataForm={setDataForm}
        />
      </View>
      <View>
        <FAnnouncementHeading title={locales.GENDER} />
        <FAnimalGenderTileSelectInput
          style={styles.horizontalScrollViewContainer}
          dataForm={dataForm}
          setDataForm={setDataForm}
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
        />
      </View>
      <View style={{ marginTop: sizes.MARGIN_20 }}>
        <FAnnouncementHeading title={locales.COAT_COLORS} />
        <FAnimalCoatColorSelectInput
          style={styles.horizontalScrollViewContainer}
          dataForm={dataForm}
          setDataForm={setDataForm}
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
        />
        <FButton
          type={buttonTypes.TEXT_BUTTON}
          title={locales.ADD}
          color={colors.WHITE}
          backgroundColor={colors.PRIMARY}
          titleSize={fonts.HEADING_MEDIUM}
          titleWeight={fonts.HEADING_WEIGHT_MEDIUM}
          buttonViewStyles={{ paddingHorizontal: sizes.PADDING_35 }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  horizontalScrollViewContainer: {
    flexDirection: 'row',
    marginBottom: sizes.MARGIN_20,
  },
  buttonsContainer: {
    flexDirection: 'row',
    width: sizes.WIDTH_FULL,
    justifyContent: 'space-between',
    marginBottom: sizes.MARGIN_20,
  },
});
