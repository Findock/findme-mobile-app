import React from 'react';
import {
  SafeAreaView, ScrollView, StyleSheet, View,
} from 'react-native';
import colors from 'themes/colors';
import sizes from 'themes/sizes';
import { isSmallScreen } from 'utils/isSmallScreen';

export const FDefaultLayout = ({
  children, hasFlatList, noPaddingVertical = false, noPaddingHorizontal = false, isAlwaysScrollable = false,
  scrollViewRef,
}) => {
  const drawLayoutDependingOnScreenWithFlatList = () => {
    if (hasFlatList) {
      return (
        <View style={{
          ...styles.container,
          paddingHorizontal: noPaddingHorizontal ? 0 : sizes.PADDING_30,
          paddingVertical: !noPaddingVertical ? sizes.PADDING_30 : 0,
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
        showsVerticalScrollIndicator={false}
      >
        <View style={{
          ...styles.container,
          paddingHorizontal: noPaddingHorizontal ? 0 : sizes.PADDING_30,
          paddingVertical: !noPaddingVertical ? sizes.PADDING_30 : 0,
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
      backgroundColor: colors.WHITE,
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
});
