import {
  Modal, Platform, Pressable, StyleSheet, View,
} from 'react-native';
import { FCard } from 'components/Composition/FCard';
import sizes from 'themes/sizes';
import { FButton } from 'components/Buttons/FButton';
import buttonTypes from 'constants/components/buttonTypes';
import placements from 'themes/placements';
import fonts from 'themes/fonts';
import React, { useRef } from 'react';
import colors from 'themes/colors';
import PropTypes from 'prop-types';
import icons from 'themes/icons';
import locales from 'constants/locales';

export const FActionsModal = ({
  visible,
  setVisible,
  actions,
}) => {
  const ref = useRef(null);

  const drawActionsButtons = () => actions.map((action, index) => (
    action.visible && (
      <View
        style={[styles.actionButtonContainer]}
        key={index}
      >
        <FButton
          type={buttonTypes.BUTTON_WITH_ICON_AND_TEXT}
          icon={action.actionIcon}
          iconSize={sizes.ICON_30}
          title={action.actionName}
          iconPlacement={placements.LEFT}
          titleSize={fonts.HEADING_NORMAL}
          titleWeight={fonts.HEADING_WEIGHT_MEDIUM}
          buttonViewStyles={styles.button}
          onPress={() => {
            action.action();
            setVisible(false);
          }}
        />
      </View>
    )
  ));
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
            paddingHorizontal={0}
            paddingVertical={0}
            width={sizes.WIDTH_FULL}
            rounded={false}
          >
            {drawActionsButtons()}
            <View style={[styles.actionButtonContainer, styles.lastActionButtonContainer]}>
              <FButton
                type={buttonTypes.BUTTON_WITH_ICON_AND_TEXT}
                icon={icons.CLOSE_OUTLINE}
                iconSize={sizes.ICON_30}
                title={locales.CANCEL}
                iconPlacement={placements.LEFT}
                titleSize={fonts.HEADING_NORMAL}
                titleWeight={fonts.HEADING_WEIGHT_MEDIUM}
                buttonViewStyles={{
                  ...styles.button,
                  marginLeft: sizes.MARGIN_N4,
                }}
                onPress={() => setVisible(false)}
              />
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
    backgroundColor: colors.OVERLAY_DARK,
    justifyContent: 'flex-end',
  },
  actionButtonContainer: {
    width: sizes.WIDTH_FULL,
    borderBottomColor: colors.GRAY,
    borderBottomWidth: sizes.BORDER_1,
    justifyContent: 'flex-start',
  },
  lastActionButtonContainer: {
    borderBottomWidth: 0,
    paddingBottom: Platform.OS === 'android' ? 0 : sizes.PADDING_20,
  },
  button: {
    justifyContent: 'flex-start',
  },
});

FActionsModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  setVisible: PropTypes.func.isRequired,
  actions: PropTypes.arrayOf(PropTypes.shape({
    action: PropTypes.func.isRequired,
    actionName: PropTypes.string.isRequired,
    actionIcon: PropTypes.string.isRequired,
    visible: PropTypes.bool.isRequired,
  })).isRequired,
};
