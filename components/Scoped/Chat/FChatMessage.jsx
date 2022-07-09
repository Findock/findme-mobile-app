import { StyleSheet, TouchableOpacity, View } from 'react-native';
import opacities from 'themes/opacities';
import PropTypes from 'prop-types';
import { FHeading } from 'components/Composition/FHeading';
import fonts from 'themes/fonts';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import colors from 'themes/colors';
import sizes from 'themes/sizes';
import { calcPassedTime } from 'utils/calcPassedTime';
import { parseDate } from 'utils/parseDate';
import dateFormatTypes from 'constants/dateFormatTypes';

export const FChatMessage = ({
  message,
  sentDate,
  sender,
  receiver,
  nextMessageSender,
}) => {
  const me = useSelector((state) => state.me.me);
  const [
    showSentDate,
    setShowSentDate,
  ] = useState(false);

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

  const getParsedSentDate = () => {
    const oneDay = (60 * 60 * 24) + new Date().getTime() / 1000;
    if (calcPassedTime(sentDate) > oneDay) return parseDate(dateFormatTypes.TIME, sentDate);
    return parseDate(dateFormatTypes.DATE_TIME, sentDate);
  };

  return (
    <TouchableOpacity
      activeOpacity={opacities.OPACITY_08}
      onPress={toggleShowSentDate}
    >
      <View style={{
        alignItems: isMyMessage() ? 'flex-end' : 'flex-start',
        marginBottom: isSameSenderAsBefore() ? sizes.MARGIN_8 : sizes.MARGIN_20,
      }}
      >
        <View style={{
          backgroundColor: isMyMessage() ? colors.PRIMARY : colors.GRAY,
          ...styles.messageContainer,
        }}
        >
          <FHeading
            size={fonts.HEADING_NORMAL}
            weight={fonts.HEADING_WEIGHT_MEDIUM}
            title={message}
            color={isMyMessage() ? colors.WHITE : colors.BLACK}
          />
        </View>
        {showSentDate && (
          <View style={styles.dateContainer}>
            <FHeading
              size={fonts.HEADING_EXTRA_SMALL}
              weight={fonts.HEADING_WEIGHT_MEDIUM}
              color={colors.DARK_GRAY}
              title={getParsedSentDate()}
            />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  messageContainer: {
    padding: sizes.PADDING_15,
    borderRadius: sizes.RADIUS_15,
    width: sizes.WIDTH_80_PERCENTAGES,
  },
  dateContainer: {
    marginVertical: sizes.MARGIN_3,
  },
});

FChatMessage.propTypes = {
  message: PropTypes.string,
  sentDate: PropTypes.string.isRequired,
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
  receiver: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    profileImageUrl: PropTypes.string,
    lastLogin: PropTypes.string,
  }).isRequired,
};
