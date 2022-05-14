import React, { useEffect, useState } from 'react';
import { FUserProfileCard } from 'components/Scoped/UserProfile/FUserProfileCard';
import { useErrorModal } from 'hooks/useErrorModal';
import { FSpinner } from 'components/Composition/FSpinner';
import { getOtherUserService } from 'services/user/getOtherUser.service';
import { FDefaultLayout } from 'layouts/FDefault.layout';
import { FButton } from 'components/Buttons/FButton';
import colors from 'themes/colors';
import buttonTypes from 'constants/components/buttonTypes';
import fonts from 'themes/fonts';
import stackNavigatorNames from 'constants/stackNavigatorNames';
import { useNavigation, useRoute } from '@react-navigation/native';
import locales from 'constants/locales';
import { View } from 'react-native';
import { FAnnouncementsList } from 'components/Scoped/Announcement/FAnnouncementsList';
import sizes from 'themes/sizes';

export const UserProfilePreviewScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [
    user,
    setUser,
  ] = useState(null);
  const [
    userAnnouncementsLength,
    setUserAnnouncementsLength,
  ] = useState(0);
  const {
    setShowErrorModal,
    drawErrorModal,
  } = useErrorModal(true);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const res = await getOtherUserService(route.params?.userId || 2);
      setUser(res.data);
    } catch (error) {
      setShowErrorModal(true);
    }
  };
  return (
    <FDefaultLayout>
      <>
        {!user ? <FSpinner /> : (
          <>
            <FUserProfileCard
              user={user}
              isMe={false}
            />
            <View style={{ paddingTop: sizes.PADDING_20 }}>
              <FAnnouncementsList
                horizontal
                isMe={false}
                userId={user.id}
                onlyFavorites={false}
                setUserAnnouncementsLength={setUserAnnouncementsLength}
                numColumns={1}
                getAll={false}
              />
            </View>
            {userAnnouncementsLength > 4
              && (
                <FButton
                  title={locales.SHOW_ALL}
                  color={colors.PRIMARY}
                  backgroundColor={colors.LIGHT_GRAY}
                  type={buttonTypes.TEXT_BUTTON}
                  titleSize={fonts.HEADING_NORMAL}
                  titleWeight={fonts.HEADING_WEIGHT_BOLD}
                  onPress={() => navigation.navigate(stackNavigatorNames.USER_ANNOUNCEMENTS, {
                    userId: user.id,
                    userName: user.name,
                  })}
                  buttonViewStyles={{ marginTop: sizes.MARGIN_20 }}
                />
              )}
          </>
        )}
        {drawErrorModal(true)}
      </>
    </FDefaultLayout>
  );
};
