import { Dimensions, View } from 'react-native';
import colors from 'themes/colors';
import sizes from 'themes/sizes';
import { AnnouncementsList } from './AnnouncementsList';

export const MyFollowedAnnouncementsScreen = () => (
  <View style={{
    height: Dimensions.get('screen').height,
    backgroundColor: colors.WHITE,
    paddingVertical: sizes.PADDING_30,
    paddingHorizontal: sizes.PADDING_5,
  }}
  >
    <AnnouncementsList
      isMe
      numColumns={2}
      onlyFavorites
    />
  </View>
);
