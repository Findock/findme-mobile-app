import { Dimensions, View } from 'react-native';
import colors from 'themes/colors';
import { useRoute } from '@react-navigation/native';
import sizes from 'themes/sizes';
import { AnnouncementsList } from './AnnouncementsList';

export const UserAnnouncementsScreen = () => {
  const route = useRoute();

  return (
    <View style={{
      height: Dimensions.get('screen').height,
      backgroundColor: colors.WHITE,
      paddingVertical: sizes.PADDING_30,
      paddingHorizontal: sizes.PADDING_5,
    }}
    >
      <AnnouncementsList
        userId={route.params?.userId}
        numColumns={2}
      />
    </View>
  );
};
