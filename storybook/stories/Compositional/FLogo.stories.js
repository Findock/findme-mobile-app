import { storiesOf } from '@storybook/react-native';
import { FLogo } from 'components/Composition/FLogo';
import { CenterView } from 'storybook/utils/CenterView';
import colors from 'themes/colors';
import { select, boolean } from '@storybook/addon-knobs';

const colorOptions = [
  colors.SUCCESS,
  colors.WHITE,
  colors.DARK_GRAY,
];

const defaultFill = false;

storiesOf('FLogo', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('FLogo - outline green', () => (
    <FLogo
      color={select('color', colorOptions, colors.SUCCESS)}
      fill={boolean('fill', defaultFill)}
    />
  ))
  .add('FLogo - fill dark gray', () => (
    <FLogo
      color={select('color', colorOptions, colors.DARK_GRAY)}
      fill={boolean('fill', true)}
    />
  ));
