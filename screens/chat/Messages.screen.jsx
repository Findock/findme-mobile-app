import { View } from 'react-native';
import colors from 'themes/colors';
import sizes from 'themes/sizes';
import React from 'react';
import { FChatList } from 'components/Scoped/Chat/FChatList';

export const MessagesScreen = () => (
  <View style={{
    backgroundColor: colors.WHITE,
    flex: 1,
    marginTop: sizes.MARGIN_1,
  }}
  >
    <FChatList />
  </View>
);
