import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet, View, TouchableOpacity, Dimensions,
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

export const FSimpleComment = ({
  comment, creator, showComments, commentsAmmount,
}) => {
  const me = useSelector((state) => state.me.me);

  return (
    <View style={styles.container}>
      <View style={{
        ...styles.rowContainer,
        justifyContent: 'space-between',
      }}
      >
        <View style={styles.headingContainer}>
          <FHeading
            title={commentsAmmount === 0 ? locales.COMMENTS : `${locales.COMMENTS} ${commentsAmmount}`}
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
      <TouchableOpacity onPress={showComments}>
        <View style={styles.rowContainer}>
          <View style={styles.avatarContainer}>
            <FAvatar
              size={sizes.WIDTH_35}
              imageUrl={commentsAmmount === 0 ? me.profileImageUrl : creator.profileImageUrl}
            />
          </View>
          <View style={{ width: sizes.BASIS_90_PERCENTAGES }}>
            <FHeading
              title={commentsAmmount === 0 ? placeholders.ADD_COMMENT : comment}
              size={fonts.HEADING_NORMAL}
              align={placements.LEFT}
              weight={fonts.HEADING_WEIGHT_REGULAR}
              numberOfLines={2}
              ellipsizeMode="tail"
            />
          </View>
        </View>
      </TouchableOpacity>
    </View>
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
});

FSimpleComment.propTypes = {
  comment: PropTypes.string,
  creator: PropTypes.shape({
    profileImageUrl: PropTypes.string,
  }),
  showComments: PropTypes.func.isRequired,
  commentsAmmount: PropTypes.number.isRequired,
};
