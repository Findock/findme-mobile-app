import {
  StyleSheet, View, TouchableWithoutFeedback, Animated,
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

export const FAnnouncementCard = ({
  width, data, height,
}) => {
  const navigation = useNavigation();
  const animatedScale = useRef(new Animated.Value(1)).current;
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

  return (
    <TouchableWithoutFeedback
      onPress={() => navigation.push(stackNavigatorNames.ANNOUNCEMENT_PREVIEW, { id: data.id })}
      onLongPress={() => {
        if (data.isUserCreator) {
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
              announcementId={data.id}
            />
          )}
          <View style={{
            minHeight: height,
            maxHeight: height,
          }}
          >
            <FImage
              imagePath=""
              imageWidth={sizes.WIDTH_FULL}
              imageHeight={sizes.HEIGHT_FULL}
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
              style={{ marginTop: sizes.MARGIN_8 }}
              ellipsizeMode="tail"
              numberOfLines={1}
            />
            <FHeading
              title={data.description}
              style={{ marginVertical: sizes.MARGIN_5 }}
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
      </Animated.View>
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
    photos: PropTypes.arrayOf(PropTypes.string).isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    locationName: PropTypes.string.isRequired,
    isUserCreator: PropTypes.bool.isRequired,
  }),
};
