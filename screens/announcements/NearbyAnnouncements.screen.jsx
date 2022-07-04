import { View } from 'react-native';
import colors from 'themes/colors';
import { FAnnouncementsList } from 'components/Scoped/Announcement/FAnnouncementsList';
import { useRoute } from '@react-navigation/native';
import sizes from 'themes/sizes';

export const NearbyAnnouncementsScreen = () => {
  const route = useRoute();

  return (
    <View style={{
      flex: 1,
      backgroundColor: colors.WHITE,
      marginTop: sizes.MARGIN_1,
    }}
    >
      <FAnnouncementsList
        isMe={false}
        numColumns={2}
        onlyFavorites={false}
        horizontal={false}
        getAll={false}
        lastViewed={false}
        recentlyCreated={false}
        nearby
        location={{
          ...route.params?.location,
        }}
      />
    </View>
  );
};
