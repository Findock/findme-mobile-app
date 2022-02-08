import {
  boolean, number, select, text,
} from '@storybook/addon-knobs';

import { storiesOf } from '@storybook/react-native';
import { CenterView } from 'storybook/utils/CenterView';
import icons from 'themes/icons';
import inputTypes from 'constants/inputTypes';
import { FInput } from 'components/Inputs/FInput';
import sizes from 'themes/sizes';

const iconOptions = [
  icons.MAIL_OUTLINE,
  icons.PHONE_PORTRAIT_OUTLINE,
  icons.LOCK_CLOSED_OUTLINE,
];

const typeOptions = [
  inputTypes.EMAIL,
  inputTypes.PHONE,
  inputTypes.PASSWORD,
  inputTypes.TEXT,
];

const iconPlacementOptions = [
  'right',
  'left',
];

const defaultIcon = icons.MAIL_OUTLINE;
const defaultPlaceholder = 'Input placeholder';
const defaultErrorMessage = 'Input error';
const isRounded = true;
const defaultIconPlacement = 'right';
const defaultType = 'text';
const defaultWidth = sizes.WIDTH_310;

storiesOf('FInput', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('FInput - icon on the left', () => (
    <FInput
      icon={select('icon', iconOptions, defaultIcon)}
      errorMessage={text('error message', '')}
      placeholder={text('placeholder', defaultPlaceholder)}
      iconPlacement={select('iconPlacement', iconPlacementOptions, 'left')}
      type={select('type', typeOptions, defaultType)}
      width={number('width', defaultWidth)}
    />
  ))
  .add('FInput - icon on the left and error', () => (
    <FInput
      icon={select('icon', iconOptions, defaultIcon)}
      errorMessage={text('error message', defaultErrorMessage)}
      placeholder={text('placeholder', defaultPlaceholder)}
      iconPlacement={select('iconPlacement', iconPlacementOptions, 'left')}
      type={select('type', typeOptions, defaultType)}
      width={number('width', defaultWidth)}
    />
  ))
  .add('FInput - no icon', () => (
    <FInput
      errorMessage={text('error message', '')}
      placeholder={text('placeholder', defaultPlaceholder)}
      width={number('width', defaultWidth)}
    />
  ))
  .add('FInput - rounded no icon', () => (
    <FInput
      placeholder={text('placeholder', defaultPlaceholder)}
      rounded={boolean('rounded', isRounded)}
      type={select('type', typeOptions, defaultType)}
      width={number('width', defaultWidth)}
    />
  ))
  .add('FInput - rounded with icon on the right', () => (
    <FInput
      icon={select('icon', iconOptions, defaultIcon)}
      placeholder={text('placeholder', defaultPlaceholder)}
      rounded={boolean('rounded', isRounded)}
      iconPlacement={select('iconPlacement', iconPlacementOptions, defaultIconPlacement)}
      type={select('type', typeOptions, defaultType)}
      width={number('width', defaultWidth)}
    />
  ))
  .add('FInput - password', () => (
    <FInput
      icon={select('icon', iconOptions, icons.LOCK_CLOSED_OUTLINE)}
      placeholder={text('placeholder', defaultPlaceholder)}
      rounded={boolean('rounded', isRounded)}
      iconPlacement={select('iconPlacement', iconPlacementOptions, 'left')}
      type={select('type', typeOptions, inputTypes.PASSWORD)}
      width={number('width', defaultWidth)}
    />
  ))
  .add('FInput - phone', () => (
    <FInput
      icon={select('icon', iconOptions, icons.PHONE_PORTRAIT_OUTLINE)}
      placeholder={text('placeholder', defaultPlaceholder)}
      rounded={boolean('rounded', isRounded)}
      iconPlacement={select('iconPlacement', iconPlacementOptions, defaultIconPlacement)}
      type={select('type', typeOptions, inputTypes.PHONE)}
      width={number('width', defaultWidth)}
    />
  ))
  .add('FInput - email', () => (
    <FInput
      icon={select('icon', iconOptions, icons.MAIL_OUTLINE)}
      placeholder={text('placeholder', defaultPlaceholder)}
      rounded={boolean('rounded', isRounded)}
      iconPlacement={select('iconPlacement', iconPlacementOptions, defaultIconPlacement)}
      type={select('type', typeOptions, inputTypes.EMAIL)}
      width={number('width', defaultWidth)}
    />
  ));
