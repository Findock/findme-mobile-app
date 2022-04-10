import { storiesOf } from '@storybook/react-native';
import { Circle } from 'components/Composition/FColorSelect';
import { CenterView } from 'storybook/utils/CenterView';
import { useState } from 'react';
import { ScrollView, View } from 'react-native';

const COLORS = [
  {
    id: 1,
    hex: '#0D1821',
    key: 'AQUAMARINE',
  },
  {
    id: 2,
    hex: '#344966',
    key: 'YELLOW',
  },
  {
    id: 3,
    hex: '#FFFFFF',
    key: 'WHITE',
  },
  {
    id: 4,
    hex: '#B4CDED',
    key: 'AQUAMARINE',
  },
  {
    id: 5,
    hex: '#F0F4EF',
    key: 'YELLOW',
  },
  {
    id: 6,
    hex: '#BFCC94',
    key: 'YELLOW',
  },
  {
    id: 7,
    hex: '#F0F4EF',
    key: 'YELLOW',
  },
  {
    id: 8,
    hex: '#E12212',
    key: 'YELLOW',
  },
];

storiesOf('FColorSelect', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('FColorSelect', () => {
    const [
      selectedColors,
      setSelectedColors,
    ] = useState([]);
    const selectedColorsHandler = (color) => {
      const existingColor = selectedColors.find((c) => c.id === color.id);
      if (existingColor) {
        const newColors = [...selectedColors];
        newColors.splice(selectedColors.indexOf(existingColor), 1);
        setSelectedColors([...newColors]);
      } else {
        setSelectedColors([...selectedColors, color]);
      }
    };
    return (
      <View>
        <ScrollView horizontal>
          {COLORS.map((color) => (
            <Circle
              size={50}
              color={color.hex}
              key={color.id}
              setValue={() => selectedColorsHandler(color)}
              value={selectedColors.find((selectedColor) => selectedColor.id === color.id)}
            />
          ))}
        </ScrollView>
      </View>
    );
  });
