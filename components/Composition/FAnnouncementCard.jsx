import { StyleSheet, View } from 'react-native';
import { FImage } from 'components/Composition/FImage';
import { getHalfBorderRadius } from 'utils/getHalfBorderRadius';
import sizes from 'themes/sizes';
import fonts from 'themes/fonts';
import { FHeading } from 'components/Composition/FHeading';
import React from 'react';
import { TouchableWithoutFeedback } from 'react-native-web';
import { FHeadingWithIcon } from 'components/Composition/FHeadingWithIcon';
import icons from 'themes/icons';
import colors from 'themes/colors';
import { FCard } from 'components/Composition/FCard';
import placements from 'themes/placements';
import images from 'constants/images';

export const FAnnouncementCard = ({ width, data, height }) => (
  <TouchableWithoutFeedback>
    <View style={{
      padding: sizes.PADDING_5,
    }}
    >
      <FCard
        width={width}
        paddingHorizontal={sizes.PADDING_10}
        paddingVertical={sizes.PADDING_10}
      >
        <View style={{
          minHeight: height,
          maxHeight: height,
        }}
        >
          <FImage
            imagePath={images.RABBIT_BLACK()}
            imageStyle={styles.image}
            height={sizes.HEIGHT_150}
            resizeMode="cover"
            width="100%"
          />
          <FHeading
            title={data.title}
            weight={fonts.HEADING_WEIGHT_BOLD}
            size={fonts.HEADING_MEDIUM}
            marginBottom={sizes.MARGIN_5}
            style={{ marginTop: sizes.MARGIN_8 }}
            ellipsizeMode="tail"
            numberOfLines={1}
          />
          <FHeading
            title={data.description}
            marginBottom={sizes.MARGIN_10}
            color={colors.DARK_GRAY}
            ellipsizeMode="tail"
            numberOfLines={2}
            size={fonts.HEADING_NORMAL}
            weight={fonts.HEADING_WEIGHT_REGULAR}
          />
          <FHeadingWithIcon
            icon={icons.LOCATION_OUTLINE}
            iconColor={colors.PRIMARY}
            title={data.locationName}
            titleStyle={styles.text}
            titleColor={colors.DARK_GRAY}
            numberOfLines={2}
            iconPlacement={placements.LEFT}
            iconSize={sizes.ICON_20}
            titleSize={fonts.HEADING_SMALL}
            titleWeight={fonts.HEADING_WEIGHT_REGULAR}
          />
          <FHeadingWithIcon
            icon={icons.CALENDAR}
            iconColor={colors.PRIMARY}
            title={data.date}
            titleStyle={styles.text}
            titleColor={colors.DARK_GRAY}
            size={fonts.HEADING_MEDIUM}
            weight={fonts.HEADING_NORMAL}
            iconPlacement={placements.LEFT}
            iconSize={sizes.ICON_20}
            titleSize={fonts.HEADING_SMALL}
            titleWeight={fonts.HEADING_WEIGHT_REGULAR}
          />
        </View>
      </FCard>
    </View>
  </TouchableWithoutFeedback>
);

const styles = StyleSheet.create({
  image: {
    borderRadius: getHalfBorderRadius(sizes.RADIUS_20),
    overflow: 'hidden',
  },
  text: {
    marginLeft: sizes.MARGIN_5,
  },
});
