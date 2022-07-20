import {
  FlatList, Keyboard, KeyboardAvoidingView, StyleSheet, View,
} from 'react-native';
import { FChatMessage } from 'components/Scoped/Chat/FChatMessage';
import { FChatNewMessage } from 'components/Scoped/Chat/FChatNewMessage';
import colors from 'themes/colors';
import sizes from 'themes/sizes';
import defaultBoxShadow from 'styles/defaultBoxShadow';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { FButton } from 'components/Buttons/FButton';
import buttonTypes from 'constants/components/buttonTypes';
import icons from 'themes/icons';
import placements from 'themes/placements';
import fonts from 'themes/fonts';
import locales from 'constants/locales';

export const FChatMessagesList = ({
  messages,
  receiver,
  messagesListRef,
  fetchUserMessages,
  isNewMessage,
  setIsNewMessage,
}) => {
  const [
    canScrollToBottom,
    setCanScrollToBottom,
  ] = useState(false);
  const [
    isKeyboardOpen,
    setIsKeyboardOpen,
  ] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setIsKeyboardOpen(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setIsKeyboardOpen(false);
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

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
          if (!canScrollToBottom && e.nativeEvent.contentOffset.y >= 50) {
            setCanScrollToBottom(true);
          } else if (canScrollToBottom && e.nativeEvent.contentOffset.y <= 20) {
            setCanScrollToBottom(false);
          }
        }}
      />
      {canScrollToBottom && !isNewMessage && (
        <View style={{
          ...styles.absoluteButtonContainer,
          bottom: isKeyboardOpen ? sizes.POSITION_428 : sizes.POSITION_205,
        }}
        >
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
        </View>
      )}
      {canScrollToBottom && isNewMessage && (
        <View style={{
          ...styles.absoluteButtonContainer,
          bottom: isKeyboardOpen ? sizes.POSITION_428 : sizes.POSITION_205,
        }}
        >
          <FButton
            type={buttonTypes.TEXT_BUTTON}
            backgroundColor={colors.SECONDARY}
            color={colors.WHITE}
            title={locales.NEW_MESSAGE}
            titleSize={fonts.HEADING_SMALL}
            titleWeight={fonts.HEADING_WEIGHT_MEDIUM}
            onPress={() => messagesListRef.current.scrollToOffset({
              y: 0,
              animated: true,
            })}
          />
        </View>
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
            messagesListRef={messagesListRef}
            setCanScrollToBottom={setCanScrollToBottom}
            setIsNewMessage={setIsNewMessage}
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
    alignItems: placements.CENTER,
    justifyContent: placements.CENTER,
  },
  absoluteButtonContainer: {
    zIndex: 5,
    alignItems: placements.CENTER,
    left: 0,
    right: 0,
    position: 'absolute',
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
  isNewMessage: PropTypes.bool.isRequired,
  setIsNewMessage: PropTypes.func.isRequired,
};
