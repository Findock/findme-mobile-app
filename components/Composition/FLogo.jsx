import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import sizes from 'themes/sizes';
import { FHeading } from 'components/Composition/FHeading';
import locales from 'constants/locales';
import icons from 'themes/icons';
import fonts from 'themes/fonts';

export const FLogo = ({ color, fill }) => {
  const getIconName = () => (fill ? icons.PAW : icons.PAW_OUTLINE);

  return (
    <View style={styles.logoContainer}>
      <Ionicons
        size={sizes.ICON_25}
        name={getIconName()}
        color={color}
        style={styles.icon}
      />
      <FHeading
        title={locales.FIND_ME}
        color={color}
        weight={fonts.HEADING_WEIGHT_SEMIBOLD}
        size={fonts.HEADING_LARGE}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  logoContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: sizes.MARGIN_5,
  },
});
