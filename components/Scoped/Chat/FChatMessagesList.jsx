import { FlatList, StyleSheet, View } from 'react-native';
import { FChatMessage } from 'components/Scoped/Chat/FChatMessage';
import sizes from 'themes/sizes';
import colors from 'themes/colors';

export const FChatMessagesList = ({ messages }) => {
  const drawMessages = ({
    item,
    index,
  }) => (
    <FChatMessage
      sentDate={item.sentDate}
      message={item.message}
      nextMessageSender={messages[index + 1]?.sender}
      sender={item.sender}
      receiver={item.receiver}
      key={item.id}
    />
  );

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={messages}
        renderItem={drawMessages}
        keyExtractor={(item) => item.id}
        style={styles.list}
        inverted
        contentContainerStyle={{}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    padding: sizes.PADDING_15,
    backgroundColor: colors.WHITE,
  },
});
