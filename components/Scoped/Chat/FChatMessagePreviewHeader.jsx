import { StyleSheet, View } from 'react-native';
import { FAvatar } from 'components/Composition/FAvatar';
import sizes from 'themes/sizes';
import PropTypes from 'prop-types';
import { FHeading } from 'components/Composition/FHeading';
import fonts from 'themes/fonts';
import { calcPassedTime } from 'utils/calcPassedTime';
import { parseDate } from 'utils/parseDate';
import dateFormatTypes from 'constants/dateFormatTypes';
import locales from 'constants/locales';
import { FStatus } from 'components/Composition/FStatus';
import statusTypes from 'constants/components/statusTypes';
import placements from 'themes/placements';

export const FChatMessagePreviewHeader = ({
  profileImageUrl,
  name,
  loginDate,
}) => {
  const isActive = calcPassedTime(loginDate) <= (new Date().getTime() + 60 * 60) / 1000;

  const drawLastActivity = () => {
    const twoDays = (60 * 60 * 24 * 2) + new Date().getTime() / 1000;
    if (isActive) return '';
    if (calcPassedTime(loginDate) < twoDays) return parseDate(dateFormatTypes.HOW_LONG_AGO, loginDate);
    return parseDate(dateFormatTypes.DATE, loginDate);
  };

  return (
    <View style={styles.container}>
      <FAvatar
        size={sizes.WIDTH_30}
        isEditable={false}
        imageUrl={profileImageUrl}
      />
      <View style={styles.detailsContainer}>
        <FHeading
          size={fonts.HEADING_NORMAL}
          weight={fonts.HEADING_WEIGHT_MEDIUM}
          title={name}
        />
        <View style={styles.statusContainer}>
          {isActive && (
            <FStatus
              status={statusTypes.ACTIVE}
              style={{ marginRight: sizes.MARGIN_5 }}
            />
          )}
          <FHeading
            size={fonts.HEADING_EXTRA_SMALL}
            weight={fonts.HEADING_WEIGHT_REGULAR}
            title={`${locales.ACTIVE} ${drawLastActivity()}`}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexGrow: 1,
    marginLeft: sizes.MARGIN_20,
  },
  detailsContainer: {
    marginLeft: sizes.MARGIN_8,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: placements.CENTER,
  },
});

FChatMessagePreviewHeader.propTypes = {
  profileImageUrl: PropTypes.string,
  name: PropTypes.string.isRequired,
  loginDate: PropTypes.string.isRequired,
};
