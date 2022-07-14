import {
  Dimensions, FlatList, KeyboardAvoidingView, StyleSheet, View,
} from 'react-native';
import { FChatMessage } from 'components/Scoped/Chat/FChatMessage';
import { FChatNewMessage } from 'components/Scoped/Chat/FChatNewMessage';
import colors from 'themes/colors';
import sizes from 'themes/sizes';
import defaultBoxShadow from 'styles/defaultBoxShadow';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { FButton } from 'components/Buttons/FButton';
import buttonTypes from 'constants/components/buttonTypes';
import icons from 'themes/icons';
import placements from 'themes/placements';

export const FChatMessagesList = ({
  messages,
  receiver,
  messagesListRef,
  fetchUserMessages,
}) => {
  const [
    showScrollToBottomButton,
    setShowScrollToBottomButton,
  ] = useState(false);

  const drawMessages = ({
    item,
    index,
  }) => (
    <>
      <FChatMessage
        sentDate={item.sentDate}
        readDate={item.readDate}
        message={item.message}
        nextMessageSender={messages[index - 1]?.sender}
        sender={item.sender}
        key={item.id}
        isLastMessage={index === 0}
        locationLat={item.locationLat}
        locationLon={item.locationLon}
        photos={item.photos}
      />
    </>
  );

  return (
    <View style={{
      flex: 1,
    }}
    >
      <FlatList
        listKey="chat-user-messages"
        ref={messagesListRef}
        data={messages}
        inverted
        renderItem={drawMessages}
        keyExtractor={(item) => item.id}
        style={styles.list}
        contentContainerStyle={{
          paddingVertical: sizes.PADDING_15,
          flexGrow: 1,
          justifyContent: 'flex-end',
        }}
        onScroll={(e) => {
          if (!showScrollToBottomButton && e.nativeEvent.contentOffset.y >= 50) {
            setShowScrollToBottomButton(true);
          } else if (showScrollToBottomButton && e.nativeEvent.contentOffset.y <= 20) {
            setShowScrollToBottomButton(false);
          }
        }}
      />
      {showScrollToBottomButton && (
        <FButton
          type={buttonTypes.ICON_BUTTON}
          icon={icons.ARROW_DOWN_OUTLINE}
          backgroundColor={colors.SECONDARY}
          iconSize={sizes.ICON_22}
          color={colors.WHITE}
          buttonViewStyles={styles.scrollToBottomButton}
          onPress={() => messagesListRef.current.scrollToOffset({
            y: 0,
            animated: true,
          })}
        />
      )}
      <KeyboardAvoidingView
        enabled
        behavior="padding"
        keyboardVerticalOffset={sizes.HEIGHT_90}
      >
        <View style={{
          backgroundColor: colors.GRAY,
          ...defaultBoxShadow,
        }}
        >
          <FChatNewMessage
            fetchUserMessages={fetchUserMessages}
            receiver={receiver}
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: sizes.PADDING_15,
    backgroundColor: colors.WHITE,
    flex: 1,
  },
  scrollToBottomButton: {
    borderRadius: sizes.RADIUS_30,
    padding: 0,
    width: sizes.WIDTH_45,
    height: sizes.HEIGHT_45,
    zIndex: 20,
    position: 'absolute',
    bottom: sizes.POSITION_205,
    left: (Dimensions.get('window').width / 2) - sizes.POSITION_30,
    alignItems: placements.CENTER,
    justifyContent: placements.CENTER,
  },
});

FChatMessagesList.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
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
    message: PropTypes.string,
    locationLat: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    locationLon: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    readDate: PropTypes.string,
    sentDate: PropTypes.string.isRequired,
    photos: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      url: PropTypes.string,
    })),
  }).isRequired),
  receiver: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    profileImageUrl: PropTypes.string,
    lastLogin: PropTypes.string,
  }).isRequired,
  fetchUserMessages: PropTypes.func,
};
