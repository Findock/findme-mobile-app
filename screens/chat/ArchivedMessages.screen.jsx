import { View } from 'react-native';
import colors from 'themes/colors';
import sizes from 'themes/sizes';
import { FChatList } from 'components/Scoped/Chat/FChatList';
import React from 'react';

export const ArchivedMessagesScreen = () => (
  <View style={{
    backgroundColor: colors.WHITE,
    flex: 1,
    marginTop: sizes.MARGIN_1,
  }}
  >
    <FChatList hasActiveMessages={false} />
  </View>
);
