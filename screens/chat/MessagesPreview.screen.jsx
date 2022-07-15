import { useNavigation, useRoute } from '@react-navigation/native';
import { useErrorModal } from 'hooks/modals/useErrorModal';
import { useEffect, useRef, useState } from 'react';
import { FChatMessagesList } from 'components/Scoped/Chat/FChatMessagesList';
import { Dimensions, StyleSheet, View } from 'react-native';
import sizes from 'themes/sizes';
import { getUserChatMessagesService } from 'services/chat/getUserChatMessages.service';
import { FSpinner } from 'components/Composition/FSpinner';
import { FChatMessagePreviewHeader } from 'components/Scoped/Chat/FChatMessagePreviewHeader';

export const MessagesPreviewScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const sender = route.params?.sender;
  const messagesListRef = useRef();
  const interval = useRef(null);

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
            loginDate={sender.loginDate}
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
    if (messages.length !== newMessages.length) {
      return false;
    }
    return messages.some((m, index) => m.id !== newMessages[index].id);
  };

  const fetchUserMessages = async () => {
    if (messages.length === 0) {
      setIsLoading(true);
    }
    try {
      if (sender.id) {
        const res = await getUserChatMessagesService(sender.id);
        setMessages(res.data);
        if (checkIfMessagesAreDifferent(res.data)) {
          console.log('WIADOMOSCI SIE ZMIENILY');
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
