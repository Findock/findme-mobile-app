import { storiesOf } from '@storybook/react-native';
import { select, text } from '@storybook/addon-knobs';
import { FTextInput } from '../../../components/Inputs/FTextInput';
import { CenterView } from '../../utils/CenterView';
import icons from '../../../themes/icons';

const iconOptions = [
  '',
  icons.MAIL_OUTLINE,
  icons.LOCK_CLOSED_OUTLINE,
];

const defaultIcon = icons.MAIL_OUTLINE;
const defaultPlaceholder = 'Input placeholder';
const defaultErrorMessage = 'Input error';

storiesOf('FTextInput', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('FTextInput - icon', () => (
    <FTextInput
      icon={select('icon', iconOptions, defaultIcon)}
      errorMessage={text('error message', '')}
      placeholder={text('placeholder', defaultPlaceholder)}
    />
  ))
  .add('FTextInput - icon and error', () => (
    <FTextInput
      icon={select('icon', iconOptions, defaultIcon)}
      errorMessage={text('error message', defaultErrorMessage)}
      placeholder={text('placeholder', defaultPlaceholder)}
    />
  ))
  .add('FTextInput - no icon', () => (
    <FTextInput
      icon={select('icon', iconOptions, '')}
      errorMessage={text('error message', '')}
      placeholder={text('placeholder', defaultPlaceholder)}
    />
  ));
