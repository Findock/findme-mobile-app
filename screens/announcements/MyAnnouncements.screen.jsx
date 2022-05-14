import { Dimensions, View } from 'react-native';
import React from 'react';
import sizes from 'themes/sizes';
import colors from 'themes/colors';
import { FAnnouncementsList } from 'components/Scoped/Announcement/FAnnouncementsList';

export const MyAnnouncementsScreen = () => (
  <View style={{
    height: Dimensions.get('screen').height,
    backgroundColor: colors.WHITE,
    paddingTop: sizes.PADDING_10,
  }}
  >
    <FAnnouncementsList
      isMe
      numColumns={2}
      horizontal={false}
      FAnnouncementsList={false}
      onlyFavorites={false}
    />
  </View>
);
