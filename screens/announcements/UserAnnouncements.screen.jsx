import { View } from 'react-native';
import colors from 'themes/colors';
import { useRoute } from '@react-navigation/native';
import sizes from 'themes/sizes';
import { FAnnouncementsList } from 'components/Scoped/Announcement/FAnnouncementsList';

export const UserAnnouncementsScreen = () => {
  const route = useRoute();

  return (
    <View style={{
      flex: 1,
      backgroundColor: colors.WHITE,
      marginTop: sizes.MARGIN_1,
    }}
    >
      <FAnnouncementsList
        userId={route.params?.userId}
        numColumns={2}
        isMe={false}
        horizontal={false}
        onlyFavorites={false}
        getAll={false}
        lastViewed={false}
        recentlyCreated={false}
        nearby={false}
      />
    </View>
  );
};
