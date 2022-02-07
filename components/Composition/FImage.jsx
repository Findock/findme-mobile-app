import {
  ImageBackground, StyleSheet, View,
} from 'react-native';
import sizes from 'themes/sizes';

export const FImage = ({
  width, height, imagePath, children,
}) => (
  <View style={{
    width,
    height,
  }}
  >
    <ImageBackground
      source={imagePath}
      style={styles.image}
    />
    {children}
  </View>
);

const styles = StyleSheet.create({
  imageContainer: {

  },
  image: {
    resizeMode: 'cover',
    flex: 1,
  },
});
