import { storiesOf } from '@storybook/react-native';
import { CenterView } from 'storybook/utils/CenterView';
import { TileSelectInput } from 'components/Inputs/TileSelectInput';
import images from 'constants/images';

storiesOf('TileSelectInput', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('Tile-CatSmall', () => (
    <TileSelectInput
      label="Kot"
      iconDefault={images.CAT_BLACK()}
      iconPressed={images.CAT_WHITE()}
      iconSize={60}
    />
  ))
  .add('Tile-CatBig', () => (
    <TileSelectInput
      label="Kot"
      iconDefault={images.CAT_BLACK()}
      iconPressed={images.CAT_WHITE()}
      iconSize={80}
    />
  ));
