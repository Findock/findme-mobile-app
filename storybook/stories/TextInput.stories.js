import { storiesOf } from '@storybook/react-native';
import { select, text } from '@storybook/addon-knobs';
import FTextInput from '../../components/Inputs/TextInput/FTextInput';
import sizeConstants from '../../constants/sizeConstants';
import CenterView from '../utils/CenterView';

const sizeOptions = [
  sizeConstants.LARGE,
  sizeConstants.MEDIUM,
  sizeConstants.SMALL,
];

const defaultLabel = 'Input label';
const defaultPlaceholder = 'Input placeholder';

storiesOf('TextInput', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('TextInput - Large', () => (
    <FTextInput
      placeholder={text('placeholder', defaultPlaceholder)}
      label={text('label', defaultLabel)}
      size={select('size', sizeOptions, sizeConstants.LARGE)}
    />
  ));
