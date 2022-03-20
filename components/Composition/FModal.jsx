import { FButton } from 'components/Buttons/FButton';
import { FCard } from 'components/Composition/FCard';
import { FHeading } from 'components/Composition/FHeading';
import buttonTypes from 'constants/buttonTypes';
import locales from 'constants/locales';
import modalTypes from 'constants/modalTypes';
import React from 'react';
import {
  Modal, StyleSheet, View,
} from 'react-native';
import colors from 'themes/colors';
import fonts from 'themes/fonts';
import opacities from 'themes/opacities';
import placements from 'themes/placements';
import sizes from 'themes/sizes';

export const FModal = ({
  title, type, visible, setVisible, onCancel = () => { }, onConfirm = () => { }, onContinue = () => { },
}) => {
  const renderButtonsByModalType = () => {
    if (type === modalTypes.INFO_MODAL) {
      return (
        <FButton
          title={locales.CONTINUE}
          type={buttonTypes.TEXT_BUTTON}
          backgroundColor={colors.DARK_GRAY}
          color={colors.WHITE}
          titleWeight={fonts.HEADING_WEIGHT_MEDIUM}
          titleSize={fonts.HEADING_SMALL}
          onPress={() => {
            setVisible(false);
            onContinue();
          }}
        />
      );
    }

    return (
      <>
        <FButton
          title={locales.CANCEL}
          type={buttonTypes.OUTLINE_TEXT_BUTTON}
          color={colors.GREEN}
          titleWeight={fonts.HEADING_WEIGHT_BOLD}
          titleSize={fonts.HEADING_SMALL}
          buttonViewStyles={styles.firstButton}
          onPress={() => {
            onCancel();
            setVisible(false);
          }}
        />
        <FButton
          title={locales.CONFIRM}
          type={buttonTypes.TEXT_BUTTON}
          backgroundColor={colors.GREEN}
          color={colors.WHITE}
          titleWeight={fonts.HEADING_WEIGHT_BOLD}
          titleSize={fonts.HEADING_SMALL}
          onPress={() => {
            onConfirm();
            setVisible(false);
          }}
        />
      </>
    );
  };
  return (
    <View style={{ flex: 1 }}>
      <Modal
        animationType="fade"
        visible={visible}
        transparent
      >
        <View style={styles.modalContainer}>
          <FCard
            style={styles.modalView}
            paddingHorizontal={sizes.PADDING_35}
            paddingVertical={sizes.PADDING_35}
            width={sizes.WIDTH_FULL}
          >
            <FHeading
              title={title}
              size={fonts.HEADING_NORMAL}
              weight={fonts.HEADING_WEIGHT_MEDIUM}
              color={colors.BLACK}
              align={placements.CENTER}
            />
            <View style={styles.buttonsContainer}>
              {renderButtonsByModalType()}
            </View>
          </FCard>
        </View>
      </Modal>
    </View>
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
  modalView: {
    marginTop: sizes.MARGIN_30,
    alignItems: placements.CENTER,
  },
  buttonsContainer: {
    marginTop: sizes.MARGIN_20,
    alignItems: placements.CENTER,
    flexDirection: 'row',
    justifyContent: placements.CENTER,
    width: sizes.WIDTH_FULL,
  },
  firstButton: {
    marginRight: sizes.MARGIN_10,
  },
});
