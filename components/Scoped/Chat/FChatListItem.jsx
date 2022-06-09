import { StyleSheet, View } from 'react-native';
import sizes from 'themes/sizes';
import colors from 'themes/colors';
import { FAvatar } from 'components/Composition/FAvatar';
import { FHeading } from 'components/Composition/FHeading';
import fonts from 'themes/fonts';
import { FStatus } from 'components/Composition/FStatus';
import statusTypes from 'constants/components/statusTypes';
import placements from 'themes/placements';
import { useSelector } from 'react-redux';
import defaultBoxShadow from 'styles/defaultBoxShadow';
import { getHalfBorderRadius } from 'styles/utils/getHalfBorderRadius';

export const FChatListItem = () => {
  const me = useSelector((state) => state.me.me);

  return (
    <View style={styles.container}>
      <View style={{ flexBasis: sizes.BASIS_20_PERCENTAGES }}>
        <FAvatar
          size={sizes.WIDTH_50}
          isEditable={false}
          imageUrl={me.profileImageUrl}
        />
      </View>
      <View style={{ flexBasis: sizes.BASIS_80_PERCENTAGES }}>
        <View style={styles.middleContainer}>
          <View style={styles.topBox}>
            <FStatus
              status={statusTypes.ACTIVE}
              style={{ marginRight: sizes.MARGIN_3 }}
            />
            <View style={{ paddingRight: sizes.PADDING_15 }}>
              <FHeading
                size={fonts.HEADING_NORMAL}
                weight={fonts.HEADING_WEIGHT_BOLD}
                title={me.name}
                numberOfLines={1}
                ellipsizeMode="tail"
              />
            </View>
          </View>
          <View style={{ flexBasis: sizes.BASIS_30_PERCENTAGES }}>
            <FHeading
              size={fonts.HEADING_EXTRA_SMALL}
              weight={fonts.HEADING_WEIGHT_REGULAR}
              title="Przed chwila"
              color={colors.DARK_GRAY}
              align={placements.RIGHT}
            />
          </View>
        </View>
        <View style={styles.lastContainer}>
          <View style={styles.messageBox}>
            <FHeading
              size={fonts.HEADING_SMALL}
              weight={fonts.HEADING_WEIGHT_MEDIUM}
              title="Widziałam tego psiaka wczoraj pod sklepem osiedlowym."
              color={colors.DARK_GRAY}
              ellipsizeMode="tail"
              numberOfLines={2}
            />
          </View>
          <View style={styles.messagesAmountBox}>
            <FHeading
              size={fonts.HEADING_EXTRA_SMALL}
              weight={fonts.HEADING_WEIGHT_BOLD}
              title="2"
              align={placements.CENTER}
              color={colors.WHITE}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: sizes.WIDTH_FULL,
    backgroundColor: colors.WHITE,
    flexDirection: 'row',
    ...defaultBoxShadow,
    paddingVertical: sizes.PADDING_25,
    paddingHorizontal: sizes.PADDING_10,
    alignItems: placements.CENTER,
    borderRadius: sizes.RADIUS_15,
  },
  middleContainer: {
    flexDirection: 'row',
    alignItems: placements.CENTER,
  },
  topBox: {
    flexDirection: 'row',
    alignItems: placements.CENTER,
    flexBasis: sizes.BASIS_70_PERCENTAGES,
  },
  lastContainer: {
    width: sizes.WIDTH_FULL,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: placements.CENTER,
  },
  messageBox: {
    flexBasis: sizes.BASIS_80_PERCENTAGES,
    marginLeft: sizes.MARGIN_15,
    marginTop: sizes.MARGIN_5,
  },
  messagesAmountBox: {
    borderRadius: getHalfBorderRadius(sizes.WIDTH_22),
    backgroundColor: colors.SECONDARY,
    width: sizes.WIDTH_22,
    height: sizes.HEIGHT_22,
    alignItems: placements.CENTER,
    justifyContent: placements.CENTER,
  },
});
