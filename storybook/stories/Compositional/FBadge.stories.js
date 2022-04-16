import { boolean, select, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import { FBadge } from 'components/Composition/FBadge';
import locales from 'constants/locales';
import { CenterView } from 'storybook/utils/CenterView';
import colors from 'themes/colors';

const defaultTitle = locales.ONLINE;
const defaultColor = colors.SUCCESS;

const colorsOptions = [
  colors.DANGER,
  colors.SUCCESS,
  colors.WARNING,
];

storiesOf('FBadge', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('FBadge', () => (
    <FBadge
      isFill={boolean('isFill', true)}
      color={select('color', colorsOptions, defaultColor)}
      title={text('title', defaultTitle)}
    />
  ));
