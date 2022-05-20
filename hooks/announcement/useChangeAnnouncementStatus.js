import { FModal } from 'components/Composition/FModal';
import modalsMessages from 'constants/components/modals/modalsMessages';
import modalTypes from 'constants/components/modals/modalTypes';
import { useErrorModal } from 'hooks/useErrorModal';
import { useState } from 'react';
import { archiveAnnouncementService } from 'services/announcement/archiveAnnouncement.service';
import { makeAnnouncementActiveService } from 'services/announcement/makeAnnouncementActive.service';
import { resolveAnnouncementService } from 'services/announcement/resolveAnnouncement.service';
import { setUpdatedAnnouncement } from 'store/announcement/announcementSlice';
import { useDispatch } from 'react-redux';

export const useChangeAnnouncementStatus = (announcement) => {
  const dispatch = useDispatch();
  const {
    setShowErrorModal: setShowChangeStatusErrorModal,
    drawErrorModal: drawChangeStatusErrorModal,
  } = useErrorModal();

  const [
    successfulModalVisible,
    setSuccessfulModalVisible,
  ] = useState(false);

  const [
    successfulModalTitle,
    setSuccessfulModalTitle,
  ] = useState('');

  const archiveAnnouncement = async () => {
    try {
      setSuccessfulModalTitle(modalsMessages.ANNOUNCEMENT_ARCHIVED);
      const res = await archiveAnnouncementService(announcement.id);
      dispatch(setUpdatedAnnouncement({
        ...res.data,
        isUserCreator: true,
      }));
      setSuccessfulModalVisible(true);
    } catch (error) {
      setShowChangeStatusErrorModal(true);
    }
  };

  const makeAnnouncementActive = async () => {
    try {
      setSuccessfulModalTitle(modalsMessages.ANNOUNCEMENT_ACTIVATED);
      const res = await makeAnnouncementActiveService(announcement.id);
      dispatch(setUpdatedAnnouncement({
        ...res.data,
        isUserCreator: true,
      }));
      setSuccessfulModalVisible(true);
    } catch (error) {
      setShowChangeStatusErrorModal(true);
    }
  };

  const resolveAnnouncement = async () => {
    try {
      setSuccessfulModalTitle(modalsMessages.ANNOUNCEMENT_RESOLVED);
      const res = await resolveAnnouncementService(announcement.id);
      dispatch(setUpdatedAnnouncement({
        ...res.data,
        isUserCreator: true,
      }));
      setSuccessfulModalVisible(true);
    } catch (error) {
      setShowChangeStatusErrorModal(true);
    }
  };

  const drawSuccessfullyChangeAnnouncementStatusModal = () => successfulModalVisible && (
    <FModal
      type={modalTypes.INFO_SUCCESS_MODAL}
      setVisible={setSuccessfulModalVisible}
      visible={successfulModalVisible}
      title={successfulModalTitle}
    />
  );

  return {
    resolveAnnouncement,
    makeAnnouncementActive,
    archiveAnnouncement,
    drawChangeStatusErrorModal,
    drawSuccessfullyChangeAnnouncementStatusModal,
  };
};
