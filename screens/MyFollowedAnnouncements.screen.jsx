import { Dimensions, View } from 'react-native';
import colors from 'themes/colors';
import sizes from 'themes/sizes';
import { useSelector } from 'react-redux';
import { AnnouncementsList } from './AnnouncementsList';

export const MyFollowedAnnouncementsScreen = () => {
  const me = useSelector((state) => state.me.me);
  return (
    <View style={{
      height: Dimensions.get('screen').height,
      backgroundColor: colors.WHITE,
      paddingVertical: sizes.PADDING_30,
      paddingHorizontal: sizes.PADDING_5,
    }}
    >
      <AnnouncementsList
        isMe={me}
        onlyFavorites
      />
    </View>
  );
};
