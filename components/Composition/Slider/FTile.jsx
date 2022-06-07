import { FCard } from 'components/Composition/FCard';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import { FHeading } from 'components/Composition/FHeading';
import placements from 'themes/placements';
import tileTypes from 'constants/components/tileTypes';
import { Ionicons } from '@expo/vector-icons';
import { FImage } from 'components/Composition/FImage';
import sizes from 'themes/sizes';

export const FTile = ({
  width,
  height,
  icon,
  title,
  titleSize,
  titleWeight,
  type,
  iconSize,
  iconColor,
  titleColor,
  image,
  imageSize,
  style,
  paddingVertical,
  paddingHorizontal,
  titleStyle,
}) => {
  const drawTextContent = () => (
    <FHeading
      size={titleSize}
      weight={titleWeight}
      title={title}
      align={placements.CENTER}
      color={titleColor}
      style={titleStyle}
    />
  );
  const drawIconContent = () => (
    <Ionicons
      name={icon}
      size={iconSize}
      color={iconColor}
    />
  );

  const drawImageContent = () => (
    <FImage
      networkImageUrl=""
      isChildrenInside={false}
      resizeMode={sizes.CONTAIN}
      imagePath={image}
      height={imageSize}
      width={imageSize}
    />
  );

  const drawContent = () => {
    if (type === tileTypes.TEXT_TILE) {
      return drawTextContent();
    }
    if (type === tileTypes.ICON_TILE) {
      return drawIconContent();
    }
    if (type === tileTypes.ICON_AND_TEXT_TILE) {
      return (
        <>
          {drawIconContent()}
          {drawTextContent()}
        </>
      );
    }
    if (type === tileTypes.IMAGE_TILE) {
      return drawImageContent();
    }
    if (type === tileTypes.IMAGE_AND_TEXT_TILE) {
      return (
        <>
          {drawImageContent()}
          {drawTextContent()}
        </>
      );
    }
  };

  return (
    <View style={{
      width,
      height,
      ...style,
    }}
    >
      <FCard
        width={sizes.WIDTH_FULL}
        style={{
          ...styles.card,
          style,
          height: sizes.HEIGHT_FULL,
        }}
        paddingVertical={paddingVertical}
        paddingHorizontal={paddingHorizontal}
      >
        {drawContent()}
      </FCard>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    justifyContent: placements.CENTER,
    alignItems: placements.CENTER,
  },
});

FTile.propTypes = {
  width: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  height: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  icon: PropTypes.string,
  title: PropTypes.string,
  titleSize: PropTypes.number,
  titleWeight: PropTypes.string,
  type: PropTypes.oneOf(['icon-tile', 'text-tile', 'image-tile', 'image-and-text-tile', 'icon-and-text-tile']).isRequired,
  iconSize: PropTypes.number,
  iconColor: PropTypes.string,
  titleColor: PropTypes.string,
  image: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  imageSize: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  paddingVertical: PropTypes.number,
  paddingHorizontal: PropTypes.number,
};
