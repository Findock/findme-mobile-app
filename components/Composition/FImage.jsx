import {
  ImageBackground, StyleSheet, View,
} from 'react-native';

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
  image: {
    resizeMode: 'cover',
    flex: 1,
  },
});
