import React from 'react';
import {
  SafeAreaView, ScrollView, StyleSheet, Platform, View,
} from 'react-native';
import colors from 'themes/colors';
import sizes from 'themes/sizes';
import { isSmallScreen } from 'utils/isSmallScreen';

export const FDefaultLayout = ({
  children, hasFlatList, noPaddingVertical = false, noPaddingHorizontal = false, isAlwaysScrollable = false,
  scrollViewRef, backgroundColor = colors.BODY,
}) => {
  const drawLayoutDependingOnScreenWithFlatList = () => {
    if (hasFlatList) {
      return (
        <View style={{
          ...styles.container,
          backgroundColor,
          paddingHorizontal: noPaddingHorizontal ? 0 : sizes.PADDING_30,
          paddingVertical: Platform.OS === 'android' && !noPaddingVertical ? sizes.PADDING_30 : 0,
        }}
        >
          {children}
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
          {children}
        </View>
      </ScrollView>
    );
  };

  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor,
    }}
    >
      {drawLayoutDependingOnScreenWithFlatList()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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
