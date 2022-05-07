import { Dimensions, View } from 'react-native';
import React from 'react';
import sizes from 'themes/sizes';
import colors from 'themes/colors';
import { AnnouncementsList } from './AnnouncementsList';

export const MyAnnouncementsScreen = () => (
  <View style={{
    height: Dimensions.get('screen').height,
    backgroundColor: colors.WHITE,
    paddingVertical: sizes.PADDING_30,
    paddingHorizontal: sizes.PADDING_5,
  }}
  >
    <AnnouncementsList
      isMe
      numColumns={2}
    />
  </View>
);
