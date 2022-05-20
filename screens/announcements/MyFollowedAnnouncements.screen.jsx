import { FAnnouncementsList } from 'components/Scoped/Announcement/FAnnouncementsList';
import { Dimensions, View } from 'react-native';
import colors from 'themes/colors';
import sizes from 'themes/sizes';

export const MyFollowedAnnouncementsScreen = () => (
  <View style={{
    height: Dimensions.get('screen').height,
    backgroundColor: colors.WHITE,
    paddingTop: sizes.PADDING_10,
  }}
  >
    <FAnnouncementsList
      isMe={false}
      numColumns={2}
      onlyFavorites
      horizontal={false}
      FAnnouncementsList={false}
      getAll={false}
    />
  </View>
);
