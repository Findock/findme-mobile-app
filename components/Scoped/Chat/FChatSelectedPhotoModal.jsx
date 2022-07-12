import { StyleSheet, View } from 'react-native';
import colors from 'themes/colors';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { FSpinner } from 'components/Composition/FSpinner';
import sizes from 'themes/sizes';
import { FButton } from 'components/Buttons/FButton';
import buttonTypes from 'constants/components/buttonTypes';
import locales from 'constants/locales';
import fonts from 'themes/fonts';
import { FImage } from 'components/Composition/FImage';

export const FChatSelectedPhotoModal = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [
    photo,
    setPhoto,
  ] = useState(null);

  useEffect(() => {
    if (route.params.photo) {
      setPhoto(route.params.photo);
    }
  }, [route.params?.photo]);

  const cancelHandler = () => {
    setPhoto(null);
    navigation.goBack();
  };

  if (!photo) return <FSpinner />;
  return (
    <View style={styles.container}>
      <View style={styles.photoContainer}>
        <FImage
          networkImageUrl={photo.url}
          isChildrenInside={false}
          resizeMode={sizes.CONTAIN}
          width={sizes.WIDTH_FULL}
        />
      </View>
      <View style={styles.buttonsContainer}>
        <FButton
          type={buttonTypes.OUTLINE_TEXT_BUTTON}
          title={locales.CANCEL}
          color={colors.PRIMARY}
          titleWeight={fonts.HEADING_WEIGHT_MEDIUM}
          titleSize={fonts.HEADING_MEDIUM}
          onPress={cancelHandler}
        />
        <FButton
          type={buttonTypes.LOADING_BUTTON}
          title={locales.SEND}
          backgroundColor={colors.PRIMARY}
          color={colors.WHITE}
          titleWeight={fonts.HEADING_WEIGHT_MEDIUM}
          titleSize={fonts.HEADING_MEDIUM}
          onPress={() => {
            route.params?.sendPhotoHandler();
            navigation.goBack();
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  photoContainer: {
    height: sizes.HEIGHT_90_PERCENTAGES,
    width: sizes.WIDTH_FULL,
  },
  buttonsContainer: {
    width: sizes.WIDTH_FULL,
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: sizes.PADDING_20,
  },
});
