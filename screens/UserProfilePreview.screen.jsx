import { FDefaultLayout } from 'layouts/FDefault.layout';
import React from 'react';
import { View } from 'react-native';
import colors from 'themes/colors';
import sizes from 'themes/sizes';
import { FBackButton } from 'components/Buttons/FBackButton';
import { FUserProfileCard } from 'components/Scoped/UserProfile/FUserProfileCard';
import { useSelector } from 'react-redux';
import stackNavigatorNames from 'constants/stackNavigatorNames';

export const UserProfilePreviewScreen = () => {
  const me = useSelector((state) => state.me.me);
  return (
    <FDefaultLayout
      withLogo
      hasFlatList={false}
      backgroundColor={colors.LIGHT_GRAY}
      isAlwaysScrollable
    >
      <View style={{
        left: sizes.POSITION_N30,
      }}
      >
        <FBackButton navigateTo={stackNavigatorNames.HOMEPAGE} />
      </View>
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
