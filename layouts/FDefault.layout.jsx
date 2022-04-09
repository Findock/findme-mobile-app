import React from 'react';
import {
  View, FlatList, Dimensions,
} from 'react-native';
import colors from 'themes/colors';
import sizes from 'themes/sizes';

export const FDefaultLayout = ({
  children, noPaddingVertical = false, noPaddingHorizontal = false, scrollRef,
}) => (
  <FlatList
    ref={scrollRef}
    nestedScrollEnabled
    scrollEnabled
    data={[]}
    renderItem={null}
    bounces={false}
    style={{
      maxHeight: Dimensions.get('screen').height,
      backgroundColor: colors.WHITE,
    }}
    contentContainerStyle={{
      zIndex: 0,
    }}
    ListHeaderComponent={(
      <View style={{
        paddingHorizontal: noPaddingHorizontal ? 0 : sizes.PADDING_30,
        paddingVertical: !noPaddingVertical ? sizes.PADDING_30 : 0,
        flexGrow: 0,
      }}
      >
        {children}
      </View>
    )}
  />
);
