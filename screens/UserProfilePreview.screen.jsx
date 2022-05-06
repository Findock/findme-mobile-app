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
import sizes from 'themes/sizes';
import { useNavigation } from '@react-navigation/native';

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
            <FButton
              title="Ogłoszenia użytkownika"
              color={colors.WHITE}
              backgroundColor={colors.PRIMARY}
              type={buttonTypes.TEXT_BUTTON}
              titleSize={fonts.HEADING_NORMAL}
              titleWeight={fonts.HEADING_WEIGHT_MEDIUM}
              onPress={() => navigation.navigate(stackNavigatorNames.USER_ANNOUNCEMENTS, { userId: user.id })}
              buttonViewStyles={{ marginTop: sizes.MARGIN_20 }}
            />
          </>
        )}
        {drawErrorModal(true)}
      </>
    </FDefaultLayout>
  );
};
