import { StyleSheet, View } from 'react-native';
import { FImage } from 'components/Composition/FImage';
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
import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';

export const FAnnouncementCard = ({
  width, data, height, link, titleStyle,
}) => {
  const navigation = useNavigation();
  return (
    <TouchableWithoutFeedback onPress={() => navigation.push(link)}>
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
              imagePath=""
              networkImageUrl={data.photos[0]}
              imageStyle={styles.image}
              height={sizes.HEIGHT_150}
              resizeMode={sizes.COVER}
              width={sizes.WIDTH_FULL}
            />
            <FHeading
              title={data.title}
              weight={fonts.HEADING_WEIGHT_BOLD}
              size={fonts.HEADING_MEDIUM}
              marginBottom={sizes.MARGIN_5}
              style={{
                marginTop: sizes.MARGIN_8,
                ...titleStyle,
              }}
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
              style={{ ...titleStyle }}
            />
            <FHeadingWithIcon
              icon={icons.LOCATION_OUTLINE}
              iconColor={colors.PRIMARY}
              title={data.locationName}
              titleStyle={[styles.text, ...titleStyle]}
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
              titleStyle={[styles.text, ...titleStyle]}
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
};

const styles = StyleSheet.create({
  image: {
    borderRadius: sizes.RADIUS_20,
    overflow: 'hidden',
  },
  text: {
    marginLeft: sizes.MARGIN_5,
  },
});

FAnnouncementCard.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  link: PropTypes.string.isRequired,
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    photos: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    locationName: PropTypes.string.isRequired,
  }),
};
