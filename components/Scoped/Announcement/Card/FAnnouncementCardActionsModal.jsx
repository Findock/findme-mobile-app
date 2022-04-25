import { FButton } from 'components/Buttons/FButton';
import { FCard } from 'components/Composition/FCard';
import buttonTypes from 'constants/components/buttonTypes';
import locales from 'constants/locales';
import React, { useRef } from 'react';
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

export const FAnnouncementCardActionsModal = ({ visible, setVisible, announcementId }) => {
  const ref = useRef(null);
  const navigation = useNavigation();
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
            <FButton
              type={buttonTypes.TEXT_BUTTON}
              title={locales.DELETE}
              color={colors.DANGER}
              titleSize={fonts.HEADING_MEDIUM}
              titleWeight={fonts.HEADING_WEIGHT_MEDIUM}
              buttonViewStyles={styles.option}
            />
            <FButton
              type={buttonTypes.TEXT_BUTTON}
              title={locales.EDIT}
              titleSize={fonts.HEADING_MEDIUM}
              titleWeight={fonts.HEADING_WEIGHT_MEDIUM}
              buttonViewStyles={styles.option}
              onPress={() => {
                setVisible(false);
                navigation.navigate(stackNavigatorNames.EDIT_ANNOUNCEMENT, { id: announcementId });
              }}
            />
            <FButton
              type={buttonTypes.TEXT_BUTTON}
              title={locales.ARCHIVE}
              titleSize={fonts.HEADING_MEDIUM}
              titleWeight={fonts.HEADING_WEIGHT_MEDIUM}
            />
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
  announcementId: PropTypes.number.isRequired,
};
