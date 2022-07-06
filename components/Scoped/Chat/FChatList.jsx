import React, { useEffect, useState } from 'react';
import { getUserChatMessagesService } from 'services/chat/getUserChatMessages.service';
import { useErrorModal } from 'hooks/modals/useErrorModal';
import { FSpinner } from 'components/Composition/FSpinner';
import sizes from 'themes/sizes';
import { FlatList, StyleSheet, View } from 'react-native';
import { FHeading } from 'components/Composition/FHeading';
import placements from 'themes/placements';
import fonts from 'themes/fonts';
import colors from 'themes/colors';
import locales from 'constants/locales';
import { FActivityIndicator } from 'components/Composition/FActivityIndicator';
import { FChatListItem } from 'components/Scoped/Chat/FChatListItem';

export const FChatList = () => {
  const [
    params,
    setParams,
  ] = useState({
    pageSize: 10,
    offset: 0,
  });
  const [
    isLoading,
    setIsLoading,
  ] = useState(false);
  const [
    messages,
    setMessages,
  ] = useState([
    {
      lastMessage: {
        id: 0,
        sender: {
          id: 0,
          name: 'Joanna But',
          profileImageUrl: '',
          lastLogin: '2022-07-05T20:25:33.209Z',
        },
        message: 'string',
        readDate: '2022-07-05T20:25:33.209Z',
        sentDate: '2022-07-05T20:25:33.209Z',
      },
      isUnread: true,
    },
    {
      lastMessage: {
        id: 0,
        sender: {
          id: 0,
          name: 'Joanna But',
          profileImageUrl: '',
          lastLogin: '2022-07-05T20:25:33.209Z',
        },
        message: 'string',
        readDate: '2022-07-05T20:25:33.209Z',
        sentDate: '2022-07-05T20:25:33.209Z',
      },
      isUnread: true,
    },
    {
      lastMessage: {
        id: 0,
        sender: {
          id: 0,
          name: 'Joanna But',
          profileImageUrl: '',
          lastLogin: '2022-07-05T20:25:33.209Z',
        },
        message: 'string',
        readDate: '2022-07-05T20:25:33.209Z',
        sentDate: '2022-07-05T20:25:33.209Z',
      },
      isUnread: true,
    },
    {
      lastMessage: {
        id: 0,
        sender: {
          id: 0,
          name: 'Joanna But',
          profileImageUrl: '',
          lastLogin: '2022-07-05T20:25:33.209Z',
        },
        message: 'string',
        readDate: '2022-07-05T20:25:33.209Z',
        sentDate: '2022-07-05T20:25:33.209Z',
      },
      isUnread: true,
    },
    {
      lastMessage: {
        id: 0,
        sender: {
          id: 0,
          name: 'Joanna But',
          profileImageUrl: '',
          lastLogin: '2022-07-05T20:25:33.209Z',
        },
        message: 'string',
        readDate: '2022-07-05T20:25:33.209Z',
        sentDate: '2022-07-05T20:25:33.209Z',
      },
      isUnread: true,
    },
    {
      lastMessage: {
        id: 0,
        sender: {
          id: 0,
          name: 'Joanna But',
          profileImageUrl: '',
          lastLogin: '2022-07-05T20:25:33.209Z',
        },
        message: 'string',
        readDate: '2022-07-05T20:25:33.209Z',
        sentDate: '2022-07-05T20:25:33.209Z',
      },
      isUnread: true,
    },
    {
      lastMessage: {
        id: 0,
        sender: {
          id: 0,
          name: 'Joanna But',
          profileImageUrl: '',
          lastLogin: '2022-07-05T20:25:33.209Z',
        },
        message: 'string',
        readDate: '2022-07-05T20:25:33.209Z',
        sentDate: '2022-07-05T20:25:33.209Z',
      },
      isUnread: true,
    },
    {
      lastMessage: {
        id: 0,
        sender: {
          id: 0,
          name: 'Joanna But',
          profileImageUrl: '',
          lastLogin: '2022-07-05T20:25:33.209Z',
        },
        message: 'string',
        readDate: '2022-07-05T20:25:33.209Z',
        sentDate: '2022-07-05T20:25:33.209Z',
      },
      isUnread: true,
    },
    {
      lastMessage: {
        id: 0,
        sender: {
          id: 0,
          name: 'Joanna But',
          profileImageUrl: '',
          lastLogin: '2022-07-05T20:25:33.209Z',
        },
        message: 'string',
        readDate: '2022-07-05T20:25:33.209Z',
        sentDate: '2022-07-05T20:25:33.209Z',
      },
      isUnread: true,
    },
  ]);
  const [
    endReached,
    setEndReached,
  ] = useState(false);
  const {
    setShowErrorModal,
    drawErrorModal,
  } = useErrorModal(true);

  useEffect(() => {
    fetchUserMessages();
  }, [params]);

  const fetchUserMessages = async () => {
    setIsLoading(true);
    try {
      const res = await getUserChatMessagesService(params);
      setMessages([...messages, ...res.data]);

      if (res.data.length < 10) {
        setEndReached(true);
      }
    } catch (error) {
      setShowErrorModal(true);
    }
    setIsLoading(false);
  };

  const drawMessage = ({ item }) => (
    <FChatListItem
      message={item.lastMessage.message || ''}
      sender={item.lastMessage.sender}
      isUnread={item.isUnread}
      readDate={item.lastMessage.readDate}
      sentDate={item.lastMessage.sentDate}
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

  const handleEnd = () => {
    if (!endReached) {
      setParams(
        (prevValue) => ({
          pageSize: prevValue.pageSize,
          offset: prevValue.offset + 10,
        }),
      );
    }
  };

  const renderActivityIndicator = () => !endReached && <FActivityIndicator />;

  return (
    <>
      {isLoading && <FSpinner style={{ paddingTop: sizes.PADDING_30 }} />}
      {drawErrorModal()}
      {drawNoMessagesInfo()}
      <View style={{ flex: 1 }}>
        <FlatList
          extraData={messages}
          onEndReached={handleEnd}
          onEndReachedThreshold={0}
          ListFooterComponent={renderActivityIndicator}
          data={messages}
          renderItem={drawMessage}
          contentContainerStyle={{
            paddingBottom: sizes.PADDING_20,
          }}
          keyExtractor={(item) => item.id}
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
