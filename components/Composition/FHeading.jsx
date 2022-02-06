import { Text, View } from 'react-native';

export const FHeading = ({
  title, size, color, weight, align,
}) => (
  <View>
    <Text style={{
      fontSize: size,
      color,
      fontWeight: weight,
      textAlign: align,
    }}
    >
      {title}
    </Text>
  </View>
);
