import { FButton } from 'components/Buttons/FButton';
import { FCard } from 'components/Composition/FCard';
import buttonTypes from 'constants/components/buttonTypes';
import locales from 'constants/locales';
import React, { useRef, useState } from 'react';
import {
  View, StyleSheet, Modal, Pressable,
} from 'react-native';
import colors from 'themes/colors';
import fonts from 'themes/fonts';
import placements from 'themes/placements';
import sizes from 'themes/sizes';
import { useNavigation } from '@react-navigation/native';
import stackNavigatorNames from 'constants/stackNavigatorNames';
import PropTypes from 'prop-types';
import { useChangeAnnouncementStatus } from 'hooks/announcement/useChangeAnnouncementStatus';
import AnnouncementStatusEnum from 'enums/AnnouncementStatusEnum';
import { FModal } from 'components/Composition/FModal';
import modalTypes from 'constants/components/modals/modalTypes';
import modalsMessages from 'constants/components/modals/modalsMessages';

export const FAnnouncementCardActionsModal = ({ visible, setVisible, announcement }) => {
  const ref = useRef(null);
  const navigation = useNavigation();
  const [
    confirmationModalVisible,
    setConfirmationModalVisible,
  ] = useState(false);
  const [
    confirmationModalTitle,
    setConfirmationModalTitle,
  ] = useState('');
  const { status, id } = announcement;
  const {
    resolveAnnouncement,
    makeAnnouncementActive,
    archiveAnnouncement,
    drawChangeStatusErrorModal,
    drawSuccessfullyChangeAnnouncementStatusModal,
  } = useChangeAnnouncementStatus(announcement);

  const confirmationHandler = () => {
    if (confirmationModalTitle === modalsMessages.ARCHIVE_ANNOUNCEMENT_CONFIRMATION) archiveAnnouncementHandler();
    else if (confirmationModalTitle === modalsMessages.MAKE_ANNOUNCEMENT_ACTIVE_CONFIRMATION) makeAnnouncementActiveHandler();
    else if (confirmationModalTitle === modalsMessages.RESOLVE_ANNOUNCEMENT_CONFIRMATION) resolveAnnouncementHandler();
  };

  const drawConfirmationModal = () => confirmationModalVisible && (
    <FModal
      type={modalTypes.CONFIRM_MODAL}
      setVisible={setConfirmationModalVisible}
      visible={confirmationModalVisible}
      title={confirmationModalTitle}
      onConfirm={confirmationHandler}
    />
  );

  const resolveAnnouncementHandler = async () => {
    await resolveAnnouncement();
    setVisible(false);
  };
  const makeAnnouncementActiveHandler = async () => {
    await makeAnnouncementActive();
    setVisible(false);
  };
  const archiveAnnouncementHandler = async () => {
    await archiveAnnouncement();
    setVisible(false);
  };

  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
    >
      <Pressable
        onPress={(event) => {
          event.preventDefault();
          if (event.target === ref.current) {
            setVisible(false);
          }
        }}
        style={{ flex: 1 }}
      >
        {drawSuccessfullyChangeAnnouncementStatusModal()}
        {drawChangeStatusErrorModal()}
        {drawConfirmationModal()}
        <View
          ref={ref}
          style={styles.modalContainer}
        >
          <FCard
            style={styles.card}
            paddingHorizontal={sizes.PADDING_35}
            paddingVertical={sizes.PADDING_35}
            width={sizes.WIDTH_70_PERCENTAGES}
          >
            {status !== AnnouncementStatusEnum.ARCHIVED && status !== AnnouncementStatusEnum.NOT_ACTIVE && (
              <FButton
                type={buttonTypes.TEXT_BUTTON}
                title={locales.EDIT}
                titleSize={fonts.HEADING_MEDIUM}
                titleWeight={fonts.HEADING_WEIGHT_MEDIUM}
                buttonViewStyles={styles.option}
                onPress={() => {
                  setVisible(false);
                  navigation.navigate(stackNavigatorNames.EDIT_ANNOUNCEMENT, { id });
                }}
              />
            )}
            {(status === AnnouncementStatusEnum.ARCHIVED || status === AnnouncementStatusEnum.NOT_ACTIVE) && (
              <FButton
                type={buttonTypes.TEXT_BUTTON}
                title={locales.ACTIVATE}
                titleSize={fonts.HEADING_MEDIUM}
                titleWeight={fonts.HEADING_WEIGHT_MEDIUM}
                color={colors.BLACK}
                onPress={() => {
                  setConfirmationModalTitle(modalsMessages.MAKE_ANNOUNCEMENT_ACTIVE_CONFIRMATION);
                  setConfirmationModalVisible(true);
                }}
              />
            )}
            {status !== AnnouncementStatusEnum.NOT_ACTIVE && status !== AnnouncementStatusEnum.ARCHIVED && (
              <FButton
                type={buttonTypes.TEXT_BUTTON}
                title={locales.ARCHIVE}
                color={colors.DANGER}
                titleSize={fonts.HEADING_MEDIUM}
                titleWeight={fonts.HEADING_WEIGHT_MEDIUM}
                buttonViewStyles={styles.option}
                onPress={() => {
                  setConfirmationModalTitle(modalsMessages.ARCHIVE_ANNOUNCEMENT_CONFIRMATION);
                  setConfirmationModalVisible(true);
                }}
              />
            )}
            {status !== AnnouncementStatusEnum.NOT_ACTIVE && status !== AnnouncementStatusEnum.ARCHIVED && (
              <FButton
                type={buttonTypes.TEXT_BUTTON}
                title={locales.FINISH}
                color={colors.PRIMARY}
                titleSize={fonts.HEADING_MEDIUM}
                titleWeight={fonts.HEADING_WEIGHT_MEDIUM}
                buttonViewStyles={styles.option}
                onPress={() => {
                  setConfirmationModalTitle(modalsMessages.RESOLVE_ANNOUNCEMENT_CONFIRMATION);
                  setConfirmationModalVisible(true);
                }}
              />
            )}
          </FCard>
        </View>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    padding: sizes.PADDING_30,
    backgroundColor: colors.OVERLAY_DARK,
    alignItems: placements.CENTER,
    justifyContent: placements.CENTER,
  },
  card: {
    alignItems: placements.CENTER,
  },
  option: {
    paddingVertical: sizes.PADDING_14,
  },
});

FAnnouncementCardActionsModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  setVisible: PropTypes.func.isRequired,
  announcement: PropTypes.shape({
    id: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
  }),
};
