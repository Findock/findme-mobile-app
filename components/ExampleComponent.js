import React from 'react';
import { Text } from 'react-native';

const ExampleComponent = ({ text, color }) => {
  return <Text style={{color}}>{text}</Text>
}

export default ExampleComponent;
