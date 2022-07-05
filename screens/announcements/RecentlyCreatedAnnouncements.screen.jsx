import { FAnnouncementsList } from 'components/Scoped/Announcement/FAnnouncementsList';
import React from 'react';
import { View } from 'react-native';
import colors from 'themes/colors';
import sizes from 'themes/sizes';

export const RecentlyCreatedAnnouncementsScreen = () => (
  <View style={{
    flex: 1,
    backgroundColor: colors.WHITE,
    marginTop: sizes.MARGIN_1,
  }}
  >
    <FAnnouncementsList
      numColumns={2}
      isMe={false}
      horizontal={false}
      onlyFavorites={false}
      getAll={false}
      lastViewed={false}
      recentlyCreated
      nearby={false}
    />
  </View>
);
