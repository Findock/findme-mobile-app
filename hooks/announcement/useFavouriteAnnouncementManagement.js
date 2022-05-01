import { FModal } from 'components/Composition/FModal';
import modalsMessages from 'constants/components/modals/modalsMessages';
import modalTypes from 'constants/components/modals/modalTypes';
import { useErrorModal } from 'hooks/useErrorModal';
import { useState } from 'react';
import { addAnnouncementToFavouritesService } from 'services/announcement/addAnnouncementToFavourites.service';
import { removeAnnouncementFromFavouritesService } from 'services/announcement/removeAnnouncementFromFavourites.service';

export const useFavouriteAnnouncementManagement = (announcement) => {
  const [
    successfulModalTitle,
    setSuccessfulModalTitle,
  ] = useState('');
  const [
    showSuccessfulModal,
    setShowSuccessfulModal,
  ] = useState(false);
  const {
    setShowErrorModal: setShowFavouriteAnnouncementErrorModal,
    drawErrorModal: drawFavouriteAnnouncementErrorModal,
  } = useErrorModal();

  const addAnnouncementToFavourites = async () => {
    try {
      setSuccessfulModalTitle(modalsMessages.ANNOUNCEMENT_ADD_TO_FAVOURITES);
      await addAnnouncementToFavouritesService(announcement.id);
      setShowSuccessfulModal(true);
    } catch (error) {
      setShowFavouriteAnnouncementErrorModal(true);
    }
  };

  const removeAnnouncementFromFavourites = async () => {
    try {
      setSuccessfulModalTitle(modalsMessages.ANNOUNCEMENT_REMOVED_FROM_FAVOURITES);
      await removeAnnouncementFromFavouritesService(announcement.id);
      setShowSuccessfulModal(true);
    } catch (error) {
      setShowFavouriteAnnouncementErrorModal(true);
    }
  };

  const drawSuccessfulModal = () => showSuccessfulModal && (
    <FModal
      type={modalTypes.INFO_SUCCESS_MODAL}
      setVisible={setShowSuccessfulModal}
      visible={showSuccessfulModal}
      title={successfulModalTitle}
    />
  );

  return {
    addAnnouncementToFavourites,
    removeAnnouncementFromFavourites,
    drawFavouriteAnnouncementErrorModal,
    drawSuccessfulModal,
  };
};
