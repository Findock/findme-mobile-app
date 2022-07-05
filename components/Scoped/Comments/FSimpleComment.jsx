import React from 'react';
import PropTypes from 'prop-types';
import {
  Dimensions, StyleSheet, TouchableOpacity, View,
} from 'react-native';
import { FAvatar } from 'components/Composition/FAvatar';
import { useSelector } from 'react-redux';
import sizes from 'themes/sizes';
import { FHeading } from 'components/Composition/FHeading';
import fonts from 'themes/fonts';
import placements from 'themes/placements';
import placeholders from 'constants/components/inputs/placeholders';
import colors from 'themes/colors';
import locales from 'constants/locales';
import { FButton } from 'components/Buttons/FButton';
import buttonTypes from 'constants/components/buttonTypes';
import icons from 'themes/icons';
import { FImageWithFullscreenPreview } from 'components/Composition/FImageWithFullscreenPreview';

export const FSimpleComment = ({
  comment,
  creator,
  showComments,
  commentsAmount,
}) => {
  const me = useSelector((state) => state.me.me);

  const drawPhotos = (photos) => photos.map((photo) => (
    <FImageWithFullscreenPreview
      key={photo.id}
      networkImageUrl={photo.url}
      imagePath=""
      height={sizes.WIDTH_30}
      width={sizes.HEIGHT_30}
      imageHeight={sizes.HEIGHT_FULL}
      imageWidth={sizes.WIDTH_FULL}
      containerStyle={{
        marginRight: sizes.MARGIN_8,
      }}
      resizeMode={sizes.COVER}
      isChildrenInside={false}
      photos={photos.map((x) => x.url)}
      canBeOpenAsFullscreen={false}
    />
  ));

  const renderContent = () => {
    if (!comment) {
      return (
        <FHeading
          title={placeholders.ADD_COMMENT}
          size={fonts.HEADING_NORMAL}
          align={placements.LEFT}
          weight={fonts.HEADING_WEIGHT_REGULAR}
          numberOfLines={2}
          ellipsizeMode="tail"
        />
      );
    }
    if (comment.comment?.trim()) {
      return (
        <FHeading
          title={comment.comment}
          size={fonts.HEADING_NORMAL}
          align={placements.LEFT}
          weight={fonts.HEADING_WEIGHT_REGULAR}
          numberOfLines={2}
          ellipsizeMode="tail"
        />
      );
    }
    if (comment?.photos.length > 0) {
      return (
        <View style={styles.photosContainer}>
          {drawPhotos(comment.photos)}
        </View>

      );
    }
    if (comment.locationLat !== null && comment.locationLon !== null) {
      return (
        <FHeading
          title={locales.LOCATION_SHARED}
          size={fonts.HEADING_NORMAL}
          align={placements.LEFT}
          weight={fonts.HEADING_WEIGHT_MEDIUM}
          color={colors.PRIMARY}
          numberOfLines={1}
          ellipsizeMode="tail"
        />
      );
    }
  };

  return (
    <TouchableOpacity onPress={showComments}>
      <View style={styles.container}>
        <View style={{
          ...styles.rowContainer,
          justifyContent: 'space-between',
        }}
        >
          <View style={styles.headingContainer}>
            <FHeading
              title={commentsAmount === 0 ? locales.COMMENTS : `${locales.COMMENTS} ${commentsAmount}`}
              size={fonts.HEADING_MEDIUM}
              align={placements.LEFT}
              weight={fonts.HEADING_WEIGHT_MEDIUM}
              numberOfLines={2}
              ellipsizeMode="tail"
            />
          </View>
          <FButton
            type={buttonTypes.ICON_BUTTON}
            icon={icons.EXPAND_OUTLINE}
            buttonViewStyles={{ padding: 0 }}
            iconSize={sizes.ICON_15}
          />
        </View>
        <View style={styles.rowContainer}>
          <View style={styles.avatarContainer}>
            <FAvatar
              size={sizes.WIDTH_35}
              imageUrl={commentsAmount === 0 ? me.profileImageUrl : creator?.profileImageUrl || ''}
              isEditable={false}
            />
          </View>
          <View style={{ width: sizes.BASIS_90_PERCENTAGES }}>
            {renderContent()}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    left: sizes.MARGIN_N30,
    borderTopWidth: sizes.BORDER_1,
    borderTopColor: colors.GRAY,
    paddingHorizontal: sizes.PADDING_15,
  },
  headingContainer: {
    paddingVertical: sizes.PADDING_20,
  },
  rowContainer: {
    width: sizes.WIDTH_FULL,
    flexDirection: 'row',
    alignItems: placements.CENTER,
  },
  avatarContainer: {
    width: sizes.BASIS_10_PERCENTAGES,
    marginRight: sizes.MARGIN_20,
  },
  photosContainer: {
    flexDirection: 'row',
    width: sizes.WIDTH_FULL,
  },
});

FSimpleComment.propTypes = {
  showComments: PropTypes.func.isRequired,
  commentsAmount: PropTypes.number.isRequired,
};
