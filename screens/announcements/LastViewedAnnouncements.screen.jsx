import { FAnnouncementsList } from 'components/Scoped/Announcement/FAnnouncementsList';
import React from 'react';
import colors from 'themes/colors';
import sizes from 'themes/sizes';
import { View, Dimensions } from 'react-native';

export const LastViewedAnnouncementsScreen = () => (
  <View style={{
    height: Dimensions.get('screen').height,
    backgroundColor: colors.WHITE,
    paddingTop: sizes.PADDING_10,
  }}
  >
    <FAnnouncementsList
      numColumns={2}
      isMe={false}
      horizontal={false}
      onlyFavorites={false}
      getAll={false}
      lastViewed
    />
  </View>
);
