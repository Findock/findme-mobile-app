import { Text, View } from 'react-native';
import placements from 'themes/placements';

export const FHeading = ({
  title, size, color, weight, align = placements.LEFT,
}) => (
  <View style={{ width: '100%' }}>
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
