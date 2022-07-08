import { StyleSheet, View } from 'react-native';
import sizes from 'themes/sizes';
import colors from 'themes/colors';
import { FAvatar } from 'components/Composition/FAvatar';
import { FHeading } from 'components/Composition/FHeading';
import fonts from 'themes/fonts';
import { FStatus } from 'components/Composition/FStatus';
import statusTypes from 'constants/components/statusTypes';
import placements from 'themes/placements';
import defaultBoxShadow from 'styles/defaultBoxShadow';
import { getHalfBorderRadius } from 'styles/utils/getHalfBorderRadius';
import PropTypes from 'prop-types';
import { parseDate } from 'utils/parseDate';
import dateFormatTypes from 'constants/dateFormatTypes';
import { calcPassedTime } from 'utils/calcPassedTime';

export const FChatListItem = ({
  sender,
  message,
  unreadCount,
  sentDate,
}) => {
  const getSentDate = () => {
    const oneWeek = (60 * 60 * 24 * 7) + new Date().getTime() / 1000;
    if (calcPassedTime(sentDate) <= Math.floor(oneWeek)) {
      return parseDate(dateFormatTypes.HOW_LONG_AGO, sentDate);
    }
    return parseDate(dateFormatTypes.DATE, sentDate);
  };
  const isSenderOnline = () => new Date().getTime() === new Date(sender.lastLogin).getTime();

  return (
    <View style={styles.container}>
      <View style={{ flexBasis: sizes.BASIS_20_PERCENTAGES }}>
        <FAvatar
          size={sizes.WIDTH_50}
          isEditable={false}
          imageUrl={sender?.profileImageUrl}
        />
      </View>
      <View style={{ flexBasis: sizes.BASIS_80_PERCENTAGES }}>
        <View style={styles.middleContainer}>
          <View style={styles.topBox}>
            {isSenderOnline() && (
              <FStatus
                status={statusTypes.ACTIVE}
                style={{ marginRight: sizes.MARGIN_3 }}
              />
            )}
            <View style={{ paddingRight: sizes.PADDING_15 }}>
              <FHeading
                size={fonts.HEADING_NORMAL}
                weight={fonts.HEADING_WEIGHT_BOLD}
                title={sender.name}
                numberOfLines={1}
                ellipsizeMode="tail"
              />
            </View>
          </View>
          <View style={{ flexBasis: sizes.BASIS_30_PERCENTAGES }}>
            <FHeading
              size={fonts.HEADING_EXTRA_SMALL}
              weight={fonts.HEADING_WEIGHT_REGULAR}
              title={getSentDate()}
              color={colors.DARK_GRAY}
              align={placements.RIGHT}
            />
          </View>
        </View>
        <View style={styles.lastContainer}>
          <View style={styles.messageBox}>
            <FHeading
              size={fonts.HEADING_SMALL}
              weight={fonts.HEADING_WEIGHT_MEDIUM}
              title={message}
              color={colors.DARK_GRAY}
              ellipsizeMode="tail"
              numberOfLines={2}
            />
          </View>
          {unreadCount > 0 && (
            <View style={styles.messagesAmountBox}>
              <FHeading
                size={fonts.HEADING_EXTRA_SMALL}
                weight={fonts.HEADING_WEIGHT_BOLD}
                title={unreadCount}
                align={placements.CENTER}
                color={colors.WHITE}
              />
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: sizes.WIDTH_FULL,
    backgroundColor: colors.WHITE,
    flexDirection: 'row',
    ...defaultBoxShadow,
    paddingVertical: sizes.PADDING_25,
    paddingHorizontal: sizes.PADDING_10,
    alignItems: placements.CENTER,
    borderRadius: sizes.RADIUS_15,
  },
  middleContainer: {
    flexDirection: 'row',
    alignItems: placements.CENTER,
  },
  topBox: {
    flexDirection: 'row',
    alignItems: placements.CENTER,
    flexBasis: sizes.BASIS_70_PERCENTAGES,
  },
  lastContainer: {
    flexBasis: sizes.BASIS_70_PERCENTAGES,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: placements.CENTER,
  },
  messageBox: {
    flexBasis: sizes.BASIS_80_PERCENTAGES,
    marginTop: sizes.MARGIN_5,
  },
  messagesAmountBox: {
    borderRadius: getHalfBorderRadius(sizes.WIDTH_22),
    backgroundColor: colors.SECONDARY,
    width: sizes.WIDTH_22,
    height: sizes.HEIGHT_22,
    alignItems: placements.CENTER,
    justifyContent: placements.CENTER,
  },
});

FChatListItem.propTypes = {
  sender: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    profileImageUrl: PropTypes.string,
    lastLogin: PropTypes.string,
  }).isRequired,
  message: PropTypes.string,
  unreadCount: PropTypes.number.isRequired,
  sentDate: PropTypes.string.isRequired,
};
