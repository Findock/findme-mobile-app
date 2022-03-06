import { FLogo } from 'components/Composition/FLogo';
import { FKeyboardWrapper } from 'components/Utils/FKeyboardWrapper';
import React from 'react';
import {
  SafeAreaView, ScrollView, Dimensions, StyleSheet, Platform, View,
} from 'react-native';
import colors from 'themes/colors';
import sizes from 'themes/sizes';

export const FDefaultLayout = ({
  children, withLogo, hasFlatList, noPaddingVertical = false,
}) => {
  const drawLayoutDependingOnScreenWithLogo = () => {
    if (withLogo) {
      return (
        <>
          <View style={styles.topBox}>
            {children[0]}
            <FLogo
              fill={false}
              color={colors.GREEN}
            />
          </View>
          <View>
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
          paddingVertical: Platform.OS === 'android' && !noPaddingVertical ? 30 : 0,
        }}
        >
          {drawLayoutDependingOnScreenWithLogo()}
        </View>
      );
    }
    return (
      <ScrollView
        scrollEnabled={Dimensions.get('window').height < 700}
        style={{
          flex: 1,
          backgroundColor: colors.BODY,
        }}
      >
        <View style={{
          ...styles.container,
          paddingVertical: Platform.OS === 'android' && !noPaddingVertical ? 30 : 0,
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
    flex: 1,
    paddingHorizontal: sizes.PADDING_30,
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
