import { FButton } from 'components/Buttons/FButton';
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
import placements from 'themes/placements';
import sizes from 'themes/sizes';

export const FModal = ({
  title, type, visible, setVisible,
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
          onPress={() => setVisible(false)}
        />
      );
    }

    return (
      <>
        <FButton
          title={locales.CANCEL}
          type={buttonTypes.TEXT_BUTTON}
          backgroundColor={colors.LIGHT_RED}
          color={colors.WHITE}
          titleWeight={fonts.HEADING_WEIGHT_MEDIUM}
          titleSize={fonts.HEADING_SMALL}
          buttonViewStyles={styles.firstButton}
          onPress={() => setVisible(false)}
        />
        <FButton
          title={locales.CONFIRM}
          type={buttonTypes.TEXT_BUTTON}
          backgroundColor={colors.LIGHT_GREEN}
          color={colors.WHITE}
          titleWeight={fonts.HEADING_WEIGHT_MEDIUM}
          titleSize={fonts.HEADING_SMALL}
          onPress={() => setVisible(false)}
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
          <View style={styles.modalView}>
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
          </View>
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
    marginTop: 30,
    backgroundColor: colors.WHITE,
    borderRadius: sizes.RADIUS_20,
    padding: sizes.PADDING_35,
    alignItems: placements.CENTER,
    shadowColor: colors.BLACK,
    shadowOffset: {
      width: sizes.WIDTH_0,
      height: sizes.HEIGHT_2,
    },
    shadowOpacity: sizes.SHADOW_OPACITY_025,
    shadowRadius: sizes.SHADOW_RADIUS_4,
    elevation: sizes.ELEVATION_5,
    width: sizes.WIDTH_FULL,
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
