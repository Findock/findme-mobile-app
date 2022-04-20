import { FTileImageInput } from 'components/Inputs/FTileImageInput';
import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { uploadAnnouncementPhotoService } from 'services/announcement/uploadAnnouncementPhoto.service';
import sizes from 'themes/sizes';
import { appendFileToFormData } from 'utils/appendFileToFormData';
import PropTypes from 'prop-types';
import { FErrorMessage } from 'components/Composition/FErrorMessage';

export const FImageSelectInput = ({
  setDataForm, dataForm, setShowErrorModal, style, errorMessage, defaultPhotos = new Array(6).fill({
    id: null,
    url: '',
  }),
}) => {
  const [
    photos,
    setPhotos,
  ] = useState(defaultPhotos);

  useEffect(() => {
    setPhotos([...defaultPhotos]);
  }, [defaultPhotos]);

  useEffect(() => {
    setDataForm({
      ...dataForm,
      photosIds: [...photos.map((photo) => photo.id).filter((value) => !!value)],
    });
  }, [photos]);

  const removePhotoHandler = (index) => {
    photos[index] = {
      id: null,
      url: '',
    };
    setPhotos([...photos]);
  };

  const uploadPhoto = async (photo, index) => {
    try {
      const formData = appendFileToFormData(photo, 'announcement-image.jpg');
      const res = await uploadAnnouncementPhotoService(formData);
      photos[index] = {
        id: res.id,
        url: res.url,
      };
      setPhotos([...photos]);
    } catch (error) {
      setShowErrorModal(true);
    }
  };

  const drawImageInputs = () => photos && photos.map((photo, index) => (
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
        uploadedImage={photo.url}
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
  defaultPhotos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    url: PropTypes.string,
  })),
};
