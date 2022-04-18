import { FTileImageInput } from 'components/Inputs/FTileImageInput';
import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { uploadAnnouncementPhotoService } from 'services/announcement/uploadAnnouncementPhoto.service';
import sizes from 'themes/sizes';
import { appendFileToFormData } from 'utils/appendFileToFormData';
import PropTypes from 'prop-types';
import { FErrorMessage } from 'components/Composition/FErrorMessage';

export const FImageSelectInput = ({
  setDataForm, dataForm, setShowErrorModal, style, errorMessage,
}) => {
  const [
    photoUrls,
    setPhotoUrls,
  ] = useState([]);

  useEffect(() => {
    initPhotoUrls();
  }, []);

  useEffect(() => {
    if (dataForm.photosIds.length === 0 && JSON.stringify(dataForm.photosIds) !== JSON.stringify(photoUrls)) {
      setPhotoUrls([]);
      initPhotoUrls();
    }
  }, [dataForm.photosIds]);

  const initPhotoUrls = () => {
    const photoStrings = [];
    for (let i = 0; i < 6; i++) {
      photoStrings.push('');
    }
    setPhotoUrls([...photoStrings]);
  };

  const removePhotoHandler = (index) => {
    const newPhotoUrls = [...photoUrls];
    newPhotoUrls[index] = '';
    setPhotoUrls([...newPhotoUrls]);
  };

  const uploadPhoto = async (photo, index) => {
    try {
      const formData = appendFileToFormData(photo, 'announcement-image.jpg');
      const res = await uploadAnnouncementPhotoService(formData);
      setDataForm({
        ...dataForm,
        photosIds: [...dataForm.photosIds, res.id],
      });
      const newPhotoUrls = [...photoUrls];
      newPhotoUrls[index] = res.url;
      setPhotoUrls([...newPhotoUrls]);
    } catch (error) {
      setShowErrorModal(true);
    }
  };

  const drawImageInputs = () => photoUrls && photoUrls.map((photo, index) => (
    <View
      key={index}
      style={{
        paddingLeft: index === 0 ? 0 : sizes.PADDING_5,
        paddingRight: index === 5 ? 0 : sizes.PADDING_5,
        ...styles.imageInputContainer,
      }}
    >
      <FTileImageInput
        width={sizes.WIDTH_140}
        height={sizes.HEIGHT_140}
        uploadImage={uploadPhoto}
        index={index}
        uploadedImage={photo}
        onRemoveImage={() => removePhotoHandler(index)}
      />
    </View>
  ));

  return (
    <View>
      <ScrollView
        style={{
          ...style,
          marginBottom: !errorMessage ? sizes.MARGIN_20 : 0,
        }}
        horizontal
      >
        {drawImageInputs()}
      </ScrollView>
      {errorMessage && (
        <FErrorMessage
          error={errorMessage}
          style={{ marginBottom: sizes.MARGIN_20 }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  imageInputContainer: {
    padding: sizes.PADDING_5,
  },
});

FImageSelectInput.propTypes = {
  dataForm: PropTypes.object.isRequired,
  setDataForm: PropTypes.func.isRequired,
  setShowErrorModal: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
};
