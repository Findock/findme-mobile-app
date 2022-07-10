import {
  FlatList, KeyboardAvoidingView, StyleSheet, View,
} from 'react-native';
import { FChatMessage } from 'components/Scoped/Chat/FChatMessage';
import { FChatNewMessage } from 'components/Scoped/Chat/FChatNewMessage';
import colors from 'themes/colors';
import sizes from 'themes/sizes';
import defaultBoxShadow from 'styles/defaultBoxShadow';
import PropTypes from 'prop-types';
import { useEffect, useRef } from 'react';

export const FChatMessagesList = ({
  messages,
  receiver,
  messagesListRef,
  fetchUserMessages,
}) => {
  const listHeight = useRef(0);

  useEffect(() => {
    messagesListRef.current.scrollToOffset({ y: listHeight.current });
    messagesListRef.current.scrollToEnd();
  }, [listHeight.current]);

  const drawMessages = ({
    item,
    index,
  }) => (
    <>
      <FChatMessage
        sentDate={item.sentDate}
        message={item.message}
        nextMessageSender={messages[index - 1]?.sender}
        sender={item.sender}
        receiver={item.receiver}
        key={item.id}
        isLastMessage={index === 0}
        locationLat={item.locationLat}
        locationLon={item.locationLon}
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
      />
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
    transform: [{ scaleY: -1 }],
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
  }).isRequired),
  receiver: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    profileImageUrl: PropTypes.string,
    lastLogin: PropTypes.string,
  }).isRequired,
  fetchUserMessages: PropTypes.func,
};
