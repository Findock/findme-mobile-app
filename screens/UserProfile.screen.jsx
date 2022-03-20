import { FAvatar } from 'components/Composition/FAvatar';
import { FHeading } from 'components/Composition/FHeading';
import { FDefaultLayout } from 'layouts/FDefault.layout';
import React, { useState } from 'react';
import {
  View, StyleSheet, Dimensions, Platform,
} from 'react-native';
import placements from 'themes/placements';
import sizes from 'themes/sizes';
import { useSelector } from 'react-redux';
import colors from 'themes/colors';
import fonts from 'themes/fonts';
import { FWideButton } from 'components/Buttons/FWideButton';
import icons from 'themes/icons';
import locales from 'constants/locales';
import stackNavigatorNames from 'constants/stackNavigatorNames';
import { FButton } from 'components/Buttons/FButton';
import buttonTypes from 'constants/buttonTypes';
import { useNavigation } from '@react-navigation/native';
import opacities from 'themes/opacities';
import { FCard } from 'components/Composition/FCard';
import { FHeadingWithIcon } from 'components/Composition/FHeadingWithIcon';
import { FPhoneNumber } from 'components/Utils/FPhoneNumber';
import { parseLocation } from '../utils/parseLocation';

export const UserProfileScreen = () => {
  const me = useSelector((state) => state.me.me);
  const navigation = useNavigation();
  const [
    image,
    setImage,
  ] = useState(null);

  return (
    <FDefaultLayout
      withLogo
      hasFlatList={false}
      topBoxStyle={styles.topBox}
      backgroundColor={colors.GRAY}
      isAlwaysScrollable
    >
      <View style={{
        left: sizes.POSITION_N30,
      }}
      >
        <FButton
          type={buttonTypes.BUTTON_WITH_ICON_AND_TEXT}
          title={locales.GO_BACK}
          icon={Platform.OS === 'android' ? icons.ARROW_BACK : icons.CHEVRON_BACK_OUTLINE}
          iconSize={sizes.ICON_22}
          iconPlacement={placements.LEFT}
          titleSize={fonts.HEADING_MEDIUM}
          color={colors.BLACK}
          iconColor={colors.BLACK}
          onPress={() => navigation.navigate(stackNavigatorNames.HOMEPAGE)}
        />
      </View>
      <View style={{
        flex: 1,
      }}
      >
        <FCard
          width={sizes.WIDTH_FULL}
          paddingHorizontal={sizes.PADDING_25}
          paddingVertical={sizes.PADDING_25}
          style={{
            marginTop: sizes.MARGIN_80,
            ...styles.centerView,
          }}
        >
          <View style={styles.avatarContainer}>
            <FAvatar
              isEditable
              image={image}
              setImage={setImage}
              size={sizes.WIDTH_120}
            />
          </View>
          <View style={styles.headingsContainer}>
            <FHeading
              title={me?.name}
              color={colors.BLACK}
              weight={fonts.HEADING_WEIGHT_BOLD}
              size={fonts.HEADING_EXTRA_LARGE}
              align={placements.CENTER}
            />
            <View style={styles.locationContainer}>
              <FHeadingWithIcon
                icon={icons.LOCATION_OUTLINE}
                iconSize={sizes.ICON_20}
                iconColor={colors.DARK_GRAY}
                iconPlacement={placements.LEFT}
                title={parseLocation(me.street, me.city)}
                titleColor={colors.DARK_GRAY}
                titleWeight={Platform.OS === 'android' ? fonts.HEADING_WEIGHT_SEMIBOLD : fonts.HEADING_WEIGHT_MEDIUM}
                titleSize={fonts.HEADING_MEDIUM}
                titleStyle={{ marginLeft: sizes.MARGIN_3 }}
              />
            </View>
            <View style={styles.bioContainer}>
              <FHeading
                title={me?.bio}
                color={colors.DARK_GRAY}
                weight={fonts.HEADING_WEIGHT_MEDIUM}
                size={fonts.HEADING_NORMAL}
                align={placements.CENTER}
              />
            </View>
            {me?.phoneNumber !== '' && (
              <FPhoneNumber
                style={{ marginTop: sizes.MARGIN_20 }}
                phoneNumber={me.phoneNumber}
                color={colors.BLACK}
                weight={fonts.HEADING_WEIGHT_BOLD}
                size={fonts.HEADING_EXTRA_LARGE}
                align={placements.CENTER}
              />
            )}
          </View>
        </FCard>
        <FCard
          width={sizes.WIDTH_FULL}
          paddingVertical={sizes.PADDING_12}
          style={{
            marginTop: sizes.MARGIN_20,
            overflow: 'hidden',
          }}
        >
          <FWideButton
            icon={icons.MEGAPHONE}
            iconBgColor={colors.GREEN}
            iconColor={colors.WHITE}
            iconSize={sizes.ICON_20}
            buttonBgColor={colors.WHITE}
            titleColor={colors.BLACK}
            title={locales.YOUR_ANNOUNCEMENTS}
            titleWeight={fonts.HEADING_WEIGHT_SEMIBOLD}
            titleSize={fonts.HEADING_NORMAL}
            isLink
          />
          <FWideButton
            icon={icons.SETTINGS}
            iconBgColor={colors.GREEN}
            iconColor={colors.WHITE}
            iconSize={sizes.ICON_20}
            buttonBgColor={colors.WHITE}
            titleColor={colors.BLACK}
            title={locales.SETTINGS}
            titleWeight={fonts.HEADING_WEIGHT_SEMIBOLD}
            titleSize={fonts.HEADING_NORMAL}
            isLink
            navigateTo={stackNavigatorNames.SETTINGS}
          />
          <FWideButton
            icon={icons.RECEIPT}
            iconBgColor={colors.GREEN}
            iconColor={colors.WHITE}
            iconSize={sizes.ICON_20}
            buttonBgColor={colors.WHITE}
            titleColor={colors.BLACK}
            title={locales.LOGIN_HISTORY}
            titleWeight={fonts.HEADING_WEIGHT_SEMIBOLD}
            titleSize={fonts.HEADING_NORMAL}
            isLink
            navigateTo={stackNavigatorNames.LOGIN_HISTORY}
          />
          <FWideButton
            icon={icons.STAR}
            iconBgColor={colors.GREEN}
            iconColor={colors.WHITE}
            iconSize={sizes.ICON_20}
            buttonBgColor={colors.WHITE}
            titleColor={colors.BLACK}
            title={locales.FOLLOWED}
            titleWeight={fonts.HEADING_WEIGHT_SEMIBOLD}
            titleSize={fonts.HEADING_NORMAL}
            isLink
          />
          <FWideButton
            icon={icons.DUPLICATE}
            iconBgColor={colors.WHITE}
            iconColor={colors.GREEN}
            iconSize={sizes.ICON_20}
            buttonBgColor={colors.GREEN}
            titleColor={colors.WHITE}
            title={locales.ADD_ANNOUNCEMENT}
            titleWeight={fonts.HEADING_WEIGHT_SEMIBOLD}
            titleSize={fonts.HEADING_NORMAL}
            onPress={() => { }}
            style={styles.lastWideButton}
            isLink
          />
        </FCard>
      </View>
    </FDefaultLayout>
  );
};

