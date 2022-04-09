import { storiesOf } from '@storybook/react-native';
import { CenterView } from 'storybook/utils/CenterView';
import { FTileSelectInput } from 'components/Inputs/FTileSelectInput';
import images from 'constants/images';
import { useState } from 'react';

storiesOf('FTileSelectInput', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('FTile-Cat', () => {
    const [
      value,
      setValue,
    ] = useState(true);
    return (
      <FTileSelectInput
        label="Kot"
        iconDefault={images.CAT_BLACK()}
        iconPressed={images.CAT_WHITE()}
        iconSize={50}
        width={60}
        height={60}
        value={value}
        setValue={setValue}
      />
    );
  });
