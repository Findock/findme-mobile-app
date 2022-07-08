import React from 'react';
import { StyleSheet, View } from 'react-native';
import { FHeading } from 'components/Composition/FHeading';
import fonts from 'themes/fonts';
import colors from 'themes/colors';
import PropTypes from 'prop-types';
import sizes from 'themes/sizes';
import placements from 'themes/placements';
import { FButton } from 'components/Buttons/FButton';
import buttonTypes from 'constants/components/buttonTypes';
import icons from 'themes/icons';
import { useNavigation } from '@react-navigation/native';

export const FModalHeader = ({
  title,
  hasConfirmButton,
  onConfirm,
}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <View>
          <FHeading
            size={fonts.HEADING_MEDIUM}
            weight={fonts.HEADING_WEIGHT_SEMIBOLD}
            title={title}
            color={colors.BLACK}
          />
        </View>
        <View style={styles.buttonsContainer}>
          {hasConfirmButton && (
            <FButton
              type={buttonTypes.ICON_BUTTON}
              buttonViewStyles={{
                padding: 0,
                marginRight: sizes.MARGIN_12,
              }}
              icon={icons.CHECKMARK_OUTLINE}
              color={colors.PRIMARY}
              iconSize={sizes.ICON_27}
              onPress={() => {
                onConfirm();
                navigation.goBack();
              }}
            />
          )}
          <FButton
            type={buttonTypes.ICON_BUTTON}
            buttonViewStyles={{ padding: 0 }}
            icon={icons.CLOSE_OUTLINE}
            color={colors.SECONDARY}
            iconSize={sizes.ICON_30}
            onPress={() => navigation.goBack()}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: sizes.WIDTH_FULL,
    padding: sizes.PADDING_20,
    height: sizes.HEIGHT_80,
    borderBottomWidth: sizes.BORDER_1,
    borderBottomColor: colors.GRAY,
    justifyContent: placements.CENTER,
  },
  rowContainer: {
    flexDirection: 'row',
    width: sizes.WIDTH_FULL,
    alignItems: placements.CENTER,
    justifyContent: 'space-between',
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
});

FModalHeader.propTypes = {
  title: PropTypes.string.isRequired,
  hasConfirmButton: PropTypes.bool.isRequired,
  onConfirm: PropTypes.func,
};
