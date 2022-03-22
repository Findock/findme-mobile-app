import { storiesOf } from '@storybook/react-native';
import { FButton } from 'components/Buttons/FButton';
import { CenterView } from 'storybook/utils/CenterView';
import colors from 'themes/colors';
import icons from 'themes/icons';
import { text, select, number } from '@storybook/addon-knobs';
import sizes from 'themes/sizes';
import fonts from 'themes/fonts';
import buttonTypes from 'constants/buttonTypes';

const iconOptions = [
  icons.PAW,
  icons.PAW_OUTLINE,
  icons.MENU,
];

const colorOptions = [
  colors.SUCCESS,
  colors.BLACK,
  colors.WHITE,
];

const typeOptions = [
  buttonTypes.LINK_BUTTON,
  buttonTypes.BUTTON_WITH_ICON_AND_TEXT,
  buttonTypes.ICON_BUTTON,
  buttonTypes.TEXT_BUTTON,
];

const weightOptions = [
  fonts.HEADING_WEIGHT_BOLD,
  fonts.HEADING_WEIGHT_MEDIUM,
  fonts.HEADING_WEIGHT_SEMIBOLD,
  fonts.HEADING_WEIGHT_REGULAR,
];

storiesOf('FButton', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('FButton - link button', () => (
    <FButton
      type={select('type', typeOptions, buttonTypes.LINK_BUTTON)}
      title={text('title', 'Stwórz konto')}
      color={select('color', colorOptions, colors.SUCCESS)}
      titleSize={number('titleSize', fonts.HEADING_NORMAL)}
      titleWeight={select('titleWeight', weightOptions, fonts.HEADING_WEIGHT_BOLD)}
    />
  ))
  .add('FButton - with icon and text', () => (
    <FButton
      type={select('type', typeOptions, buttonTypes.BUTTON_WITH_ICON_AND_TEXT)}
      title={text('title', 'Zarejestruj się')}
      color={select('color', colorOptions, colors.WHITE)}
      icon={select('icon', iconOptions, icons.PAW)}
      iconSize={number('iconSize', sizes.ICON_25)}
      titleSize={number('titleSize', fonts.HEADING_MEDIUM)}
      titleWeight={select('titleWeight', weightOptions, fonts.HEADING_WEIGHT_MEDIUM)}
      backgroundColor={select('backgroundColor', colorOptions, colors.SUCCESS)}
    />
  ))
  .add('FButton - icon button', () => (
    <FButton
      type={select('type', typeOptions, buttonTypes.ICON_BUTTON)}
      color={select('color', colorOptions, colors.SUCCESS)}
      icon={select('icon', iconOptions, icons.MENU)}
      iconSize={number('iconSize', sizes.ICON_25)}
    />
  ))
  .add('FButton - text button', () => (
    <FButton
      type={select('type', typeOptions, buttonTypes.TEXT_BUTTON)}
      title={text('title', 'Napisz wiadomośc')}
      color={select('color', colorOptions, colors.WHITE)}
      titleSize={number('titleSize', fonts.HEADING_SMALL)}
      titleWeight={select('titleWeight', weightOptions, fonts.HEADING_WEIGHT_SEMIBOLD)}
      backgroundColor={select('backgroundColor', colorOptions, colors.SUCCESS)}
    />
  ));
