import { Animated, TouchableOpacity, View } from 'react-native';
import opacities from 'themes/opacities';
import PropTypes from 'prop-types';
import { FHeading } from 'components/Composition/FHeading';
import fonts from 'themes/fonts';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import colors from 'themes/colors';
import sizes from 'themes/sizes';
import { calcPassedTime } from 'utils/calcPassedTime';
import { parseDate } from 'utils/parseDate';
import dateFormatTypes from 'constants/dateFormatTypes';
import { Ionicons } from '@expo/vector-icons';
import icons from 'themes/icons';
import locales from 'constants/locales';
import placements from 'themes/placements';
import { useNavigation } from '@react-navigation/native';
import stackNavigatorNames from 'constants/stackNavigatorNames';
import { FImageWithFullscreenPreview } from 'components/Composition/FImageWithFullscreenPreview';
import defaultBoxShadow from 'styles/defaultBoxShadow';

export const FChatMessage = ({
  message,
  sentDate,
  readDate,
  sender,
  nextMessageSender,
  isLastMessage,
  locationLat,
  locationLon,
  photos,
}) => {
  const me = useSelector((state) => state.me.me);
  const fadeAnimation = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();

  const [
    showSentDate,
    setShowSentDate,
  ] = useState(false);

  useEffect(() => {
    if (showSentDate) {
      fadeIn();
    } else {
      fadeOut();
    }
  }, [showSentDate]);

  const fadeIn = () => {
    Animated.timing(fadeAnimation, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
      delay: 100,
    })
      .start();
  };
  const fadeOut = () => {
    Animated.timing(fadeAnimation, {
      toValue: 0,
      duration: 100,
      useNativeDriver: true,
      delay: 100,
    })
      .start();
  };

  const toggleShowSentDate = () => {
    setShowSentDate(!showSentDate);
  };

  const isMyMessage = () => me.id === sender.id;

  const isSameSenderAsBefore = () => {
    if (!nextMessageSender) return false;
    if (nextMessageSender) {
      return sender.id === nextMessageSender.id;
    }
  };

  const getParsedDate = (date) => {
    const oneDay = (60 * 60 * 24) + new Date().getTime() / 1000;
    if (calcPassedTime(date) > oneDay) return parseDate(dateFormatTypes.TIME, date);
    return parseDate(dateFormatTypes.DATE_TIME, date);
  };

  const drawMessageContent = () => {
    if (message) {
      return (
        <FHeading
          size={fonts.HEADING_NORMAL}
          weight={fonts.HEADING_WEIGHT_MEDIUM}
          title={message}
          color={isMyMessage() ? colors.WHITE : colors.BLACK}
        />
      );
    }
    if (photos[0]) {
      const photo = photos[0];
      return (
        <TouchableOpacity>
          <View style={{
            width: sizes.WIDTH_FULL,
            height: sizes.HEIGHT_200,
            ...defaultBoxShadow,
          }}
          >
            <FImageWithFullscreenPreview
              key={photo.id}
              networkImageUrl={photo.url}
              imagePath=""
              height={sizes.WIDTH_FULL}
              width={sizes.HEIGHT_FULL}
              imageHeight={sizes.HEIGHT_FULL}
              imageWidth={sizes.WIDTH_FULL}
              resizeMode={sizes.COVER}
              isChildrenInside={false}
              photos={photos.map((p) => p.url)}
              canBeOpenAsFullscreen
            />
          </View>
        </TouchableOpacity>
      );
    }
    if (+locationLat !== 0 && +locationLon !== 0) {
      return (
        <TouchableOpacity onPress={(e) => {
          e.stopPropagation();
          navigation.navigate(stackNavigatorNames.MAP_PREVIEW_MODAL, {
            location: {
              longitude: locationLon,
              latitude: locationLat,
            },
            isInteractive: false,
            showLocationNameInput: false,
            showLocationDescriptionInput: false,
            hasConfirmButton: false,
          });
        }}
        >
          <View style={{
            flexDirection: 'row',
            alignItems: placements.CENTER,
          }}
          >
            <Ionicons
              name={icons.LOCATION_OUTLINE}
              size={sizes.ICON_22}
              color={isMyMessage() ? colors.WHITE : colors.BLACK}
              style={{ marginRight: sizes.MARGIN_5 }}
            />
            <FHeading
              size={fonts.HEADING_NORMAL}
              weight={fonts.HEADING_WEIGHT_MEDIUM}
              title={locales.SEE_LOCATION}
              color={isMyMessage() ? colors.WHITE : colors.BLACK}
            />
          </View>
        </TouchableOpacity>
      );
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={opacities.OPACITY_08}
      onPress={toggleShowSentDate}
    >
      <View style={{
        alignItems: isMyMessage() ? 'flex-end' : 'flex-start',
        marginBottom: isLastMessage ? 0 : isSameSenderAsBefore() ? sizes.MARGIN_8 : sizes.MARGIN_20,
      }}
      >
        <View style={{
          backgroundColor: photos[0] ? colors.TRANSPARENT : isMyMessage() ? colors.PRIMARY : colors.GRAY,
          padding: photos[0] ? 0 : sizes.PADDING_15,
          borderRadius: sizes.RADIUS_15,
          width: photos[0] ? sizes.WIDTH_HALF : sizes.WIDTH_80_PERCENTAGES,
        }}
        >
          {drawMessageContent()}

        </View>
        <Animated.View style={{
          marginVertical: fadeAnimation ? sizes.MARGIN_3 : 0,
          transform: [{ scale: fadeAnimation ? 1 : 0 }],
          opacity: fadeAnimation,
        }}
        >
          {showSentDate
            && (
              <FHeading
                size={fonts.HEADING_EXTRA_SMALL}
                weight={fonts.HEADING_WEIGHT_MEDIUM}
                color={colors.DARK_GRAY}
                title={getParsedDate(sentDate)}
              />
            )}
        </Animated.View>
        {(isMyMessage() && readDate && isLastMessage && !showSentDate) && (
          <View>
            <FHeading
              size={fonts.HEADING_EXTRA_SMALL}
              weight={fonts.HEADING_WEIGHT_MEDIUM}
              color={colors.DARK_GRAY}
              title={`${locales.DISPLAYED} ${getParsedDate(readDate)}`}
            />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

FChatMessage.propTypes = {
  message: PropTypes.string,
  sentDate: PropTypes.string.isRequired,
  readDate: PropTypes.string,
  nextMessageSender: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    profileImageUrl: PropTypes.string,
    lastLogin: PropTypes.string,
  }),
  sender: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    profileImageUrl: PropTypes.string,
    lastLogin: PropTypes.string,
  }).isRequired,
  isLastMessage: PropTypes.bool,
  locationLat: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  locationLon: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  photos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    url: PropTypes.string,
  })),
};
