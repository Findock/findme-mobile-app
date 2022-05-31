import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { FAvatar } from 'components/Composition/FAvatar';
import sizes from 'themes/sizes';
import { FHeading } from 'components/Composition/FHeading';
import fonts from 'themes/fonts';
import placements from 'themes/placements';
import colors from 'themes/colors';
import { parseDate } from 'utils/parseDate';
import dateFormatTypes from 'constants/dateFormatTypes';
import { useNavigation } from '@react-navigation/native';
import { FButton } from 'components/Buttons/FButton';
import buttonTypes from 'constants/components/buttonTypes';
import locales from 'constants/locales';
import { FImage } from 'components/Composition/FImage';
import icons from 'themes/icons';
import stackNavigatorNames from 'constants/stackNavigatorNames';
import { useSelector } from 'react-redux';
import { FInput } from 'components/Inputs/FInput';
import placeholders from 'constants/components/inputs/placeholders';
import inputTypes from 'constants/components/inputs/inputTypes';
import { FCommentActionsModal } from 'components/Scoped/Announcement/Comments/FCommentActionsModal';

export const FComment = ({ createMode, isCommentCreator, isUserCreator }) => {
  const navigation = useNavigation();
  const me = useSelector((state) => state.me.me);

  const [
    showMore,
    setShowMore,
  ] = useState(false);
  const [
    hasMoreLines,
    setHasMoreLines,
  ] = useState(false);
  const [
    comment,
    setComment,
  ] = useState('');
  const [
    showCommentActionsModal,
    setShowCommentActionsModal,
  ] = useState(false);

  const checkIfHasMoreLines = React.useCallback((e) => {
    if (e.nativeEvent.lines.length > 4) setHasMoreLines(true);
  });

  const commentHandler = (newComment) => {
    setComment(newComment);
  };

  const drawContent = () => {
    if (createMode) {
      return (
        <>
          <View style={{
            flexBasis: sizes.BASIS_10_PERCENTAGES,
            marginRight: sizes.MARGIN_10,
          }}
          >
            <TouchableOpacity onPress={() => navigation.navigate(stackNavigatorNames.USER_PROFILE)}>
              <FAvatar
                size={sizes.WIDTH_35}
                isEditable={false}
                imageUrl={me.profileImageUrl}
              />
            </TouchableOpacity>
          </View>
          <View style={{ flexBasis: sizes.BASIS_90_PERCENTAGES }}>
            <FInput
              placeholder={placeholders.ADD_COMMENT}
              width={sizes.WIDTH_FULL}
              type={inputTypes.TEXTAREA}
              textAreaHeight={sizes.HEIGHT_80}
              onChangeText={commentHandler}
              value={comment}
              marginBottom={sizes.MARGIN_12}
              transparent
              textAreaPaddingHorizontal={0}
            />
            <View style={{
              ...styles.rowContainer,
              justifyContent: 'space-between',
            }}
            >
              <View style={{ flexDirection: 'row' }}>
                <FButton
                  type={buttonTypes.ICON_BUTTON}
                  iconSize={sizes.ICON_30}
                  icon={icons.ATTACH_OUTLINE}
                  color={colors.PRIMARY}
                  buttonViewStyles={{
                    padding: 0,
                    marginRight: sizes.MARGIN_12,
                  }}
                />
                <FButton
                  type={buttonTypes.ICON_BUTTON}
                  iconSize={sizes.ICON_30}
                  icon={icons.CAMERA_OUTLINE}
                  color={colors.PRIMARY}
                  buttonViewStyles={{
                    padding: 0,
                    marginRight: sizes.MARGIN_12,
                  }}
                />
                <FButton
                  type={buttonTypes.ICON_BUTTON}
                  iconSize={sizes.ICON_27}
                  icon={icons.LOCATION_OUTLINE}
                  color={colors.PRIMARY}
                  buttonViewStyles={{ padding: 0 }}
                />
              </View>
              <FButton
                type={buttonTypes.ICON_BUTTON}
                iconSize={sizes.ICON_35}
                icon={icons.SEND_OUTLINE}
                color={colors.PRIMARY}
                buttonViewStyles={{ padding: 0 }}
              />
            </View>
          </View>
        </>
      );
    }
    return (
      <>
        <View style={{
          flexBasis: sizes.BASIS_10_PERCENTAGES,
          marginRight: sizes.MARGIN_10,
        }}
        >
          <TouchableOpacity onPress={() => navigation.navigate('')}>
            <FAvatar
              size={sizes.WIDTH_35}
              isEditable={false}
              imageUrl="https://upload.wikimedia.org/wikipedia/commons/0/0e/Grazyna_Krukowna.jpg"
            />
          </TouchableOpacity>
        </View>
        <View style={{ flexBasis: (isUserCreator || isCommentCreator) ? sizes.BASIS_80_PERCENTAGES : sizes.BASIS_90_PERCENTAGES }}>
          <View style={{
            ...styles.rowContainer,
            justifyContent: (isUserCreator || isCommentCreator) ? '' : 'space-between',
          }}
          >
            <View style={{ flexBasis: sizes.BASIS_50_PERCENTAGES }}>
              <FHeading
                title="Grayżyna Torbacz jdasd ajsdaj sdja jsdaj jasdj jas djads"
                size={fonts.HEADING_SMALL}
                align={placements.LEFT}
                weight={fonts.HEADING_WEIGHT_MEDIUM}
                numberOfLines={1}
                ellipsizeMode="tail"
              />
            </View>
            <View style={{
              flexBasis: sizes.BASIS_50_PERCENTAGES,
            }}
            >
              <FHeading
                title={parseDate(dateFormatTypes.DATE_TIME, '2014-09-08T08:02:17-05:00')}
                size={fonts.HEADING_SMALL}
                align={placements.RIGHT}
                weight={fonts.HEADING_WEIGHT_REGULAR}
                color={colors.DARK_GRAY}
              />
              <View style={{
                width: sizes.WIDTH_FULL,
                alignItems: 'flex-end',
              }}
              >
                <FButton
                  type={buttonTypes.LINK_BUTTON}
                  color={colors.PRIMARY}
                  titleSize={fonts.HEADING_NORMAL}
                  titleWeight={fonts.HEADING_WEIGHT_MEDIUM}
                  isUnderline
                  title={locales.SEE_LOCATION}
                  buttonViewStyles={{
                    paddingHorizontal: 0,
                    paddingVertical: 0,
                    marginTop: sizes.MARGIN_5,
                  }}
                />
              </View>
            </View>
          </View>
          <View style={{
            marginTop: sizes.MARGIN_10,
            alignItems: 'flex-start',
            width: sizes.WIDTH_FULL,
          }}
          >
            <FHeading
              title="Widziałem go przy monopolowym, jakiś gościu chciał go sprzedać za 2 flaszki. Widziałem go przy monopolowym, jakiś gościu chciał go sprzedać za 2 flaszki.
                Widziałem go przy monopolowym, jakiś gościu chciał go sprzedać za 2 flaszki.
                Widziałem go przy monopolowym, jakiś gościu chciał go sprzedać za 2 flaszki.
                Widziałem go przy monopolowym, jakiś gościu chciał go sprzedać za 2 flaszki.
                Widziałem go przy monopolowym, jakiś gościu chciał go sprzedać za 2 flaszki.
                Widziałem go przy monopolowym, jakiś gościu chciał go sprzedać za 2 flaszki.
                Widziałem go przy monopolowym, jakiś gościu chciał go sprzedać za 2 flaszki."
              size={fonts.HEADING_NORMAL}
              align={placements.LEFT}
              weight={fonts.HEADING_WEIGHT_REGULAR}
              numberOfLines={showMore ? 0 : 4}
              ellipsizeMode="tail"
              onTextLayout={checkIfHasMoreLines}
            />
            {hasMoreLines && !showMore && (
              <FButton
                type={buttonTypes.TEXT_BUTTON}
                color={colors.DARK_GRAY}
                titleSize={fonts.HEADING_SMALL}
                titleWeight={fonts.HEADING_WEIGHT_MEDIUM}
                title={locales.SHOW_MORE}
                buttonViewStyles={{
                  paddingHorizontal: 0,
                  paddingVertical: 0,
                  marginTop: sizes.MARGIN_5,
                }}
                onPress={() => setShowMore(true)}
              />
            )}
          </View>
          <View style={styles.photosContainer}>
            <FImage
              networkImageUrl="https://upload.wikimedia.org/wikipedia/commons/0/0e/Grazyna_Krukowna.jpg"
              height={sizes.WIDTH_50}
              width={sizes.HEIGHT_50}
              imageHeight={sizes.HEIGHT_FULL}
              imageWidth={sizes.WIDTH_FULL}
              imagePath=""
              containerStyle={{ marginRight: sizes.MARGIN_8 }}
              resizeMode={sizes.COVER}
              isChildrenInside={false}
            />
            <FImage
              networkImageUrl="https://upload.wikimedia.org/wikipedia/commons/0/0e/Grazyna_Krukowna.jpg"
              height={sizes.WIDTH_50}
              width={sizes.HEIGHT_50}
              imageHeight={sizes.HEIGHT_FULL}
              imageWidth={sizes.WIDTH_FULL}
              imagePath=""
              containerStyle={{ marginRight: sizes.MARGIN_8 }}
              resizeMode={sizes.COVER}
              isChildrenInside={false}
            />
            <FImage
              networkImageUrl="https://upload.wikimedia.org/wikipedia/commons/0/0e/Grazyna_Krukowna.jpg"
              height={sizes.WIDTH_50}
              width={sizes.HEIGHT_50}
              imageHeight={sizes.HEIGHT_FULL}
              imageWidth={sizes.WIDTH_FULL}
              imagePath=""
              containerStyle={{ marginRight: sizes.MARGIN_8 }}
              resizeMode={sizes.COVER}
              isChildrenInside={false}
            />
          </View>
        </View>
        {(isUserCreator || isCommentCreator) && (
          <View style={{
            flexBasis: sizes.BASIS_10_PERCENTAGES,
            alignItems: 'flex-end',
          }}
          >
            <FButton
              type={buttonTypes.ICON_BUTTON}
              color={colors.DARK_GRAY}
              icon={icons.ELLIPSIS_VERTICAL_OUTLINE}
              iconSize={sizes.ICON_25}
              buttonViewStyles={{
                paddingHorizontal: 0,
                paddingVertical: 0,
              }}
            />
          </View>
        )}
      </>
    );
  };

  return (
    <View style={styles.container}>
      <FCommentActionsModal
        canDelete={isUserCreator || isCommentCreator}
        canEdit={isCommentCreator}
        setVisible={setShowCommentActionsModal}
        visible={showCommentActionsModal}
      />
      {drawContent()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: sizes.WIDTH_FULL,
    backgroundColor: colors.WHITE,
    borderBottomColor: colors.GRAY,
    borderBottomWidth: sizes.BORDER_1,
    flexDirection: 'row',
    padding: sizes.PADDING_20,
    justifyContent: placements.CENTER,
  },
  rowContainer: {
    flexDirection: 'row',
    width: sizes.WIDTH_FULL,
  },
  photosContainer: {
    flexDirection: 'row',
    width: sizes.WIDTH_FULL,
    marginTop: sizes.MARGIN_12,
  },
});

FComment.propTypes = {
  createMode: PropTypes.bool.isRequired,
  isUserCreator: PropTypes.bool.isRequired,
  isCommentCreator: PropTypes.bool.isRequired,
};
