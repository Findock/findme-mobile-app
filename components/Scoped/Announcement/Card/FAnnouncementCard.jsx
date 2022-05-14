import {
  StyleSheet, View, TouchableWithoutFeedback, Animated, Dimensions,
} from 'react-native';
import { FImage } from 'components/Composition/FImage';
import sizes from 'themes/sizes';
import fonts from 'themes/fonts';
import { FHeading } from 'components/Composition/FHeading';
import React, { useRef, useState } from 'react';
import { FHeadingWithIcon } from 'components/Composition/FHeadingWithIcon';
import icons from 'themes/icons';
import colors from 'themes/colors';
import { FCard } from 'components/Composition/FCard';
import placements from 'themes/placements';
import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';
import stackNavigatorNames from 'constants/stackNavigatorNames';
import { FAnnouncementCardActionsModal } from 'components/Scoped/Announcement/Card/FAnnouncementCardActionsModal';
import { parseDate } from 'utils/parseDate';
import dateFormatTypes from 'constants/dateFormatTypes';
import { FBadge } from 'components/Composition/FBadge';
import AnnouncementStatusEnum from 'enums/AnnouncementStatusEnum';
import opacities from 'themes/opacities';
import locales from 'constants/locales';

export const FAnnouncementCard = ({
  width, data, height, style,
}) => {
  const navigation = useNavigation();
  const animatedScale = useRef(new Animated.Value(1)).current;
  const {
    id, isUserCreator, photos, title, description, locationName, createDate, status,
  } = data;
  const [
    showOptionsModal,
    setShowOptionsModal,
  ] = useState(false);

  const animate = () => {
    animatedScale.setValue(0.8);
    Animated.spring(animatedScale, {
      toValue: 1,
      bounciness: 1,
      useNativeDriver: true,
      speed: 1,
      delay: 50,
    }).start();
  };

  const getImageOpacity = () => (status === AnnouncementStatusEnum.NOT_ACTIVE || status === AnnouncementStatusEnum.ARCHIVED
    ? opacities.OPACITY_05 : opacities.OPACITY_1);

  const getBadgeColor = () => {
    if (status === AnnouncementStatusEnum.NOT_ACTIVE) return colors.SUCCESS;
    if (status === AnnouncementStatusEnum.ARCHIVED) return colors.DANGER;
  };

  const getBadgeStatusTitle = () => {
    if (status === AnnouncementStatusEnum.NOT_ACTIVE) return locales.FOUND_NONE;
    if (status === AnnouncementStatusEnum.ARCHIVED) return locales.FINISHED_NONE;
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => navigation.push(stackNavigatorNames.ANNOUNCEMENT_PREVIEW, { id })}
      onLongPress={() => {
        if (isUserCreator) {
          animate();
          setTimeout(() => {
            setShowOptionsModal(true);
          }, 250);
        }
      }}
    >
      <Animated.View style={{
        padding: sizes.PADDING_5,
        transform: [{ scale: animatedScale }],
        ...style,
      }}
      >
        <FCard
          width={width}
          paddingHorizontal={sizes.PADDING_10}
          paddingVertical={sizes.PADDING_10}
        >
          {showOptionsModal && (
            <FAnnouncementCardActionsModal
              visible={showOptionsModal}
              setVisible={setShowOptionsModal}
              announcement={data}
            />
          )}
          <View style={{
            minHeight: height,
            maxHeight: height,
            justifyContent: 'space-between',
          }}
          >
            <View>
              {(status === AnnouncementStatusEnum.ARCHIVED || status === AnnouncementStatusEnum.NOT_ACTIVE)
                 && (
                   <View style={{
                     ...styles.statusBadgeContainer,
                     top: (sizes.HEIGHT_150 / 2) - 10,
                   }}
                   >
                     <FBadge
                       title={getBadgeStatusTitle()}
                       isFill={false}
                       color={getBadgeColor()}
                       style={{ paddingHorizontal: Dimensions.get('window').width < 400 ? sizes.PADDING_3 : sizes.PADDING_8 }}
                     />
                   </View>
                 )}
              <FImage
                imagePath=""
                imageWidth={sizes.WIDTH_FULL}
                imageHeight={sizes.HEIGHT_FULL}
                networkImageUrl={photos[0].url}
                imageStyle={{
                  ...styles.image,
                  opacity: getImageOpacity(),
                }}
                height={sizes.HEIGHT_150}
                resizeMode={sizes.COVER}
                width={sizes.WIDTH_FULL}
                isChildrenInside={false}
              />
              <FHeading
                title={title}
                weight={fonts.HEADING_WEIGHT_BOLD}
                size={fonts.HEADING_MEDIUM}
                style={{ marginTop: sizes.MARGIN_8 }}
                ellipsizeMode="tail"
                numberOfLines={1}
              />
              <FHeading
                title={description}
                style={{ marginVertical: sizes.MARGIN_5 }}
                color={colors.DARK_GRAY}
                ellipsizeMode="tail"
                numberOfLines={2}
                size={fonts.HEADING_NORMAL}
                weight={fonts.HEADING_WEIGHT_REGULAR}
              />
            </View>
            <View>
              <FHeadingWithIcon
                icon={icons.LOCATION_OUTLINE}
                iconColor={colors.PRIMARY}
                title={locationName}
                titleStyle={styles.text}
                iconStyle={{ width: sizes.WIDTH_20 }}
                headingContainerStyle={{ flex: 1 }}
                titleColor={colors.DARK_GRAY}
                iconPlacement={placements.LEFT}
                iconSize={sizes.ICON_20}
                titleSize={fonts.HEADING_SMALL}
                titleWeight={fonts.HEADING_WEIGHT_REGULAR}
                ellipsizeMode="tail"
                numberOfLines={1}
              />
              <FHeadingWithIcon
                icon={icons.CALENDAR}
                iconColor={colors.PRIMARY}
                title={parseDate(dateFormatTypes.DATE, createDate)}
                titleStyle={styles.text}
                iconStyle={{ width: sizes.WIDTH_20 }}
                headingContainerStyle={{ flex: 1 }}
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
          </View>
        </FCard>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  image: {
    borderRadius: sizes.RADIUS_20,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginLeft: sizes.MARGIN_5,
  },
  statusBadgeContainer: {
    position: 'absolute',
    justifyContent: placements.CENTER,
    alignItems: placements.CENTER,
    width: sizes.WIDTH_FULL,
    opacity: opacities.OPACITY_1,
    zIndex: 1,
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
      id: PropTypes.number,
      url: PropTypes.string,
      created: PropTypes.string,
    })).isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    locationName: PropTypes.string.isRequired,
    isUserCreator: PropTypes.bool.isRequired,
    status: PropTypes.string.isRequired,
  }),
};
