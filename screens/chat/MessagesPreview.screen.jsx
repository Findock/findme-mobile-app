import { useNavigation, useRoute } from '@react-navigation/native';
import { useErrorModal } from 'hooks/modals/useErrorModal';
import { useEffect, useRef, useState } from 'react';
import { FChatMessagesList } from 'components/Scoped/Chat/FChatMessagesList';
import { Dimensions, StyleSheet, View } from 'react-native';
import sizes from 'themes/sizes';
import { getUserChatMessagesService } from 'services/chat/getUserChatMessages.service';
import { FSpinner } from 'components/Composition/FSpinner';
import { FChatMessagePreviewHeader } from 'components/Scoped/Chat/FChatMessagePreviewHeader';
import { useSelector } from 'react-redux';

export const MessagesPreviewScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const sender = route.params?.sender;
  const messagesListRef = useRef();
  const interval = useRef(null);
  const me = useSelector((state) => state.me.me);
  const [
    isNewMessage,
    setIsNewMessage,
  ] = useState(false);

  const [
    messages,
    setMessages,
  ] = useState([]);
  const {
    setShowErrorModal,
    drawErrorModal,
  } = useErrorModal();
  const [
    isLoading,
    setIsLoading,
  ] = useState(false);

  useEffect(() => {
    if (sender) {
      fetchUserMessages();
    }
  }, [sender]);

  useEffect(() => {
    if (sender) {
      navigation.setOptions({
        headerTitle: () => (
          <FChatMessagePreviewHeader
            name={sender.name}
            profileImageUrl={sender.profileImageUrl}
            lastLogin={sender.lastLogin}
          />
        ),
      });
    }
  }, [sender]);

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
    if (messages.length === newMessages.length) {
      return false;
    }
    return messages.some((m, index) => m.id !== newMessages[index].id);
  };

  const isMyMessage = () => me.id === sender.id;

  const fetchUserMessages = async () => {
    if (messages.length === 0) {
      setIsLoading(true);
    }
    try {
      if (sender.id) {
        const res = await getUserChatMessagesService(sender.id);
        setMessages(res.data);
        if (checkIfMessagesAreDifferent(res.data) && !isMyMessage()) {
          setIsNewMessage(true);
        }
      }
    } catch (error) {
      setShowErrorModal(true);
    }
    setIsLoading(false);
  };
  return (
    <View style={styles.screen}>
      {drawErrorModal()}
      {isLoading ? <FSpinner /> : (
        <FChatMessagesList
          messages={messages}
          receiver={sender}
          messagesListRef={messagesListRef}
          fetchUserMessages={fetchUserMessages}
          isNewMessage={isNewMessage}
          setIsNewMessage={setIsNewMessage}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    marginTop: sizes.MARGIN_1,
    height: Dimensions.get('window').height,
  },
});
