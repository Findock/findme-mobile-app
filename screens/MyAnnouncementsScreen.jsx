import { Dimensions, View } from 'react-native';
import React from 'react';
import sizes from 'themes/sizes';
import colors from 'themes/colors';
import { useSelector } from 'react-redux';
import { AnnouncementsList } from './AnnouncementsList';

export const MyAnnouncementsScreen = () => {
  const me = useSelector((state) => state.me.me);
  return (
    <View style={{
      height: Dimensions.get('screen').height,
      backgroundColor: colors.WHITE,
      paddingVertical: sizes.PADDING_30,
      paddingHorizontal: sizes.PADDING_5,
    }}
    >
      <AnnouncementsList isMe={me} />
    </View>
  );
};
