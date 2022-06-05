import {
  Dimensions, Modal, StyleSheet, View,
} from 'react-native';
import sizes from 'themes/sizes';
import colors from 'themes/colors';
import placements from 'themes/placements';
import { FButton } from 'components/Buttons/FButton';
import buttonTypes from 'constants/components/buttonTypes';
import icons from 'themes/icons';
import { FSliderWithFullscreenPreview } from 'components/Composition/Slider/FSliderWithFullscreenPreview';

export const FFullscreenImagePreview = ({
  visible,
  setVisible,
  photos,
  chosenImage,
}) => {
  const getIndexOfChosenImage = () => {
    if (photos) {
      const chosenPhoto = photos.find((photo) => photo === chosenImage);
      if (chosenPhoto) return photos.indexOf(chosenPhoto);
    }
  };
  return (
    <Modal
      visible={visible}
      setVisible={setVisible}
      transparent
      animationType="fade"
    >
      <View
        style={styles.modalContainer}
      >
        <View style={styles.rowContainer}>
          <FButton
            type={buttonTypes.ICON_BUTTON}
            icon={icons.CLOSE_OUTLINE}
            iconSize={sizes.ICON_30}
            color={colors.WHITE}
            onPress={() => setVisible(false)}
          />
        </View>
        <View style={styles.sliderContainer}>
          <FSliderWithFullscreenPreview
            photos={photos}
            height={sizes.HEIGHT_FULL}
            imageResizeMode={sizes.CONTAIN}
            startingIndex={getIndexOfChosenImage()}
          />
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  modalContainer: {
    top: 0,
    left: 0,
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    backgroundColor: colors.BLACK,
    alignItems: placements.CENTER,
    justifyContent: placements.CENTER,
  },
  sliderContainer: {
    height: sizes.HEIGHT_80_PERCENTAGES,
    width: sizes.WIDTH_FULL,
  },
  rowContainer: {
    width: sizes.WIDTH_FULL,
    alignItems: 'flex-end',
  },
});
