import { StyleSheet, View } from 'react-native';
import { FImage } from 'components/Composition/FImage';
import { getHalfBorderRadius } from 'utils/getHalfBorderRadius';
import colors from 'themes/colors';
import sizes from 'themes/sizes';
import opacities from 'themes/opacities';
import fonts from 'themes/fonts';
import { FHeading } from 'components/Composition/FHeading';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import icons from 'themes/icons';
import { TouchableWithoutFeedback } from 'react-native-web';

export const FAnnouncementCard = ({ height, width, data }) => (
  <TouchableWithoutFeedback>
    <View style={{
      height,
      width,
      ...styles.container,
    }}
    >
      <FImage
        networkImageUrl={data.photoURL}
        imageStyle={styles.image}
        containerStyle={styles.imageContainer}
      />
      <FHeading
        title={data.title}
        size={fonts.HEADING_MEDIUM}
        weight={fonts.HEADING_WEIGHT_BOLD}
        style={styles.text}
        marginBottom={sizes.MARGIN_5}
      />
      <View style={styles.infoContainer}>
        <Ionicons
          size={sizes.ICON_20}
          name={icons.LOCATION_OUTLINE}
          color={colors.PRIMARY}
        />
        <FHeading
          color={colors.DARK_GRAY}
          title={data.locationName}
          size={fonts.HEADING_NORMAL}
          style={styles.text}
        />
      </View>
      <View style={styles.infoContainer}>
        <Ionicons
          size={sizes.ICON_20}
          name={icons.CALENDAR}
          color={colors.PRIMARY}
        />
        <FHeading
          color={colors.DARK_GRAY}
          title={data.date}
          size={fonts.HEADING_NORMAL}
          style={styles.text}
        />
      </View>
    </View>
  </TouchableWithoutFeedback>
);

const styles = StyleSheet.create({
  container: {
    margin: sizes.MARGIN_5,
    padding: sizes.PADDING_10,
    borderRadius: getHalfBorderRadius(50),
    backgroundColor: colors.WHITE,
    elevation: sizes.ELEVATION_3,
    shadowOffset: {
      width: 0,
      height: sizes.HEIGHT_1,
    },
    shadowOpacity: opacities.SHADOW_OPACITY_025,
    shadowRadius: sizes.SHADOW_RADIUS_2,
    shadowColor: colors.BLACK,
  },
  imageContainer: {
    height: '60%',
    marginBottom: sizes.MARGIN_10,
  },
  image: {
    resizeMode: 'contain',
    borderRadius: getHalfBorderRadius(50),
    overflow: 'hidden',
  },
  text: {
    marginLeft: sizes.MARGIN_5,
  },
  infoContainer: {
    marginLeft: sizes.MARGIN_5,
    marginVertical: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
