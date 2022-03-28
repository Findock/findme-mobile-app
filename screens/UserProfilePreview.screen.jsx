import { FDefaultLayout } from 'layouts/FDefault.layout';
import React, { useEffect, useState } from 'react';
import { View, Platform } from 'react-native';
import { FUserProfileCard } from 'components/Scoped/UserProfile/FUserProfileCard';
import { getOtherUserService } from 'services/getOtherUser.service';
import { useErrorModal } from 'hooks/useErrorModal';
import { FSpinner } from 'components/Composition/FSpinner';
import sizes from 'themes/sizes';

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
      const res = await getOtherUserService('62377943da87663584d203dc');
      setUser(res.data);
    } catch (error) {
      setShowErrorModal(true);
    }
  };
  return (
    <FDefaultLayout
      hasFlatList={false}
      isAlwaysScrollable
    >
      {!user ? <FSpinner /> : (
        <>
          <View style={{
            flex: 1,
            marginTop: Platform.OS === 'ios' ? sizes.MARGIN_10 : 0,
          }}
          >
            <FUserProfileCard
              user={user}
              isMe={false}
            />
          </View>
          {drawErrorModal(true)}
        </>
      ) }

    </FDefaultLayout>
  );
};
