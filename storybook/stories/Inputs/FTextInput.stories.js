import { boolean, select, text } from '@storybook/addon-knobs';

import { CenterView } from '../../utils/CenterView';
import { FTextInput } from '../../../components/Inputs/FTextInput';
import icons from '../../../themes/icons';
import { storiesOf } from '@storybook/react-native';

const iconOptions = [
  '',
  icons.MAIL_OUTLINE,
  icons.LOCK_CLOSED_OUTLINE,
];

const iconPlacementOptions = [
  'right',
  'left'
]

const defaultIcon = icons.MAIL_OUTLINE;
const defaultPlaceholder = 'Input placeholder';
const defaultErrorMessage = 'Input error';
const isRounded = true;
const defaultIconPlacement = 'right';

storiesOf('FTextInput', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('FTextInput - icon on the left', () => (
    <FTextInput
      icon={select('icon', iconOptions, defaultIcon)}
      errorMessage={text('error message', '')}
      placeholder={text('placeholder', defaultPlaceholder)}
      iconPlacement={select('iconPlacement', iconPlacementOptions, 'left')}
    />
  ))
  .add('FTextInput - icon on the left and error', () => (
    <FTextInput
      icon={select('icon', iconOptions, defaultIcon)}
      errorMessage={text('error message', defaultErrorMessage)}
      placeholder={text('placeholder', defaultPlaceholder)}
      iconPlacement={select('iconPlacement', iconPlacementOptions, 'left')}
    />
  ))
  .add('FTextInput - no icon', () => (
    <FTextInput
      icon={select('icon', iconOptions, '')}
      errorMessage={text('error message', '')}
      placeholder={text('placeholder', defaultPlaceholder)}
      iconPlacement={select('iconPlacement', iconPlacementOptions, 'left')}
    />
  ))
  .add('FTextInput - rounded no icon', () => (
    <FTextInput
      icon={select('icon', iconOptions, '')}
      placeholder={text('placeholder', defaultPlaceholder)}
      rounded={boolean('rounded', isRounded)}
    />
  ))
  .add('FTextInput - rounded with icon on the right', () => (
    <FTextInput
      icon={select('icon', iconOptions, defaultIcon)}
      placeholder={text('placeholder', defaultPlaceholder)}
      rounded={boolean('rounded', isRounded)}
      iconPlacement={select('iconPlacement', iconPlacementOptions, defaultIconPlacement)}
    />
  ));
