import {
  StyleSheet, TouchableWithoutFeedback, View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import icons from 'themes/icons';
import sizes from 'themes/sizes';
import placements from 'themes/placements';

export const FCheckbox = ({
  checkboxColor, iconColor, value, setValue, style,
}) => {
  const getBackgroundColor = () => (value ? checkboxColor : 'transparent');

  return (
    <TouchableWithoutFeedback
      onPress={() => setValue(!value)}
      hitSlop={{
        top: sizes.POSITION_20,
        left: sizes.POSITION_20,
        bottom: sizes.POSITION_20,
        right: sizes.POSITION_20,
      }}
    >
      <View style={{
        ...style,
        ...styles.checkboxCointainer,
        borderColor: checkboxColor,
        backgroundColor: getBackgroundColor(),
      }}
      >
        {value && (
          <Ionicons
            name={icons.CHECKMARK_OUTLINE}
            size={sizes.ICON_22}
            style={styles.icon}
            color={iconColor}
          />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  checkboxCointainer: {
    borderWidth: sizes.BORDER_1,
    borderRadius: sizes.RADIUS_5,
    width: sizes.WIDTH_22,
    height: sizes.HEIGHT_22,
    alignItems: placements.CENTER,
    justifyContent: placements.CENTER,
  },
  icon: {
    top: sizes.POSITION_N1,
  },
});
