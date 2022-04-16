import { StyleSheet, View } from 'react-native';
import { FImage } from 'components/Composition/FImage';
import { getHalfBorderRadius } from 'utils/getHalfBorderRadius';
import sizes from 'themes/sizes';
import fonts from 'themes/fonts';
import { FHeading } from 'components/Composition/FHeading';
import React from 'react';
import { TouchableWithoutFeedback } from 'react-native-web';
import { FHeadingWithIcon } from 'components/Composition/FHeadingWithIcon';
import icons from 'themes/icons';
import colors from 'themes/colors';
import { FCard } from 'components/Composition/FCard';

export const FAnnouncementCard = ({ width, data, height }) => (
  <TouchableWithoutFeedback>
    <View style={{
      height,
      padding: sizes.PADDING_5,
    }}
    >
      <FCard
        width={width}
        paddingHorizontal={sizes.PADDING_10}
        paddingVertical={sizes.PADDING_10}
      >
        <View styles={{
          minHeight: height,
        }}
        >
          <FImage
            networkImageUrl={data.photoURL}
            imageStyle={{
              borderRadius: getHalfBorderRadius(sizes.RADIUS_20),
              overflow: 'hidden',
              height: sizes.HEIGHT_150,
              marginBottom: sizes.MARGIN_5,
            }}
          />
          <FHeading
            title={data.title}
            weight={fonts.HEADING_WEIGHT_BOLD}
            size={fonts.HEADING_NORMAL}
            marginBottom={sizes.MARGIN_5}
            ellipsizeMode="tail"
            numberOfLines={1}
          />
          <FHeading
            title={data.description}
            marginBottom={sizes.MARGIN_10}
            color={colors.DARK_GRAY}
            ellipsizeMode="tail"
            numberOfLines={2}
          />
          <FHeadingWithIcon
            icon={icons.LOCATION_OUTLINE}
            iconColor={colors.PRIMARY}
            title={data.locationName}
            titleStyle={styles.text}
            titleColor={colors.DARK_GRAY}
            numberOfLines={2}
          />
          <FHeadingWithIcon
            icon={icons.CALENDAR}
            iconColor={colors.PRIMARY}
            title={data.date}
            titleStyle={styles.text}
            titleColor={colors.DARK_GRAY}
          />
        </View>
      </FCard>
    </View>
  </TouchableWithoutFeedback>
);

const styles = StyleSheet.create({
  text: {
    marginLeft: sizes.MARGIN_5,
  },
});
