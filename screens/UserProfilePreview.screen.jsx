import React, { useEffect, useState } from 'react';
import { FUserProfileCard } from 'components/Scoped/UserProfile/FUserProfileCard';
import { useErrorModal } from 'hooks/useErrorModal';
import { FSpinner } from 'components/Composition/FSpinner';
import { getOtherUserService } from 'services/user/getOtherUser.service';
import { FKeyboardWrapper } from 'layouts/components/FKeyboardWrapper';
import { FContainer } from 'layouts/components/FContainer';
import { FDefaultLayout } from 'layouts/FDefault.layout';

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
    <FDefaultLayout>
      <>
        {!user ? <FSpinner /> : (
          <FUserProfileCard
            user={user}
            isMe={false}
          />
        )}
        {drawErrorModal(true)}
      </>
    </FDefaultLayout>
  );
};
