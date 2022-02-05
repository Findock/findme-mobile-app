import { Text } from 'react-native';

export const FHeading = ({
  title, size, color, weight,
}) => (
  <Text style={{
    fontSize: size,
    color,
    fontWeight: weight,
  }}
  >
    {title}
  </Text>
);
