import { FButton } from 'components/Buttons/FButton';
import { FBigSwitch } from 'components/Inputs/FBigSwitch';
import { FInput } from 'components/Inputs/FInput';
import { FMapView } from 'components/Inputs/Map/FMapView';
import { FAnnouncementHeading } from 'components/Scoped/Announcement/FAnnouncementHeading';
import buttonTypes from 'constants/components/buttonTypes';
import inputTypes from 'constants/components/inputs/inputTypes';
import placeholders from 'constants/components/inputs/placeholders';
import locales from 'constants/locales';
import AnnouncementTypeEnum from 'enums/AnnouncementTypeEnum';
import React from 'react';
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
import { useNavigation } from '@react-navigation/native';
import announcementMessages from 'constants/components/inputs/errorMessages/announcementMessages';
import { filterErrorMessages } from 'utils/filterErrorMessages';
import PropTypes from 'prop-types';

export const FAnnouncementForm = ({
  dataForm,
  setDataForm,
  defaultPhotos,
  isEdit = false,
  errors,
  inputHandler,
  setShowErrorModal,
  drawErrorModal,
  setAnnouncementType,
  announcementType,
  loading,
  onSubmit,
}) => {
  const navigation = useNavigation();
  return (
    <View>
      {drawErrorModal()}
      {defaultPhotos && (
        <FImageSelectInput
          style={styles.horizontalScrollViewContainer}
          dataForm={dataForm}
          setShowErrorModal={setShowErrorModal}
          setDataForm={setDataForm}
          errorMessage={filterErrorMessages(errors, announcementMessages.CHOOSE_AT_LEAST_ONE_PHOTO)}
          defaultPhotos={defaultPhotos}
        />
      )}
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
          values={[AnnouncementTypeEnum.FOUND.toString(), AnnouncementTypeEnum.LOST.toString()]}
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
          lat={dataForm.locationLat}
          lon={dataForm.locationLon}
          doNotLoadCoordinatesFromLocation={isEdit}
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
          title={locales.SAVE}
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

FAnnouncementForm.propTypes = {
  isEdit: PropTypes.bool.isRequired,
};
