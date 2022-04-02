import { Ionicons } from '@expo/vector-icons';
import { FBadge } from 'components/Composition/FBadge';
import { FInput } from 'components/Inputs/FInput';
import { FMultiSelectOption } from 'components/Inputs/MultiSelect/FMultiSelectOption';
import inputTypes from 'constants/inputTypes';
import locales from 'constants/locales';
import React, { useEffect, useRef, useState } from 'react';
import {
  View, FlatList, StyleSheet, Dimensions, TouchableWithoutFeedback, Keyboard, Animated,
} from 'react-native';
import colors from 'themes/colors';
import icons from 'themes/icons';
import sizes from 'themes/sizes';
import Easing from 'react-native/Libraries/Animated/Easing';

export const FMultiSelect = ({ style }) => {
  const screenHeight = Dimensions.get('window').height;
  const animation = useRef(new Animated.Value(0));
  const [
    showMultiSelectOptions,
    setShowMultiSelectOptions,
  ] = useState(false);
  const [
    search,
    setSearch,
  ] = useState('');
  const [
    selectedOptions,
    setSelectedOptions,
  ] = useState([]);
  const options = [];

  const selectedOptionsAnimation = {
    transform: [
      {
        translateY: animation.current.interpolate({
          inputRange: [0, 1],
          outputRange: [screenHeight, 0],
          extrapolate: 'clamp',
        }),
      },
    ],
    opacity: animation.current.interpolate({
      inputRange: [0.01, 0.5],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    }),
  };

  useEffect(() => {
    if (showMultiSelectOptions) handleOpen();
  }, [showMultiSelectOptions]);

  const handleOpen = () => {
    Animated.timing(animation.current, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
      easing: Easing.ease,
    }).start();
  };
  const handleClose = () => {
    Animated.timing(animation.current, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
      easing: Easing.ease,
    }).start();
  };

  const searchInputHandler = (newSerach) => {
    setSearch(newSerach);
  };

  const selectedOptionsHandler = (option) => {
    const existingOption = selectedOptions.find((o) => o.id === option.id);
    if (existingOption) {
      selectedOptions.splice(selectedOptions.indexOf(existingOption), 1);
      setSelectedOptions([...selectedOptions]);
    } else setSelectedOptions([...selectedOptions, option]);
  };

  const drawMultiSelectOptions = ({ item }) => (
    <FMultiSelectOption
      key={item.id}
      label={item.key}
      setValue={() => selectedOptionsHandler(item)}
      value={!!selectedOptions.find((selectedOption) => selectedOption.id === item.id)}
    />
  );

  const handleOnCloseMultiSelectOptions = () => {
    setSearch('');
    handleClose();
    setTimeout(() => {
      setShowMultiSelectOptions(false);
    }, 300);
  };

  const drawSelectedOptions = () => selectedOptions && selectedOptions.map((selectedOption) => (
    <FBadge
      isFill
      color={colors.PRIMARY}
      title={selectedOption.key}
      style={{
        paddingVertical: sizes.PADDING_10,
        marginRight: sizes.MARGIN_10,
        marginBottom: sizes.MARGIN_10,
      }}
    />
  ));

  return (
    <>
      <View style={{ ...style }}>
        <View style={styles.selectedOptionsContainer}>
          {drawSelectedOptions()}
        </View>
        <FInput
          type={inputTypes.TEXT}
          width={sizes.WIDTH_FULL}
          placeholder={locales.SEARCH}
          marginBottom={0}
          showSoftInputOnFocus={false}
          caretHidden
          onPress={() => {
            Keyboard.dismiss();
            setShowMultiSelectOptions(true);
          }}
        />
      </View>
      {showMultiSelectOptions && (
        <Animated.View style={{
          ...styles.absoluteContainer,
          ...selectedOptionsAnimation,
        }}
        >
          <View style={{ flexGrow: 1 }}>
            <FlatList
              data={options}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              scrollEnabled
              renderItem={drawMultiSelectOptions}
              style={{ width: sizes.WIDTH_FULL }}
              ListHeaderComponent={(
                <>
                  <TouchableWithoutFeedback
                    onPress={handleOnCloseMultiSelectOptions}
                    hitSlop={{
                      top: sizes.POSITION_20,
                      left: sizes.POSITION_20,
                      bottom: sizes.POSITION_20,
                      right: sizes.POSITION_20,
                    }}
                  >
                    <Ionicons
                      name={icons.CLOSE_OUTLINE}
                      size={sizes.ICON_30}
                      color={colors.DARK_GRAY}
                      style={{ alignSelf: 'flex-end' }}
                    />
                  </TouchableWithoutFeedback>
                  <View style={{ marginTop: sizes.MARGIN_10 }}>
                    <FInput
                      placeholder={locales.SEARCH}
                      type={inputTypes.TEXT}
                      value={search}
                      onChangeText={searchInputHandler}
                      width={sizes.WIDTH_FULL}
                    />
                  </View>
                </>
              )}
              contentContainerStyle={{
                paddingBottom: 100,
              }}
              ItemSeparatorComponent={() => (
                <View style={{
                  width: sizes.WIDTH_FULL,
                  paddingTop: sizes.PADDING_14,
                }}
                />
              )}
            />
          </View>
        </Animated.View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  absoluteContainer: {
    position: 'absolute',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: colors.WHITE,
    zIndex: 3,
    padding: sizes.PADDING_30,
  },
  selectedOptionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
