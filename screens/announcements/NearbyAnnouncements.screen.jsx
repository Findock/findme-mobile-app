import { Dimensions, View } from 'react-native';
import colors from 'themes/colors';
import sizes from 'themes/sizes';
import { FAnnouncementsList } from 'components/Scoped/Announcement/FAnnouncementsList';
import { useRoute } from '@react-navigation/native';

export const NearbyAnnouncementsScreen = () => {
  const route = useRoute();

  return (
    <View style={{
      height: Dimensions.get('screen').height,
      backgroundColor: colors.WHITE,
      paddingTop: sizes.PADDING_10,
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
