import React, { useEffect, useState } from 'react';
import { FUserProfileCard } from 'components/Scoped/UserProfile/FUserProfileCard';
import { useErrorModal } from 'hooks/useErrorModal';
import { FSpinner } from 'components/Composition/FSpinner';
import { getOtherUserService } from 'services/user/getOtherUser.service';
import { FDefaultLayout } from 'layouts/FDefault.layout';
import { SafeAreaView } from 'react-native';
import { FButton } from 'components/Buttons/FButton';
import colors from 'themes/colors';
import buttonTypes from 'constants/components/buttonTypes';
import fonts from 'themes/fonts';
import stackNavigatorNames from 'constants/stackNavigatorNames';
import { useNavigation } from '@react-navigation/native';
import locales from 'constants/locales';
import { AnnouncementsList } from './AnnouncementsList';

export const UserProfilePreviewScreen = () => {
  const navigation = useNavigation();
  const [
    user,
    setUser,
  ] = useState(null);
  const {
    setShowErrorModal,
    drawErrorModal,
  } = useErrorModal(true);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const res = await getOtherUserService(2);
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
            <SafeAreaView>
              <AnnouncementsList
                horizontal
                isMe={false}
                userId={user.id}
              />
            </SafeAreaView>
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
            />
          </>
        )}
        {drawErrorModal(true)}
      </>
    </FDefaultLayout>
  );
};
