import { FDefaultLayout } from 'layouts/FDefault.layout';
import React, { useState } from 'react';
import {
  View, StyleSheet, Dimensions, Platform,
} from 'react-native';
import sizes from 'themes/sizes';
import { useSelector, useDispatch } from 'react-redux';
import colors from 'themes/colors';
import fonts from 'themes/fonts';
import { FWideButton } from 'components/Buttons/FWideButton';
import icons from 'themes/icons';
import locales from 'constants/locales';
import stackNavigatorNames from 'constants/stackNavigatorNames';
import opacities from 'themes/opacities';
import { FCard } from 'components/Composition/FCard';
import { FModal } from 'components/Composition/FModal';
import modalTypes from 'constants/modalTypes';
import { deleteUserProfileImageService } from 'services/deleteUserProfileImage.service';
import { setMe } from 'store/me/meSlice';
import { FUserProfileCard } from 'components/Scoped/UserProfile/FUserProfileCard';
import { FBackButton } from 'components/Buttons/FBackButton';

export const UserProfileScreen = () => {
  const me = useSelector((state) => state.me.me);
  const dispatch = useDispatch();

  const [
    showConfirmDeleteUserProfileImageModal,
    setShowConfirmDeleteUserProfileImageModal,
  ] = useState(false);
  const [
    showErrorModal,
    setShowErrorModal,
  ] = useState(false);

  const deleteImage = async () => {
    try {
      if (showConfirmDeleteUserProfileImageModal) {
        const res = await deleteUserProfileImageService();
        dispatch(setMe(res.data));
      }
    } catch (error) {
      setShowErrorModal(true);
    }
  };

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
        {showConfirmDeleteUserProfileImageModal && (
          <FModal
            type={modalTypes.CONFIRM_MODAL}
            setVisible={setShowConfirmDeleteUserProfileImageModal}
            visible={showConfirmDeleteUserProfileImageModal}
            title={locales.DELETE_USER_PROFILE_IMAGE_CONFIRMATION}
            onConfirm={deleteImage}
          />
        )}
        {showErrorModal && (
          <FModal
            type={modalTypes.INFO_MODAL}
            setVisible={setShowErrorModal}
            visible={showErrorModal}
            title={locales.SOMETHING_WENT_WRONG}
          />
        )}
        <FBackButton navigateTo={stackNavigatorNames.HOMEPAGE} />
      </View>
      <View style={{
        flex: 1,
      }}
      >
        <FUserProfileCard
          user={me}
          isMe
          setShowConfirmDeleteUserProfileImageModal={setShowConfirmDeleteUserProfileImageModal}
          setShowErrorModal={setShowErrorModal}
        />

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
            iconBgColor={colors.DARK_PRIMARY}
            iconColor={colors.WHITE}
            iconSize={sizes.ICON_20}
            buttonBgColor={colors.WHITE}
            titleColor={colors.BLACK}
            arrowColor={colors.DARK_PRIMARY}
            title={locales.YOUR_ANNOUNCEMENTS}
            titleWeight={fonts.HEADING_WEIGHT_SEMIBOLD}
            titleSize={fonts.HEADING_NORMAL}
            isLink
          />
          <FWideButton
            icon={icons.SETTINGS}
            iconBgColor={colors.DARK_PRIMARY}
            iconColor={colors.WHITE}
            iconSize={sizes.ICON_20}
            buttonBgColor={colors.WHITE}
            titleColor={colors.BLACK}
            arrowColor={colors.DARK_PRIMARY}
            title={locales.SETTINGS}
            titleWeight={fonts.HEADING_WEIGHT_SEMIBOLD}
            titleSize={fonts.HEADING_NORMAL}
            isLink
            navigateTo={stackNavigatorNames.SETTINGS}
          />
          <FWideButton
            icon={icons.RECEIPT}
            iconBgColor={colors.DARK_PRIMARY}
            iconColor={colors.WHITE}
            iconSize={sizes.ICON_20}
            buttonBgColor={colors.WHITE}
            titleColor={colors.BLACK}
            arrowColor={colors.DARK_PRIMARY}
            title={locales.LOGIN_HISTORY}
            titleWeight={fonts.HEADING_WEIGHT_SEMIBOLD}
            titleSize={fonts.HEADING_NORMAL}
            isLink
            navigateTo={stackNavigatorNames.LOGIN_HISTORY}
          />
          <FWideButton
            icon={icons.STAR}
            iconBgColor={colors.DARK_PRIMARY}
            iconColor={colors.WHITE}
            iconSize={sizes.ICON_20}
            buttonBgColor={colors.WHITE}
            titleColor={colors.BLACK}
            arrowColor={colors.DARK_PRIMARY}
            title={locales.FOLLOWED}
            titleWeight={fonts.HEADING_WEIGHT_SEMIBOLD}
            titleSize={fonts.HEADING_NORMAL}
            isLink
          />
          <FWideButton
            icon={icons.DUPLICATE}
            iconBgColor={colors.WHITE}
            iconColor={colors.DARK_PRIMARY}
            iconSize={sizes.ICON_20}
            buttonBgColor={colors.DARK_PRIMARY}
            titleColor={colors.WHITE}
            arrowColor={colors.WHITE}
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
