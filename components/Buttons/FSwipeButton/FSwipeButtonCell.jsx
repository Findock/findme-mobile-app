import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from 'themes/colors';
import icons from 'themes/icons';
import sizes from 'themes/sizes';
import locales from 'constants/locales';
import placements from 'themes/placements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import swipeButtonCellActionTypes from 'constants/components/swipeButtonCellActionTypes';
import swipeButtonCellTypes from 'constants/components/swipeButtonCellTypes';

export const FSwipeButtonCell = ({
  cellType, cellAction, onActionPress,
}) => {
  const getIconByCellAction = () => {
    switch (cellAction) {
    case swipeButtonCellActionTypes.DELETE:
      return icons.TRASH;
    default: return '';
    }
  };

  const getTitleByCellAction = () => {
    switch (cellAction) {
    case swipeButtonCellActionTypes.DELETE:
      return locales.DELETE;
    default: return '';
    }
  };

  const getColorByCellAction = () => {
    switch (cellAction) {
    case swipeButtonCellActionTypes.DELETE:
      return colors.DANGER;
    default: return '';
    }
  };

  const drawIconCell = () => (
    <TouchableOpacity onPress={onActionPress}>
      <View style={{
        ...styles.cellContainer,
        backgroundColor: getColorByCellAction(),
      }}
      >
        <Ionicons
          name={getIconByCellAction()}
          color={colors.WHITE}
          size={sizes.ICON_20}
        />
      </View>
    </TouchableOpacity>
  );
  const drawTextCell = () => (
    <TouchableOpacity onPress={onActionPress}>
      <View style={{
        ...styles.cellContainer,
        backgroundColor: getColorByCellAction(),
      }}
      >
        <Text style={styles.title}>{getTitleByCellAction()}</Text>
      </View>
    </TouchableOpacity>
  );
  const drawTextWithIconCell = () => (
    <TouchableOpacity onPress={onActionPress}>
      <View style={{
        ...styles.cellContainer,
        backgroundColor: getColorByCellAction(),
      }}
      >
        <Ionicons
          name={getIconByCellAction()}
          color={colors.WHITE}
          size={sizes.ICON_20}
        />
        <Text style={styles.title}>{getTitleByCellAction()}</Text>
      </View>
    </TouchableOpacity>
  );

  const drawCellByType = () => {
    switch (cellType) {
    case swipeButtonCellTypes.ICON:
      return drawIconCell();
    case swipeButtonCellTypes.TEXT:
      return drawTextCell();
    case swipeButtonCellTypes.ICON_WITH_TEXT:
    default:
      return drawTextWithIconCell();
    }
  };

  return drawCellByType();
};

const styles = StyleSheet.create({
  cellContainer: {
    paddingHorizontal: sizes.PADDING_20,
    alignItems: placements.CENTER,
    justifyContent: placements.CENTER,
    height: sizes.HEIGHT_FULL,
  },
  title: {
    color: colors.WHITE,
  },
});
