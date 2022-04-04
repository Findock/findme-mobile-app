import { FDefaultLayout } from 'layouts/FDefault.layout';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { FUserProfileCard } from 'components/Scoped/UserProfile/FUserProfileCard';
import { getOtherUserService } from 'services/getOtherUser.service';
import { useErrorModal } from 'hooks/useErrorModal';
import { FSpinner } from 'components/Composition/FSpinner';

export const UserProfilePreviewScreen = () => {
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
    <FDefaultLayout
      isAlwaysScrollable
    >
      <>
        <View style={{
          flex: 1,
        }}
        >
          {!user ? <FSpinner /> : (
            <FUserProfileCard
              user={user}
              isMe={false}
            />
          )}
        </View>
        {drawErrorModal(true)}
      </>
    </FDefaultLayout>
  );
};
