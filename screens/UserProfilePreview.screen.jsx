import { FDefaultLayout } from 'layouts/FDefault.layout';
import React from 'react';
import { View } from 'react-native';
import colors from 'themes/colors';
import { FUserProfileCard } from 'components/Scoped/UserProfile/FUserProfileCard';
import { useSelector } from 'react-redux';

export const UserProfilePreviewScreen = () => {
  const me = useSelector((state) => state.me.me);
  return (
    <FDefaultLayout
      hasFlatList={false}
      // backgroundColor={colors.LIGHT_GRAY}
      isAlwaysScrollable
    >

      <View style={{
        flex: 1,
      }}
      >
        <FUserProfileCard
          user={me}
          isMe={false}
        />
      </View>
    </FDefaultLayout>
  );
};
