import { select, number, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import { FWideButton } from 'components/Buttons/FWideButton';
import { CenterView } from 'storybook/utils/CenterView';
import colors from 'themes/colors';
import fonts from 'themes/fonts';
import icons from 'themes/icons';

const iconOptions = [
  icons.PERSON_OUTLINE,
  icons.SETTINGS_OUTLINE,
  icons.LOG_OUT_OUTLINE,
];

const colorsOptions = [
  colors.BLACK,
  colors.DARK_PRIMARY,
  colors.LIGHT_PRIMARY,
  colors.DARK_GRAY,
  colors.PRIMARY,
  colors.WHITE,
];

const titleWeightOptions = [
  fonts.HEADING_WEIGHT_BOLD,
  fonts.HEADING_WEIGHT_MEDIUM,
  fonts.HEADING_WEIGHT_REGULAR,
  fonts.HEADING_WEIGHT_SEMIBOLD,
];

const defaultIconSize = 20;
const defaultTitle = 'Dane kontaktowe';

storiesOf('FWideButton', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('FWideButton', () => (
    <FWideButton
      icon={select('icon', iconOptions, iconOptions[0])}
      iconColor={select('iconColor', colorsOptions, colorsOptions[5])}
      titleColor={select('titleColor', colorsOptions, colorsOptions[0])}
      titleWeight={select('titleWeight', titleWeightOptions, titleWeightOptions[0])}
      iconSize={number('iconSize', defaultIconSize)}
      title={text('title', defaultTitle)}
      titleSize={number('titleSize', fonts.HEADING_NORMAL)}
      buttonBgColor={select('buttonBgColor', colorsOptions, colorsOptions[5])}
      iconBgColor={select('iconBgColor', colorsOptions, colorsOptions[1])}
    />
  ));
