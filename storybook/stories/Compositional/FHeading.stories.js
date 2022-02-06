import { storiesOf } from '@storybook/react-native';
import { text, select, number } from '@storybook/addon-knobs';
import fonts from 'themes/fonts';
import colors from 'themes/colors';
import { CenterView } from 'storybook/utils/CenterView';
import { FHeading } from 'components/Composition/FHeading';
import placements from 'themes/placements';

const colorOptions = [
  colors.GREEN,
  colors.DARK_GREEN,
  colors.DARK_GRAY,
  colors.BLACK,
];

const weightOptions = [
  fonts.HEADING_WEIGHT_BOLD,
  fonts.HEADING_WEIGHT_MEDIUM,
  fonts.HEADING_WEIGHT_SEMIBOLD,
  fonts.HEADING_WEIGHT_REGULAR,
];

const alignOptions = [
  placements.LEFT,
  placements.RIGHT,
  placements.CENTER,
];

storiesOf('FHeading', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('FHeading - large semibold green', () => (
    <FHeading
      title={text('title', 'Find Me')}
      color={select('color', colorOptions, colors.GREEN)}
      size={number('size', fonts.HEADING_LARGE)}
      weight={select('weight', weightOptions, fonts.HEADING_WEIGHT_SEMIBOLD)}
    />
  ))
  .add('FHeading - extra large bold green', () => (
    <FHeading
      title={text('title', 'Obserwowane')}
      color={select('color', colorOptions, colors.BLACK)}
      size={number('size', fonts.HEADING_EXTRA_LARGE)}
      weight={select('weight', weightOptions, fonts.HEADING_WEIGHT_BOLD)}
    />
  ))
  .add('FHeading - normal regular center dark gray', () => (
    <FHeading
      title={text('title', 'Zabłądziliśmu i nie możemy trafić sami do domu, jeżeli mnie zobaczysz daj znać mojemu właścicielowi')}
      color={select('color', colorOptions, colors.DARK_GRAY)}
      size={number('size', fonts.HEADING_NORMAL)}
      weight={select('weight', weightOptions, fonts.HEADING_WEIGHT_REGULAR)}
      align={select('align', alignOptions, placements.CENTER)}
    />
  ));
