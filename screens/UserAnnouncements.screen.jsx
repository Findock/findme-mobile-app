import { Dimensions, View } from 'react-native';
import colors from 'themes/colors';
import { useRoute } from '@react-navigation/native';
import { AnnouncementsList } from './AnnouncementsList';

export const UserAnnouncementsScreen = () => {
  const route = useRoute();

  return (
    <View style={{
      height: Dimensions.get('screen').height,
      backgroundColor: colors.WHITE,
      alignItems: 'center',
    }}
    >
      <AnnouncementsList
        isMe={false}
        userId={route.params?.userId}
        numColumns={2}
      />
    </View>
  );
};
