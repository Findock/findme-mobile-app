import { FAnnouncementsList } from 'components/Scoped/Announcement/FAnnouncementsList';
import { View } from 'react-native';
import colors from 'themes/colors';
import sizes from 'themes/sizes';

export const MyFollowedAnnouncementsScreen = () => (
  <View style={{
    flex: 1,
    backgroundColor: colors.WHITE,
    marginTop: sizes.MARGIN_1,
  }}
  >
    <FAnnouncementsList
      isMe={false}
      numColumns={2}
      onlyFavorites
      horizontal={false}
      getAll={false}
      lastViewed={false}
      recentlyCreated={false}
      nearby={false}
    />
  </View>
);
