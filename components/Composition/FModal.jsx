import { FButton } from 'components/Buttons/FButton';
import { FCard } from 'components/Composition/FCard';
import { FHeading } from 'components/Composition/FHeading';
import buttonTypes from 'constants/components/buttonTypes';
import locales from 'constants/locales';
import modalTypes from 'constants/components/modalTypes';
import React, { useRef } from 'react';
import {
  Modal, StyleSheet, View, Pressable,
} from 'react-native';
import colors from 'themes/colors';
import fonts from 'themes/fonts';
import placements from 'themes/placements';
import sizes from 'themes/sizes';

export const FModal = ({
  title, type, visible, setVisible, onCancel = () => { }, onConfirm = () => { }, onContinue = () => { }, onFirstChoice = () => { },
  onSecondChoice = () => {}, onClose = () => {}, firstChoice, secondChoice,
}) => {
  const ref = useRef(null);

  const renderButtonsByModalType = () => {
    if (type === modalTypes.INFO_MODAL) {
      return (
        <FButton
          title={locales.CONTINUE}
          type={buttonTypes.TEXT_BUTTON}
          backgroundColor={colors.PRIMARY}
          color={colors.WHITE}
          titleWeight={fonts.HEADING_WEIGHT_MEDIUM}
          titleSize={fonts.HEADING_SMALL}
          onPress={() => {
            onContinue();
            setVisible(false);
          }}
        />
      );
    }
    if (type === modalTypes.CONFIRM_MODAL) {
      return (
        <>
          <FButton
            title={locales.CANCEL}
            type={buttonTypes.OUTLINE_TEXT_BUTTON}
            color={colors.PRIMARY}
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
            backgroundColor={colors.PRIMARY}
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
    }
    return (
      <>
        <FButton
          title={firstChoice}
          type={buttonTypes.TEXT_BUTTON}
          backgroundColor={colors.PRIMARY}
          color={colors.WHITE}
          titleWeight={fonts.HEADING_WEIGHT_BOLD}
          titleSize={fonts.HEADING_SMALL}
          buttonViewStyles={styles.firstButton}
          onPress={() => {
            onFirstChoice();
            setVisible(false);
          }}
        />
        <FButton
          title={secondChoice}
          type={buttonTypes.TEXT_BUTTON}
          backgroundColor={colors.SECONDARY}
          color={colors.WHITE}
          titleWeight={fonts.HEADING_WEIGHT_BOLD}
          titleSize={fonts.HEADING_SMALL}
          onPress={() => {
            onSecondChoice();
            setVisible(false);
          }}
        />
      </>
    );
  };

  return (

    <Modal
      animationType="fade"
      visible={visible}
      transparent
      onRequestClose={() => {
        onClose();
        setVisible(false);
      }}
    >
      <Pressable
        onPress={(event) => {
          event.preventDefault();
          if (event.target === ref.current) {
            onClose();
            setVisible(false);
          }
        }}
        style={styles.outsideModal}
      >
        <View
          ref={ref}
          style={styles.modalContainer}
        >
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
              color={colors.DARK_GRAY}
              align={placements.CENTER}
              style={{ marginTop: type === modalTypes.MAKE_CHOICE_MODAL ? sizes.MARGIN_10 : 0 }}
            />
            <View style={styles.buttonsContainer}>
              {renderButtonsByModalType()}
            </View>
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
  closeIconButton: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  outsideModal: {
    flex: 1,
  },
});
