import { StyleSheet, View } from 'react-native';
import { FImage } from 'components/Composition/FImage';
import { getHalfBorderRadius } from 'utils/getHalfBorderRadius';
import colors from 'themes/colors';
import sizes from 'themes/sizes';
import opacities from 'themes/opacities';
import fonts from 'themes/fonts';
import { FHeading } from 'components/Composition/FHeading';
import React from 'react';
import { TouchableWithoutFeedback } from 'react-native-web';
import { FHeadingWithIcon } from 'components/Composition/FHeadingWithIcon';
import placements from 'themes/placements';
import icons from 'themes/icons';

export const FAnnouncementCard = ({ width, data }) => {
  const cropText = (text, number) => `${text.slice(0, width / number)}...`;
  return (
    <TouchableWithoutFeedback>
      <View style={{
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
          title={cropText(data.title, 12)}
          size={fonts.HEADING_MEDIUM}
          weight={fonts.HEADING_WEIGHT_BOLD}
          marginBottom={sizes.MARGIN_5}
        />
        <FHeading
          title={cropText(data.description, 5)}
          size={fonts.HEADING_NORMAL}
          color={colors.DARK_GRAY}
          marginBottom={sizes.MARGIN_5}
        />
        <FHeadingWithIcon
          titleStyle={{ marginLeft: sizes.MARGIN_5 }}
          icon={icons.LOCATION_OUTLINE}
          iconColor={colors.PRIMARY}
          title={data.locationName}
          iconPlacement={placements.LEFT}
          titleColor={colors.DARK_GRAY}
          containerStyle={placements.LEFT}
        />
        <FHeadingWithIcon
          titleStyle={{ marginLeft: sizes.MARGIN_5 }}
          icon={icons.CALENDAR}
          iconColor={colors.PRIMARY}
          title={data.date}
          iconPlacement={placements.LEFT}
          titleColor={colors.DARK_GRAY}
          containerStyle={placements.LEFT}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 'auto',
    margin: sizes.MARGIN_5,
    padding: sizes.PADDING_10,
    borderRadius: getHalfBorderRadius(50),
    backgroundColor: colors.WHITE,
    elevation: sizes.ELEVATION_3,
    shadowOffset: {
      width: 0,
      height: sizes.HEIGHT_1,
    },
    shadowOpacity: opacities.SHADOW_OPACITY_020,
    shadowRadius: sizes.SHADOW_RADIUS_2,
    shadowColor: colors.BLACK,
  },
  imageContainer: {
    height: sizes.HEIGHT_150,
    marginBottom: sizes.MARGIN_10,
  },
  image: {
    borderRadius: getHalfBorderRadius(50),
    overflow: 'hidden',
  },
});