const styles = StyleSheet.create({
  avatarContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: sizes.POSITION_N60,
    alignItems: placements.CENTER,
  },
  centerView: {
    alignItems: placements.CENTER,
    justifyContent: placements.CENTER,
  },
  headingsContainer: {
    width: sizes.WIDTH_FULL,
    marginTop: sizes.MARGIN_50,
  },
  locationContainer: {
    width: sizes.WIDTH_FULL,
  },
  bioContainer: {
    width: sizes.WIDTH_FULL,
    marginTop: sizes.MARGIN_8,
  },
  wideButtonsContainer: {
    paddingTop: sizes.PADDING_12,
    width: Dimensions.get('window').width,
    justifyContent: 'flex-end',
    elevation: sizes.ELEVATION_15,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowColor: colors.BLACK,
    shadowOpacity: opacities.SHADOW_OPACITY_01,
    shadowRadius: sizes.SHADOW_RADIUS_10,
    left: sizes.MARGIN_N30,
    borderTopLeftRadius: sizes.RADIUS_40,
    borderTopRightRadius: sizes.RADIUS_40,
    marginBottom: Platform.OS === 'android' ? sizes.MARGIN_N30 : 0,
    overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
    backgroundColor: colors.WHITE,
  },
  lastWideButton: {
    marginTop: sizes.MARGIN_12,
    marginBottom: sizes.MARGIN_20,
  },
});
