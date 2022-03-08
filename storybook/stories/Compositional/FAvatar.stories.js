import { storiesOf } from '@storybook/react-native';
import { FAvatar } from 'components/Composition/FAvatar';
import { CenterView } from 'storybook/utils/CenterView';
import { number } from '@storybook/addon-knobs';
import images from 'constants/images';

const sizeOptions = [
  20,
  50,
  60,
  100,
];

storiesOf('FAvatar', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('FAvatar', () => (
    <FAvatar
      size={number('size', sizeOptions[3])}
      image={number('image', images.USER_AVATAR())}
    />
  ));
