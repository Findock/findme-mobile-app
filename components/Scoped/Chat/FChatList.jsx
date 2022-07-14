import React, { useEffect, useRef, useState } from 'react';
import { getUserAllChatMessagesService } from 'services/chat/getUserAllChatMessages.service';
import { useErrorModal } from 'hooks/modals/useErrorModal';
import { FSpinner } from 'components/Composition/FSpinner';
import sizes from 'themes/sizes';
import { FlatList, StyleSheet, View } from 'react-native';
import { FHeading } from 'components/Composition/FHeading';
import placements from 'themes/placements';
import fonts from 'themes/fonts';
import colors from 'themes/colors';
import locales from 'constants/locales';
import { FChatListItem } from 'components/Scoped/Chat/FChatListItem';
import { useSelector } from 'react-redux';

export const FChatList = () => {
  const me = useSelector((state) => state.me.me);
  const [
    isLoading,
    setIsLoading,
  ] = useState(false);
  const [
    messages,
    setMessages,
  ] = useState([]);
  const {
    setShowErrorModal,
    drawErrorModal,
  } = useErrorModal(true);
  const interval = useRef(null);

  useEffect(() => {
    fetchUserMessages();
  }, []);

  useEffect(() => {
    if (interval.current) clearInterval(interval.current);
    interval.current = setInterval(() => {
      fetchUserMessages();
    }, 1000);

    return () => {
      clearInterval(interval.current);
    };
  }, [messages]);

  const checkIfMessagesAreDifferent = (newMessages) => {
    if (messages.length !== newMessages.length) {
      return false;
    }
    return messages.some((m, index) => m.lastMessage.id !== newMessages[index].lastMessage.id);
  };

  const fetchUserMessages = async () => {
    if (messages.length === 0) {
      setIsLoading(true);
    }
    try {
      const res = await getUserAllChatMessagesService();
      setMessages(res.data);
      if (checkIfMessagesAreDifferent(res.data)) {
        console.log('WIADOMOSCI SIE ZMIENILY');
      }
    } catch (error) {
      setShowErrorModal(true);
    }
    setIsLoading(false);
  };

  const getSender = (item) => {
    if (me.id === item.lastMessage.sender.id) return item.lastMessage.receiver;
    return item.lastMessage.sender;
  };

  const drawMessage = ({ item }) => (
    <FChatListItem
      key={item.lastMessage.id}
      message={item.lastMessage.message || ''}
      sender={getSender(item)}
      receiver={item.receiver}
      unreadCount={item.unreadCount}
      sentDate={item.lastMessage.sentDate}
      photos={item.photos}
    />
  );

  const drawNoMessagesInfo = () => {
    if (!isLoading && messages.length === 0) {
      return (
        <View style={styles.centerView}>
          <FHeading
            align={placements.CENTER}
            size={fonts.HEADING_SMALL}
            color={colors.DARK_GRAY}
            weight={fonts.HEADING_WEIGHT_REGULAR}
            title={locales.NO_MESSAGES}
          />
        </View>
      );
    }
  };

  return (
    <>
      {isLoading && <FSpinner style={{ paddingTop: sizes.PADDING_30 }} />}
      {drawErrorModal()}
      {drawNoMessagesInfo()}
      <View style={{ flex: 1 }}>
        <FlatList
          extraData={messages}
          data={messages}
          renderItem={drawMessage}
          contentContainerStyle={{
            paddingBottom: sizes.PADDING_20,
          }}
          keyExtractor={(item) => item.lastMessage.id}
          scrollEnabled
          style={styles.list}
          ItemSeparatorComponent={() => (
            <View style={{
              width: sizes.WIDTH_FULL,
              paddingTop: sizes.PADDING_5,
            }}
            />
          )}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  list: {
    width: sizes.WIDTH_FULL,
    paddingTop: sizes.PADDING_10,
    paddingHorizontal: sizes.PADDING_5,
  },
  centerView: {
    paddingTop: sizes.PADDING_30,
    alignItems: placements.CENTER,
    flex: 1,
    backgroundColor: colors.WHITE,
  },
});
