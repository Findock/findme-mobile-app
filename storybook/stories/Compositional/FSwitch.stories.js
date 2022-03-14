import { storiesOf } from '@storybook/react-native';
import { CenterView } from 'storybook/utils/CenterView';
import FSwitch from '../../../components/Composition/FSwitch';

storiesOf('FSwitch', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('FSwitch', () => <FSwitch />);
