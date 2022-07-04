import { View } from 'react-native';
import React from 'react';
import { FAnnouncementsList } from 'components/Scoped/Announcement/FAnnouncementsList';
import colors from 'themes/colors';
import sizes from 'themes/sizes';

export const MyAnnouncementsScreen = () => (
  <View style={{
    flex: 1,
    backgroundColor: colors.WHITE,
    marginTop: sizes.MARGIN_1,
  }}
  >
    <FAnnouncementsList
      isMe
      numColumns={2}
      horizontal={false}
      onlyFavorites={false}
      getAll={false}
      lastViewed={false}
      recentlyCreated={false}
      nearby={false}
    />
  </View>
);
