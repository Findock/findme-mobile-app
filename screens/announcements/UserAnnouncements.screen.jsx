import { Dimensions, View } from 'react-native';
import colors from 'themes/colors';
import { useRoute } from '@react-navigation/native';
import sizes from 'themes/sizes';
import { FAnnouncementsList } from 'components/Scoped/Announcement/FAnnouncementsList';

export const UserAnnouncementsScreen = () => {
  const route = useRoute();

  return (
    <View style={{
      height: Dimensions.get('screen').height,
      backgroundColor: colors.WHITE,
      paddingTop: sizes.PADDING_10,
    }}
    >
      <FAnnouncementsList
        userId={route.params?.userId}
        numColumns={2}
        isMe={false}
        horizontal={false}
        FAnnouncementsList={false}
        onlyFavorites={false}
        getAll={false}
        lastViewed={false}
        recentlyCreated={false}
      />
    </View>
  );
};
