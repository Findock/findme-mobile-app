import { number } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import { FImage } from 'components/Composition/FImage';
import images from 'constants/images';
import { CenterView } from 'storybook/utils/CenterView';

storiesOf('FImage', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('FImage - registration image', () => (
    <FImage
      width={number('width', 314)}
      height={number('height', 210)}
      imagePath={number('imagePath', images.registration)}
    />
  ));
