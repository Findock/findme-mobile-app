import { select, boolean } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import { FCheckbox } from 'components/Inputs/FCheckbox';
import { CenterView } from 'storybook/utils/CenterView';
import colors from 'themes/colors';

const colorOptions = [
  colors.DARK_PRIMARY,
  colors.DARK_GRAY,
  colors.SUCCESS,
  colors.WHITE,
];

const defaultColor = colors.DARK_PRIMARY;

storiesOf('FCheckbox', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('FCheckbox - not marked', () => (
    <FCheckbox
      iconColor={select('iconColor', colorOptions, colors.WHITE)}
      checkboxColor={select('checboxColor', colorOptions, defaultColor)}
      value={boolean('value', false)}
    />
  ))
  .add('FCheckbox - marked', () => (
    <FCheckbox
      iconColor={select('iconColor', colorOptions, colors.WHITE)}
      checkboxColor={select('checboxColor', colorOptions, defaultColor)}
      value={boolean('value', true)}
    />
  ));
