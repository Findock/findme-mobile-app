import React, { useRef } from 'react';
import {
  Modal, Pressable, View, StyleSheet, Platform,
} from 'react-native';
import colors from 'themes/colors';
import { FCard } from 'components/Composition/FCard';
import sizes from 'themes/sizes';
import { FButton } from 'components/Buttons/FButton';
import buttonTypes from 'constants/components/buttonTypes';
import icons from 'themes/icons';
import locales from 'constants/locales';
import placements from 'themes/placements';
import fonts from 'themes/fonts';
import PropTypes from 'prop-types';

export const FCommentActionsModal = ({
  canEdit, canDelete, visible, setVisible,
}) => {
  const ref = useRef(null);

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
            {canEdit && (
              <View style={styles.actionButtonContainer}>
                <FButton
                  type={buttonTypes.BUTTON_WITH_ICON_AND_TEXT}
                  icon={icons.PENCIL}
                  iconSize={sizes.ICON_22}
                  title={locales.EDIT}
                  iconPlacement={placements.LEFT}
                  titleSize={fonts.HEADING_NORMAL}
                  titleWeight={fonts.HEADING_WEIGHT_MEDIUM}
                  buttonViewStyles={styles.button}
                />
              </View>
            )}
            {canDelete && (
              <View style={styles.actionButtonContainer}>
                <FButton
                  type={buttonTypes.BUTTON_WITH_ICON_AND_TEXT}
                  icon={icons.TRASH}
                  iconSize={sizes.ICON_22}
                  title={locales.DELETE}
                  iconPlacement={placements.LEFT}
                  titleSize={fonts.HEADING_NORMAL}
                  titleWeight={fonts.HEADING_WEIGHT_MEDIUM}
                  buttonViewStyles={styles.button}
                />
              </View>
            )}
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

FCommentActionsModal.propTypes = {
  canEdit: PropTypes.bool.isRequired,
  canDelete: PropTypes.bool.isRequired,
};
