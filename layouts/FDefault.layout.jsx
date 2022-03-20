import { FLogo } from 'components/Composition/FLogo';
import React from 'react';
import {
  SafeAreaView, ScrollView, StyleSheet, Platform, View,
} from 'react-native';
import colors from 'themes/colors';
import sizes from 'themes/sizes';
import { isSmallScreen } from 'utils/isSmallScreen';

export const FDefaultLayout = ({
  children, withLogo, hasFlatList, noPaddingVertical = false, topBoxStyle, noPaddingHorizontal = false, isAlwaysScrollable = false,
  scrollViewRef,
}) => {
  const drawLayoutDependingOnScreenWithLogo = () => {
    if (withLogo) {
      return (
        <>
          <View style={{
            ...styles.topBox,
            ...topBoxStyle,
          }}
          >
            {children[0]}
            <FLogo
              fill={false}
              color={colors.GREEN}
            />
          </View>
          <View style={{ flex: 1 }}>
            {children[1]}
          </View>
        </>
      );
    }
    return (
      <View>
        {children}
      </View>
    );
  };
  const drawLayoutDependingOnScreenWithFlatList = () => {
    if (hasFlatList) {
      return (
        <View style={{
          ...styles.container,
          paddingHorizontal: noPaddingHorizontal ? 0 : sizes.PADDING_30,
          paddingVertical: Platform.OS === 'android' && !noPaddingVertical ? sizes.PADDING_30 : 0,
        }}
        >
          {drawLayoutDependingOnScreenWithLogo()}
        </View>
      );
    }
    return (
      <ScrollView
        scrollEnabled={isAlwaysScrollable ? true : isSmallScreen()}
        contentContainerStyle={{ flexGrow: 1 }}
        ref={scrollViewRef}
      >
        <View style={{
          ...styles.container,
          paddingHorizontal: noPaddingHorizontal ? 0 : sizes.PADDING_30,
          paddingVertical: Platform.OS === 'android' && !noPaddingVertical ? sizes.PADDING_30 : 0,
        }}
        >
          {drawLayoutDependingOnScreenWithLogo()}
        </View>
      </ScrollView>
    );
  };

  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: colors.BODY,
    }}
    >
      {drawLayoutDependingOnScreenWithFlatList()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: colors.BODY,
  },
  topBox: {
    flexDirection: 'row',
    width: sizes.WIDTH_FULL,
    justifyContent: 'space-between',
  },
  logoContainer: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    width: sizes.WIDTH_HALF,
  },
});
