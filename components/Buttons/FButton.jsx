import { FHeading } from 'components/Composition/FHeading';
import { TouchableWithoutFeedback, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import buttonTypes from 'constants/buttonTypes';
import sizes from 'themes/sizes';
import colors from 'themes/colors';
import placements from 'themes/placements';

export const FButton = ({
  type, icon = '', title = '', navigation, to, color, titleSize, titleWeight, iconSize, onPress, buttonViewStyles,
}) => {
  const drawLinkButton = () => (
    <TouchableWithoutFeedback onPress={() => { navigation.push(to); }}>
      <View style={buttonViewStyles}>
        <FHeading
          title={title}
          color={color}
          size={titleSize}
          weight={titleWeight}
        />
      </View>
    </TouchableWithoutFeedback>
  );
  const drawIconButton = () => (
    <TouchableWithoutFeedback onPress={onPress}>
      <Ionicons
        name={icon}
        color={color}
        size={iconSize}
      />
    </TouchableWithoutFeedback>
  );
  const drawTextButton = () => (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.buttonContainer}>
        <View style={buttonViewStyles}>
          <FHeading
            title={title}
            color={color}
            size={titleSize}
            weight={titleWeight}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
  const drawIconAndTextButton = () => (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.buttonContainer}>
        <View style={buttonViewStyles}>
          <FHeading
            title={title}
            color={color}
            size={titleSize}
            weight={titleWeight}
          />
        </View>
        <Ionicons
          name={icon}
          color={color}
          size={iconSize}
          style={{ marginLeft: sizes.MARGIN_8 }}
        />

      </View>
    </TouchableWithoutFeedback>
  );

  const drawButtonByType = () => {
    switch (type) {
    case buttonTypes.BUTTON_WITH_ICON_AND_TEXT:
      return drawIconAndTextButton();
    case buttonTypes.ICON_BUTTON:
      return drawIconButton();
    case buttonTypes.LINK_BUTTON:
      return drawLinkButton();
    case buttonTypes.TEXT_BUTTON:
      return drawTextButton();
    default:
    }
  };

  return drawButtonByType();
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    borderRadius: sizes.RADIUS_20,
    backgroundColor: colors.GREEN,
    paddingVertical: sizes.PADDING_12,
    paddingHorizontal: sizes.PADDING_20,
    alignItems: placements.CENTER,
  },
});
