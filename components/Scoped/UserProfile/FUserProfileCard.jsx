import React from 'react';
import sizes from 'themes/sizes';
import { StyleSheet, View, Platform } from 'react-native';
import placements from 'themes/placements';
import colors from 'themes/colors';
import fonts from 'themes/fonts';
import { FHeading } from 'components/Composition/FHeading';
import { FPhoneNumber } from 'components/Utils/FPhoneNumber';
import { parseLocation } from 'utils/parseLocation';
import icons from 'themes/icons';
import { FHeadingWithIcon } from 'components/Composition/FHeadingWithIcon';
import { FAvatar } from 'components/Composition/FAvatar';
import { FCard } from 'components/Composition/FCard';
import { FButton } from 'components/Buttons/FButton';
import buttonTypes from 'constants/buttonTypes';
import locales from 'constants/locales';
import { FStatus } from 'components/Composition/FStatus';
import statusTypes from 'constants/statusTypes';

export const FUserProfileCard = ({
  user, isMe, setShowConfirmDeleteUserProfileImageModal, setShowErrorModal,
}) => {
  const drawAvatarDependingOnUser = () => {
    if (isMe) {
      return (
        <FAvatar
          isEditable
          imageUrl={user?.profileImageUrl}
          size={sizes.WIDTH_120}
          setShowConfirmDeleteUserProfileImageModal={setShowConfirmDeleteUserProfileImageModal}
          setShowErrorModal={setShowErrorModal}
        />
      );
    }
    return (
      <FAvatar
        isEditable={false}
        imageUrl={user?.profileImageUrl}
        size={sizes.WIDTH_120}
      />
    );
  };
  const drawNameHeadingDependingOnUser = () => {
    if (isMe) {
      return (
        <FHeading
          title={user?.name}
          color={colors.BLACK}
          weight={fonts.HEADING_WEIGHT_SEMIBOLD}
          size={fonts.HEADING_EXTRA_LARGE}
          align={placements.CENTER}
        />
      );
    }
    return (
      <View style={{
        ...styles.centerView,
        flexDirection: 'row',
      }}
      >
        <View>
          <FHeading
            title={user?.name}
            color={colors.BLACK}
            weight={fonts.HEADING_WEIGHT_SEMIBOLD}
            size={fonts.HEADING_EXTRA_LARGE}
            align={placements.CENTER}
          />
        </View>
        <FStatus
          status={statusTypes.ACTIVE}
          style={{ marginLeft: sizes.MARGIN_8 }}
        />
      </View>
    );
  };
  return (
    <FCard
      width={sizes.WIDTH_FULL}
      paddingHorizontal={sizes.PADDING_25}
      paddingVertical={sizes.PADDING_25}
      backgroundColor={isMe ? colors.WHITE : colors.LIGHTEST_GRAY}
      style={{
        marginTop: Platform.OS === 'ios' ? sizes.MARGIN_20 : sizes.MARGIN_N20,
        ...styles.centerView,
      }}
    >
      <View style={styles.avatarContainer}>
        {drawAvatarDependingOnUser()}
      </View>
      <View style={styles.widthFull}>
        {drawNameHeadingDependingOnUser()}
        <View style={{
          ...styles.widthFull,
          marginTop: !user.bio ? 0 : sizes.MARGIN_5,
        }}
        >
          <FHeadingWithIcon
            icon={icons.LOCATION_OUTLINE}
            iconSize={sizes.ICON_20}
            iconColor={colors.DARK_GRAY}
            iconPlacement={placements.LEFT}
            title={parseLocation(user.street, user.city)}
            titleColor={colors.DARK_GRAY}
            titleWeight={fonts.HEADING_WEIGHT_MEDIUM}
            titleSize={fonts.HEADING_MEDIUM}
            titleStyle={{ marginLeft: sizes.MARGIN_3 }}
          />
        </View>
        <View style={{
          ...styles.widthFull,
          marginBottom: !user.phoneNumber ? 0 : sizes.MARGIN_8,
        }}
        >
          <FHeading
            title={user?.bio}
            color={colors.DARK_GRAY}
            weight={fonts.HEADING_WEIGHT_MEDIUM}
            size={fonts.HEADING_NORMAL}
            align={placements.CENTER}
          />
        </View>
        {user?.phoneNumber !== '' && (
          <FPhoneNumber
            style={{ marginTop: sizes.MARGIN_20 }}
            phoneNumber={user.phoneNumber}
            color={colors.BLACK}
            weight={fonts.HEADING_WEIGHT_SEMIBOLD}
            size={fonts.HEADING_EXTRA_LARGE}
            align={placements.CENTER}
            isUnderline={!isMe}
          />
        )}
        {!isMe && (
          <View style={{ marginTop: !user.phoneNumber ? 0 : sizes.MARGIN_20 }}>
            <FButton
              type={buttonTypes.BUTTON_WITH_ICON_AND_TEXT}
              backgroundColor={colors.PRIMARY}
              title={locales.WRITE_MESSAGE}
              iconPlacement={placements.RIGHT}
              color={colors.WHITE}
              titleSize={fonts.HEADING_NORMAL}
              icon={icons.PAW}
              iconSize={sizes.ICON_20}
            />
          </View>
        )}
      </View>
    </FCard>
  );
};

const styles = StyleSheet.create({
  avatarContainer: {
    alignItems: placements.CENTER,
  },
  centerView: {
    alignItems: placements.CENTER,
    justifyContent: placements.CENTER,
  },
  widthFull: {
    width: sizes.WIDTH_FULL,
  },
});
