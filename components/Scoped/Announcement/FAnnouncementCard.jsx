import { StyleSheet, View, TouchableWithoutFeedback } from 'react-native';
import { FImage } from 'components/Composition/FImage';
import sizes from 'themes/sizes';
import fonts from 'themes/fonts';
import { FHeading } from 'components/Composition/FHeading';
import React from 'react';
import { FHeadingWithIcon } from 'components/Composition/FHeadingWithIcon';
import icons from 'themes/icons';
import colors from 'themes/colors';
import { FCard } from 'components/Composition/FCard';
import placements from 'themes/placements';
import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';
import stackNavigatorNames from 'constants/stackNavigatorNames';
import { parseDate } from 'utils/parseDate';
import dateFormatTypes from 'constants/dateFormatTypes';

export const FAnnouncementCard = ({
  width, data, height,
}) => {
  const navigation = useNavigation();
  return (
    <TouchableWithoutFeedback onPress={() => navigation.push(stackNavigatorNames.ANNOUNCEMENT_PREVIEW, { id: data.id })}>
      <View style={{ padding: sizes.PADDING_5 }}>
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
              imageWidth={sizes.WIDTH_FULL}
              imageHeight={sizes.HEIGHT_FULL}
              networkImageUrl={data.photos[0].url}
              imageStyle={styles.image}
              height={sizes.HEIGHT_150}
              resizeMode={sizes.COVER}
              width={sizes.WIDTH_FULL}
            />
            <FHeading
              title={data.title}
              weight={fonts.HEADING_WEIGHT_BOLD}
              size={fonts.HEADING_MEDIUM}
              style={{ marginTop: sizes.MARGIN_8 }}
              ellipsizeMode="tail"
              numberOfLines={1}
            />
            <FHeading
              title={data.description}
              style={{ marginVertical: sizes.MARGIN_5 }}
              color={colors.DARK_GRAY}
              size={fonts.HEADING_NORMAL}
              weight={fonts.HEADING_WEIGHT_REGULAR}
              ellipsizeMode="tail"
              numberOfLines={2}
            />
            <FHeadingWithIcon
              icon={icons.LOCATION_OUTLINE}
              iconColor={colors.PRIMARY}
              title={data.locationName}
              titleStyle={styles.text}
              titleColor={colors.DARK_GRAY}
              iconPlacement={placements.LEFT}
              iconSize={sizes.ICON_20}
              titleSize={fonts.HEADING_SMALL}
              titleWeight={fonts.HEADING_WEIGHT_REGULAR}
              containerStyle={{ width: '90%' }}
              ellipsizeMode="tail"
              numberOfLines={1}
            />
            <FHeadingWithIcon
              icon={icons.CALENDAR}
              iconColor={colors.PRIMARY}
              title={parseDate(dateFormatTypes.DATE, data.createDate)}
              titleStyle={styles.text}
              titleColor={colors.DARK_GRAY}
              size={fonts.HEADING_MEDIUM}
              weight={fonts.HEADING_NORMAL}
              iconPlacement={placements.LEFT}
              iconSize={sizes.ICON_20}
              titleSize={fonts.HEADING_SMALL}
              titleWeight={fonts.HEADING_WEIGHT_REGULAR}
              ellipsizeMode="tail"
              numberOfLines={1}
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
  width: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  height: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    photos: PropTypes.arrayOf(PropTypes.shape({
      created: PropTypes.string,
      id: PropTypes.number,
      url: PropTypes.string,
    })).isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    locationName: PropTypes.string.isRequired,
  }),
};
