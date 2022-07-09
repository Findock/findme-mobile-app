import { useNavigation, useRoute } from '@react-navigation/native';
import { useErrorModal } from 'hooks/modals/useErrorModal';
import { useEffect, useState } from 'react';
import { FChatMessagesList } from 'components/Scoped/Chat/FChatMessagesList';
import { Dimensions, StyleSheet, View } from 'react-native';
import sizes from 'themes/sizes';
import { getUserChatMessagesService } from '../../services/chat/getUserChatMessages.service';

export const MessagesPreviewScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const sender = route.params?.sender;

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
      navigation.setOptions({ title: sender.name });
    }
  }, [sender]);

  const fetchUserMessages = async () => {
    try {
      if (sender.id) {
        const res = await getUserChatMessagesService(sender.id);
        setMessages(res.data);
      }
    } catch (error) {
      setShowErrorModal(true);
    }
  };
  return (
    <View style={styles.screen}>
      <FChatMessagesList messages={messages} />
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
